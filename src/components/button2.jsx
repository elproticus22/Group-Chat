import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Button2 = ({ text, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
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
              // Close popup when clicking on backdrop
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
                {children || (
                  <DefaultContent>
                    <h1>Presidente actual y partido politico</h1>
                    <p>Esta seccion es para el presidente y partido politico actual</p>
                    
                    <Section>
                      <h2>Presidente</h2>
                      <p>Jhan Zamora</p>
                    </Section>

                    <Section>
                      <h2>Partido Politico</h2>
                      <p>Centro Demoniaco</p>
                    </Section>

                    <ActionButtons>
                      <ActionButton onClick={() => setIsOpen(false)}>
                        Entendido
                      </ActionButton>
                    </ActionButtons>
                  </DefaultContent>
                )}
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
  overflow: auto;
  padding: 80px 60px 60px;
  
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

  @media (max-width: 768px) {
    padding: 60px 30px 40px;
  }

  @media (max-width: 480px) {
    padding: 60px 20px 30px;
  }
`;

const DefaultContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: #AEF3E7;
    font-weight: 700;
    background: linear-gradient(135deg, #AEF3E7 0%, #5EEAD4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #e2e8f0;
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const Section = styled.div`
  margin: 3rem 0;
  text-align: left;

  h2 {
    font-size: 1.8rem;
    color: #AEF3E7;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
      color: #e2e8f0;
      line-height: 1.5;

      &:before {
        content: '→';
        position: absolute;
        left: 0;
        color: #AEF3E7;
        font-weight: bold;
      }
    }
  }
`;

const CodeBlock = styled.pre`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #AEF3E7;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
  color: #AEF3E7;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  text-align: left;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled.button`
  padding: 0.8rem 2rem;
  border: 2px solid ${props => props.variant === 'secondary' ? 'transparent' : '#AEF3E7'};
  background: ${props => props.variant === 'secondary' ? 'rgba(174, 243, 231, 0.1)' : 'transparent'};
  color: #AEF3E7;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: ${props => props.variant === 'secondary' ? 'rgba(174, 243, 231, 0.2)' : '#AEF3E7'};
    color: ${props => props.variant === 'secondary' ? '#AEF3E7' : '#0a0a0a'};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(174, 243, 231, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 200px;
  }
`;

export default Button2;
