import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScreamerButton = ({ text }) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const audioRef = useRef(null);

  // Handle screamer trigger
  const triggerScreamer = () => {
    setIsTriggered(true);
    setIsFlashing(true);
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    
    // Stop flashing after 3 seconds
    setTimeout(() => {
      setIsFlashing(false);
    }, 3000);
  };

  // Prevent body scroll when screamer is active
  useEffect(() => {
    if (isTriggered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isTriggered]);

  // Close with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isTriggered) {
        setIsTriggered(false);
        setIsFlashing(false);
        // Stop audio when closing with escape
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isTriggered]);

  // Stop audio when component unmounts or screamer closes
  useEffect(() => {
    if (!isTriggered && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isTriggered]);

  return (
    <div className="screamer-wrapper">
      {/* Audio element */}
      <audio ref={audioRef} preload="auto">
        <source src="/woman-scream-01.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <motion.button
        className="screamer-btn"
        onClick={triggerScreamer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.button>

      <AnimatePresence>
        {isTriggered && (
          <motion.div
            className={`screamer-overlay ${isFlashing ? 'flashing' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => {
              setIsTriggered(false);
              setIsFlashing(false);
            }}
          >
            <motion.div
              className="screamer-content"
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 0.8,
                times: [0, 0.6, 1],
                ease: "easeOut"
              }}
            >
              <motion.div
                className="screamer-face"
                animate={isFlashing ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{
                  repeat: isFlashing ? Infinity : 0,
                  duration: 0.2
                }}
              >
                <img src="/mim.png" alt="" />
              </motion.div>
              
            

              <motion.button
                className="close-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTriggered(false);
                  setIsFlashing(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Click to Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .screamer-wrapper {
          display: inline-block;
        }

        .screamer-btn {
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
          overflow: hidden;
        }

        .screamer-btn:before {
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

        .screamer-btn:hover,
        .screamer-btn:focus {
          color: white;
        }

        .screamer-btn:hover:before,
        .screamer-btn:focus:before {
          left: 0;
          right: 0;
          opacity: 1;
        }

        .screamer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(45deg, #000000, #1a0000, #000000);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          cursor: pointer;
        }

        .screamer-overlay.flashing {
          animation: flashColors 0.2s infinite;
        }

        @keyframes flashColors {
          0% { background: #ff0000; }
          25% { background: #000000; }
          50% { background: #ff4444; }
          75% { background: #000000; }
          100% { background: #ff0000; }
        }

        .screamer-content {
          text-align: center;
          color: white;
          cursor: default;
          max-width: 80%;
        }

        .screamer-face {
          font-size: 15rem;
          display: block;
          margin-bottom: 2rem;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
        }

        .screamer-text {
          font-size: 4rem;
          font-weight: 900;
          margin: 1rem 0;
          color: #AEF3E7;
          text-shadow: 
            0 0 10px rgba(174, 243, 231, 0.8),
            0 0 20px rgba(174, 243, 231, 0.6),
            0 0 30px rgba(174, 243, 231, 0.4);
          letter-spacing: 3px;
        }

        .screamer-subtitle {
          font-size: 1.5rem;
          margin: 2rem 0;
          color: #e2e8f0;
          opacity: 0.9;
        }

        .close-btn {
          padding: 1rem 2rem;
          border: 2px solid #AEF3E7;
          background: transparent;
          color: #AEF3E7;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 2rem;
        }

        .close-btn:hover {
          background: #AEF3E7;
          color: #0a0a0a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(174, 243, 231, 0.3);
        }

        @media (max-width: 768px) {
          .screamer-face {
            font-size: 10rem;
          }
          
          .screamer-text {
            font-size: 3rem;
          }
          
          .screamer-subtitle {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .screamer-face {
            font-size: 8rem;
          }
          
          .screamer-text {
            font-size: 2.5rem;
          }
          
          .screamer-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ScreamerButton;