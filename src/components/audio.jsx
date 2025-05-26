import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayerButton = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const audioRef = useRef(null);

  // ========================================
  // AUDIO TRACKS CONFIGURATION
  // Important!!!! do not forget this part, this is basically a databse with the audios and stuff
  // ========================================
  const audioTracks = [
    {
      id: 1,
      title: "Himno",
      artist: "Balatro balatril balatral",
      src: "/Balatro.mp3" // Replace with your actual file path
    },
    {
      id: 2,
      title: "Femtanyl - P3t", 
      artist: "Jhan",
      src: "/P3t.mp3" // Replace with your actual file path
    },
    {
      id: 3,
      title: "Femtanyl - Lovesick cannibal",
      artist: "Jhan", 
      src: "/LovesickCannibal.mp3" // Replace with your actual file path
    },
    {
      id: 4,
      title: "Pedroski (Hecho con ia)",
      artist: "Chaves", 
      src: "/Sexo.mp3" // Replace with your actual file path
    },
    {
      id: 5,
      title: "Jamiroquai - Virtual insanity",
      artist: "Jhan", 
      src: "/VirtualInsanity.mp3" // Replace with your actual file path
    },
    {
      id: 6,
      title: "Duster - Heading for the door",
      artist: "Jhan", 
      src: "/Headingforthedoor.mp3" // Replace with your actual file path
    },
    // Add more here as you need
  ];

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

  // Show mini player when popup closes and there's a current track
  useEffect(() => {
    if (!isOpen && currentTrack) {
      setShowMiniPlayer(true);
    } else if (isOpen) {
      setShowMiniPlayer(false);
    }
  }, [isOpen, currentTrack]);

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

  // Audio event listeners - setup once when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplaythrough', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplaythrough', updateDuration);
    };
  }, []); // Empty dependency array - setup once

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Reset states when track changes
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    
    // Set new source and load
    audio.src = currentTrack.src;
    audio.volume = volume;
    audio.load();
  }, [currentTrack, volume]);

  const selectTrack = (track) => {
    setCurrentTrack(track);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const closeMiniPlayer = () => {
    setShowMiniPlayer(false);
    setCurrentTrack(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <StyledWrapper>
      <button onClick={() => setIsOpen(true)}>{text}</button>

      {/* Single audio element that persists throughout the component lifecycle */}
      <audio
        ref={audioRef}
        preload="metadata"
        style={{ display: 'none' }}
      />

      {/* Mini Player - shows when popup is closed but audio is loaded */}
      <AnimatePresence>
        {showMiniPlayer && (
          <MiniPlayer
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <MiniPlayerContent>
              <MiniTrackInfo>
                <MiniTrackTitle>{currentTrack?.title}</MiniTrackTitle>
                <MiniTrackArtist>{currentTrack?.artist}</MiniTrackArtist>
                <MiniTrackDuration>{formatTime(duration)}</MiniTrackDuration>
              </MiniTrackInfo>
              
              <MiniControls>
                <MiniPlayButton
                  onClick={togglePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </MiniPlayButton>
                
                <MiniOpenButton
                  onClick={() => setIsOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎵
                </MiniOpenButton>
                
                <MiniCloseButton
                  onClick={closeMiniPlayer}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </MiniCloseButton>
              </MiniControls>

              <MiniProgressBar onClick={handleSeek}>
                <MiniProgressFill
                  style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              </MiniProgressBar>
            </MiniPlayerContent>
          </MiniPlayer>
        )}
      </AnimatePresence>

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
                <PlayerHeader
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1>Audio Player</h1>
                  <p>Una seccion en la que esta una playlist de canciones completamente arbitrarias, ninguna de las canciones que esten aqui son de nuestra autoria, todas son de otros artistas</p>
                </PlayerHeader>

                <PlayerContainer>
                  <TrackList>
                    <h2>Canciones</h2>
                    <AnimatePresence>
                      {audioTracks.map((track, index) => (
                        <TrackItem
                          key={track.id}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * index }}
                          onClick={() => selectTrack(track)}
                          $isActive={currentTrack?.id === track.id}
                          whileHover={{ scale: 1.02, x: 10 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <TrackInfo>
                            <TrackTitle>{track.title}</TrackTitle>
                            <TrackArtist>{track.artist}</TrackArtist>
                          </TrackInfo>
                          <PlayIndicator $isActive={currentTrack?.id === track.id}>
                            {currentTrack?.id === track.id && isPlaying ? '⏸️' : '▶️'}
                          </PlayIndicator>
                        </TrackItem>
                      ))}
                    </AnimatePresence>
                  </TrackList>

                  <PlayerSection>
                    <AnimatePresence mode="wait">
                      {currentTrack ? (
                        <motion.div
                          key="player"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <NowPlaying>
                            <h3>Ahora esta sonando</h3>
                            <CurrentTrackInfo>
                              <CurrentTrackTitle>{currentTrack.title}</CurrentTrackTitle>
                              <CurrentTrackArtist>{currentTrack.artist}</CurrentTrackArtist>
                            </CurrentTrackInfo>
                          </NowPlaying>

                          <Controls>
                            <PlayButton
                              onClick={togglePlayPause}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {isPlaying ? '⏸️' : '▶️'}
                            </PlayButton>
                          </Controls>

                          <ProgressSection>
                            <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
                            <ProgressBar onClick={handleSeek}>
                              <ProgressFill
                                style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                              />
                            </ProgressBar>
                            <TimeDisplay>{formatTime(duration)}</TimeDisplay>
                          </ProgressSection>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <PlaceholderText>
                            <h3>Select a track to begin</h3>
                            <p>Choose any song from the playlist to start your music experience</p>
                          </PlaceholderText>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </PlayerSection>
                </PlayerContainer>
              </ContentArea>
            </PopupContent>
          </StyledPopup>
        )}
      </AnimatePresence>
    </StyledWrapper>
  );
};

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
`;

const ContentArea = styled.div`
  flex: 1;
  overflow: auto;
  padding: 80px 40px 40px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(174, 243, 231, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #AEF3E7;
    border-radius: 4px;
  }
`;

const PlayerHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #AEF3E7;
    font-weight: 700;
    background: linear-gradient(135deg, #AEF3E7 0%, #5EEAD4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.2rem;
    color: #e2e8f0;
    opacity: 0.8;
  }
`;

const PlayerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TrackList = styled.div`
  h2 {
    color: #AEF3E7;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

const TrackItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: ${props => props.$isActive ? 'rgba(174, 243, 231, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$isActive ? '#AEF3E7' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(174, 243, 231, 0.15);
    border-color: #AEF3E7;
  }
`;

const TrackInfo = styled.div`
  flex: 1;
`;

const TrackTitle = styled.div`
  color: #AEF3E7;
  font-weight: 600;
  font-size: 1.1rem;
`;

const TrackArtist = styled.div`
  color: #e2e8f0;
  opacity: 0.7;
  font-size: 0.9rem;
`;

const PlayIndicator = styled.div`
  font-size: 1.2rem;
  opacity: ${props => props.$isActive ? 1 : 0.5};
`;

const PlayerSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 400px;
`;

const NowPlaying = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    color: #AEF3E7;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const CurrentTrackInfo = styled.div`
  margin-bottom: 1rem;
`;

const CurrentTrackTitle = styled.div`
  color: #AEF3E7;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CurrentTrackArtist = styled.div`
  color: #e2e8f0;
  opacity: 0.8;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const PlayButton = styled(motion.button)`
  height: 60px;
  border-radius: 50%;
  border: 2px solid #AEF3E7;
  background: transparent;
  color: #AEF3E7;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #AEF3E7;
    color: #0a0a0a;
  }
`;

const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TimeDisplay = styled.span`
  color: #AEF3E7;
  font-size: 0.9rem;
  min-width: 40px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(174, 243, 231, 0.2);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #AEF3E7;
  border-radius: 3px;
  transition: width 0.1s ease;
`;

const VolumeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const VolumeLabel = styled.span`
  font-size: 1.2rem;
`;

const VolumeSlider = styled.input`
  flex: 1;
  max-width: 200px;
  height: 6px;
  background: rgba(174, 243, 231, 0.2);
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #AEF3E7;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #AEF3E7;
    cursor: pointer;
    border: none;
  }
`;

const PlaceholderText = styled.div`
  text-align: center;
  color: #e2e8f0;
  opacity: 0.6;

  h3 {
    color: #AEF3E7;
    margin-bottom: 1rem;
  }
`;

// Mini Player Styles
const MiniPlayer = styled(motion.div)`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }

  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 350px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  border: 2px solid #AEF3E7;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 
    0 0 30px rgba(174, 243, 231, 0.3),
    0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
  }
`;


const MiniPlayerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MiniTrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MiniTrackTitle = styled.div`
  color: #AEF3E7;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MiniTrackArtist = styled.div`
  color: #e2e8f0;
  opacity: 0.7;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MiniTrackDuration = styled.div`
  color: #AEF3E7;
  opacity: 0.6;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const MiniControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: space-between;
`;

const MiniPlayButton = styled(motion.button)`
  width: 60px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #AEF3E7;
  background: transparent;
  color: #AEF3E7;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #AEF3E7;
    color: #0a0a0a;
  }
`;

const MiniOpenButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #AEF3E7;
  background: rgba(174, 243, 231, 0.1);
  color: #AEF3E7;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(174, 243, 231, 0.2);
  }
`;

const MiniCloseButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(174, 243, 231, 0.5);
  background: transparent;
  color: rgba(174, 243, 231, 0.7);
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.2);
    border-color: #ff6b6b;
    color: #ff6b6b;
  }
`;

const MiniProgressBar = styled.div`
  height: 4px;
  background: rgba(174, 243, 231, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`;

const MiniProgressFill = styled.div`
  height: 100%;
  background: #AEF3E7;
  border-radius: 2px;
  transition: width 0.1s ease;
`;

export default AudioPlayerButton;