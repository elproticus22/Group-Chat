import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PlatformClimbingGame = ({ text = "JUGAR AHORA", children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close popup with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <StyledWrapper>
      <button onClick={() => setIsOpen(true)}>{text}</button>

      <AnimatePresence>
        {isOpen && (
          <StyledPopup
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <PopupContent
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CloseButton onClick={() => setIsOpen(false)} title="Close (Esc)">
                ×
              </CloseButton>
              
              <ContentArea>
                <GameContainer />
              </ContentArea>
            </PopupContent>
          </StyledPopup>
        )}
      </AnimatePresence>
    </StyledWrapper>
  );
};

const GameContainer = () => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const keysRef = useRef({});
  
  const [gameState, setGameState] = useState({
    score: 0,
    gameOver: false,
    isStunned: false
  });

  // Game state
  const gameDataRef = useRef({
    player: {
      x: 0,
      y: 0,
      size: 30,
      targetX: 0,
      targetY: 0,
      isMoving: false,
      moveProgress: 0
    },
    platforms: [],
    camera: {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    },
    score: 0,
    isStunned: false,
    stunTimer: 0,
    nextPlatformId: 0,
    particles: []
  });

  const PLATFORM_WIDTH = 80;
  const PLATFORM_HEIGHT = 15;
  const PLATFORM_VERTICAL_SPACING = 120;
  const PLATFORM_HORIZONTAL_SPACING = 150;

  // Generate platforms in a more structured way to ensure there's always a valid path
  const generatePlatformLevel = useCallback((yPos, previousSide = null) => {
    const gameData = gameDataRef.current;
    
    // Ensure we always have both left and right options available
    // But randomly choose which side to place the next platform
    let side;
    if (previousSide === null) {
      // First platform can be either side
      side = Math.random() > 0.5 ? 1 : -1;
    } else {
      // Always ensure we can move to the opposite side
      // 70% chance to switch sides, 30% chance to stay on same side
      if (Math.random() > 0.3) {
        side = -previousSide; // Switch sides
      } else {
        side = previousSide; // Stay on same side
      }
    }
    
    const xPos = side * PLATFORM_HORIZONTAL_SPACING;
    
    return {
      id: gameData.nextPlatformId++,
      x: xPos,
      y: yPos,
      width: PLATFORM_WIDTH,
      height: PLATFORM_HEIGHT,
      isActive: false,
      side: side
    };
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    const gameData = gameDataRef.current;
    
    // Reset game state
    gameData.platforms = [];
    gameData.score = 0;
    gameData.isStunned = false;
    gameData.stunTimer = 0;
    gameData.nextPlatformId = 0;
    gameData.particles = [];
    
    // Create initial platform at center
    gameData.platforms.push({
      id: gameData.nextPlatformId++,
      x: 0,
      y: 0,
      width: PLATFORM_WIDTH,
      height: PLATFORM_HEIGHT,
      isActive: true,
      side: 0
    });
    
    // Generate initial platforms above with better logic
    let previousSide = null;
    for (let i = 1; i <= 25; i++) {
      const yPos = -i * PLATFORM_VERTICAL_SPACING;
      const platform = generatePlatformLevel(yPos, previousSide);
      gameData.platforms.push(platform);
      previousSide = platform.side;
    }
    
    // Initialize player on first platform
    gameData.player.x = 0;
    gameData.player.y = -gameData.player.size - PLATFORM_HEIGHT/2;
    gameData.player.targetX = gameData.player.x;
    gameData.player.targetY = gameData.player.y;
    gameData.player.isMoving = false;
    gameData.player.moveProgress = 0;
    
    // Initialize camera above player
    gameData.camera.x = 0;
    gameData.camera.y = -200;
    gameData.camera.targetX = 0;
    gameData.camera.targetY = -200;
    
    setGameState({
      score: 0,
      gameOver: false,
      isStunned: false
    });
  }, [generatePlatformLevel]);

  // Create particle effect
  const createParticles = useCallback((x, y, color = '#AEF3E7') => {
    const gameData = gameDataRef.current;
    for (let i = 0; i < 8; i++) {
      gameData.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        color: color,
        size: Math.random() * 4 + 2
      });
    }
  }, []);

  // Handle key input with improved platform detection
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'r' || e.key === 'R') {
      initGame();
      return;
    }
    
    const gameData = gameDataRef.current;
    if (gameData.isStunned || gameData.player.isMoving) return;
    
    let targetPlatform = null;
    const currentPlayerY = gameData.player.y;
    const currentPlayerX = gameData.player.x;
    
    if (e.key === 'ArrowLeft') {
      // Find the closest platform to the left and above
      const candidatePlatforms = gameData.platforms.filter(p => {
        const isLeft = p.x < currentPlayerX - PLATFORM_HORIZONTAL_SPACING/3;
        const isAbove = p.y < currentPlayerY - PLATFORM_VERTICAL_SPACING/3;
        const isInRange = p.y > currentPlayerY - PLATFORM_VERTICAL_SPACING * 2;
        return isLeft && isAbove && isInRange;
      });
      
      // Sort by proximity (closest Y first, then closest X)
      candidatePlatforms.sort((a, b) => {
        const distA = Math.abs(a.y - (currentPlayerY - PLATFORM_VERTICAL_SPACING));
        const distB = Math.abs(b.y - (currentPlayerY - PLATFORM_VERTICAL_SPACING));
        return distA - distB;
      });
      
      targetPlatform = candidatePlatforms[0];
      
    } else if (e.key === 'ArrowRight') {
      // Find the closest platform to the right and above
      const candidatePlatforms = gameData.platforms.filter(p => {
        const isRight = p.x > currentPlayerX + PLATFORM_HORIZONTAL_SPACING/3;
        const isAbove = p.y < currentPlayerY - PLATFORM_VERTICAL_SPACING/3;
        const isInRange = p.y > currentPlayerY - PLATFORM_VERTICAL_SPACING * 2;
        return isRight && isAbove && isInRange;
      });
      
      // Sort by proximity (closest Y first, then closest X)
      candidatePlatforms.sort((a, b) => {
        const distA = Math.abs(a.y - (currentPlayerY - PLATFORM_VERTICAL_SPACING));
        const distB = Math.abs(b.y - (currentPlayerY - PLATFORM_VERTICAL_SPACING));
        return distA - distB;
      });
      
      targetPlatform = candidatePlatforms[0];
    }
    
    if (targetPlatform) {
      // Successful move
      gameData.player.targetX = targetPlatform.x;
      gameData.player.targetY = targetPlatform.y - gameData.player.size - PLATFORM_HEIGHT/2;
      gameData.player.isMoving = true;
      gameData.player.moveProgress = 0;
      targetPlatform.isActive = true;
      
      // Update score
      gameData.score++;
      setGameState(prev => ({ ...prev, score: gameData.score }));
      
      // Create success particles
      createParticles(targetPlatform.x, targetPlatform.y, '#AEF3E7');
      
      // Generate more platforms if needed
      if (gameData.score % 3 === 0) {
        const currentHighest = Math.max(...gameData.platforms.map(p => -p.y));
        const lastPlatform = gameData.platforms.find(p => -p.y === currentHighest);
        let previousSide = lastPlatform ? lastPlatform.side : null;
        
        // Generate 10 more platforms above the current highest
        for (let i = 1; i <= 10; i++) {
          const yPos = -(currentHighest + i * PLATFORM_VERTICAL_SPACING);
          const platform = generatePlatformLevel(yPos, previousSide);
          gameData.platforms.push(platform);
          previousSide = platform.side;
        }
      }
    } else {
      // Wrong move - stun player
      gameData.isStunned = true;
      gameData.stunTimer = 30; // 30 frames = ~0.5 seconds at 60fps
      setGameState(prev => ({ ...prev, isStunned: true }));
      
      // Create error particles
      createParticles(gameData.player.x, gameData.player.y, '#ff6b6b');
    }
  }, [initGame, createParticles, generatePlatformLevel]);

  // Update game logic
  const updateGame = useCallback(() => {
    const gameData = gameDataRef.current;
    
    // Update stun timer
    if (gameData.isStunned) {
      gameData.stunTimer--;
      if (gameData.stunTimer <= 0) {
        gameData.isStunned = false;
        setGameState(prev => ({ ...prev, isStunned: false }));
      }
    }
    
    // Update player movement
    if (gameData.player.isMoving) {
      gameData.player.moveProgress += 0.1;
      if (gameData.player.moveProgress >= 1) {
        gameData.player.moveProgress = 1;
        gameData.player.x = gameData.player.targetX;
        gameData.player.y = gameData.player.targetY;
        gameData.player.isMoving = false;
      } else {
        // Smooth interpolation
        gameData.player.x = gameData.player.x + (gameData.player.targetX - gameData.player.x) * 0.15;
        gameData.player.y = gameData.player.y + (gameData.player.targetY - gameData.player.y) * 0.15;
      }
    }
    
    // Update camera to follow player
    gameData.camera.targetX = gameData.player.x;
    gameData.camera.targetY = gameData.player.y - 200;
    gameData.camera.x += (gameData.camera.targetX - gameData.camera.x) * 0.05;
    gameData.camera.y += (gameData.camera.targetY - gameData.camera.y) * 0.05;
    
    // Continuously generate more platforms as player progresses
    const playerHeight = -gameData.player.y;
    const highestPlatform = Math.max(...gameData.platforms.map(p => -p.y));
    
    // If player is getting close to the highest platforms, generate more
    if (playerHeight > highestPlatform - 600) {
      const lastPlatform = gameData.platforms.find(p => -p.y === highestPlatform);
      let previousSide = lastPlatform ? lastPlatform.side : null;
      
      for (let i = 1; i <= 15; i++) {
        const yPos = -(highestPlatform + i * PLATFORM_VERTICAL_SPACING);
        const platform = generatePlatformLevel(yPos, previousSide);
        gameData.platforms.push(platform);
        previousSide = platform.side;
      }
    }
    
    // Clean up platforms that are too far below
    gameData.platforms = gameData.platforms.filter(p => p.y > gameData.player.y - 1000);
    
    // Update particles
    gameData.particles = gameData.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      return particle.life > 0;
    });
  }, [generatePlatformLevel]);

  // Render game
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const gameData = gameDataRef.current;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(26, 26, 26, 0.8)');
    gradient.addColorStop(1, 'rgba(10, 10, 10, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    
    // Apply camera transform
    ctx.translate(canvas.width / 2 - gameData.camera.x, canvas.height / 2 - gameData.camera.y);
    
    // Render platforms
    gameData.platforms.forEach(platform => {
      const alpha = platform.isActive ? 1 : 0.7;
      
      // Platform shadow
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.3})`;
      ctx.fillRect(
        platform.x - platform.width / 2 + 3,
        platform.y + platform.height / 2 + 3,
        platform.width,
        platform.height
      );
      
      // Platform
      ctx.fillStyle = platform.isActive 
        ? `rgba(174, 243, 231, ${alpha})` 
        : `rgba(174, 243, 231, ${alpha * 0.6})`;
      ctx.fillRect(
        platform.x - platform.width / 2,
        platform.y - platform.height / 2,
        platform.width,
        platform.height
      );
      
      // Platform border
      ctx.strokeStyle = `rgba(174, 243, 231, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(
        platform.x - platform.width / 2,
        platform.y - platform.height / 2,
        platform.width,
        platform.height
      );
    });
    
    // Render player
    const playerSize = gameData.player.size;
    const stunEffect = gameData.isStunned ? Math.sin(Date.now() * 0.02) * 0.3 + 0.7 : 1;
    
    // Player shadow
    ctx.fillStyle = `rgba(0, 0, 0, ${stunEffect * 0.3})`;
    ctx.fillRect(
      gameData.player.x - playerSize / 2 + 3,
      gameData.player.y + playerSize / 2 + 3,
      playerSize,
      playerSize
    );
    
    // Player
    ctx.fillStyle = gameData.isStunned 
      ? `rgba(255, 107, 107, ${stunEffect})` 
      : `rgba(174, 243, 231, ${stunEffect})`;
    ctx.fillRect(
      gameData.player.x - playerSize / 2,
      gameData.player.y - playerSize / 2,
      playerSize,
      playerSize
    );
    
    // Player border
    ctx.strokeStyle = gameData.isStunned 
      ? `rgba(255, 107, 107, ${stunEffect})` 
      : `rgba(174, 243, 231, ${stunEffect})`;
    ctx.lineWidth = 3;
    ctx.strokeRect(
      gameData.player.x - playerSize / 2,
      gameData.player.y - playerSize / 2,
      playerSize,
      playerSize
    );
    
    // Render particles
    gameData.particles.forEach(particle => {
      ctx.fillStyle = particle.color.replace(')', `, ${particle.life})`).replace('rgb', 'rgba');
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.restore();
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    updateGame();
    render();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [updateGame, render]);

  // Setup game
  useEffect(() => {
    initGame();
    
    const handleKeyDownEvent = (e) => {
      handleKeyDown(e);
    };
    
    window.addEventListener('keydown', handleKeyDownEvent);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [initGame, handleKeyDown, gameLoop]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <GameWrapper>
      <GameCanvas ref={canvasRef} />
      <GameUI>
        <ScoreDisplay>
          <ScoreText>SCORE: {gameState.score}</ScoreText>
        </ScoreDisplay>
        <Instructions>
          <InstructionText>Use ← → arrows to climb platforms</InstructionText>
          <InstructionText>Press R to restart</InstructionText>
        </Instructions>
        {gameState.isStunned && (
          <StunIndicator
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            STUNNED!
          </StunIndicator>
        )}
      </GameUI>
    </GameWrapper>
  );
};

// Styled components
const StyledWrapper = styled.div`
  button {
    font-size: 18px;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    padding: 0.7em 2em;
    border: 3px solid #AEF3E7;
    border-radius: 2px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
    color: #AEF3E7;
    text-decoration: none;
    transition: 0.3s ease all;
    z-index: 1;
    background: transparent;
    cursor: pointer;
  }

  button:before {
    transition: 0.5s all ease;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    bottom: 0;
    opacity: 0;
    content: '';
    background-color: #AEF3E7;
    z-index: -1;
  }

  button:hover,
  button:focus {
    color: white;
  }

  button:hover:before,
  button:focus:before {
    left: 0;
    right: 0;
    opacity: 1;
  }

  button:active {
    transform: scale(0.9);
  }
`;

const StyledPopup = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 20, 20, 0.98);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PopupContent = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  border: 2px solid #AEF3E7;
  border-radius: 15px;
  padding: 0;
  box-shadow: 
    0 0 50px rgba(174, 243, 231, 0.3),
    0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  cursor: default;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    border-radius: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 2.5rem;
  color: #AEF3E7;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(174, 243, 231, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    font-size: 2rem;
    width: 40px;
    height: 40px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 80px 20px 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 60px 15px 15px;
  }
`;

const GameWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  border-radius: 10px;
  overflow: hidden;
`;

const GameCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

const GameUI = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(174, 243, 231, 0.1);
  border: 2px solid #AEF3E7;
  border-radius: 10px;
  padding: 15px 25px;
  backdrop-filter: blur(10px);
`;

const ScoreText = styled.div`
  color: #AEF3E7;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Instructions = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(174, 243, 231, 0.1);
  border: 2px solid #AEF3E7;
  border-radius: 10px;
  padding: 15px 20px;
  backdrop-filter: blur(10px);
`;

const InstructionText = styled.div`
  color: #AEF3E7;
  font-size: 0.9rem;
  margin: 5px 0;
  opacity: 0.8;
`;

const StunIndicator = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 107, 107, 0.2);
  border: 3px solid #ff6b6b;
  border-radius: 15px;
  padding: 20px 40px;
  font-size: 2rem;
  font-weight: bold;
  color: #ff6b6b;
  letter-spacing: 3px;
  backdrop-filter: blur(10px);
  animation: pulse 0.5s infinite alternate;

  @keyframes pulse {
    from { opacity: 0.7; }
    to { opacity: 1; }
  }
`;

export default PlatformClimbingGame;