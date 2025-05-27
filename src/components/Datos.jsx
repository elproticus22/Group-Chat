import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Button3 = ({ text, children }) => {
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
                    <h1>Dashboard de Estadísticas</h1>
                    <p>Análisis y métricas de uso del sistema</p>
                    
                    <Section>
                      <h2>Métricas Principales</h2>
                      
                      <MetricsGrid>
                        <MetricCard>
                          <MetricTitle>Uso del Chatbot</MetricTitle>
                          <MetricValue>20K</MetricValue>
                          <MetricLabel>tokens utilizados</MetricLabel>
                          <ProgressBar>
                            <ProgressFill width="80%" />
                          </ProgressBar>
                        </MetricCard>
                        
                        <MetricCard>
                          <MetricTitle>Usuarios Totales</MetricTitle>
                          <MetricValue>10</MetricValue>
                          <MetricLabel>usuarios activos</MetricLabel>
                          <ProgressBar>
                            <ProgressFill width="65%" />
                          </ProgressBar>
                        </MetricCard>
                        
                        <MetricCard>
                          <MetricTitle>Consultas Diarias</MetricTitle>
                          <MetricValue>156</MetricValue>
                          <MetricLabel>consultas hoy</MetricLabel>
                          <ProgressBar>
                            <ProgressFill width="45%" />
                          </ProgressBar>
                        </MetricCard>
                        
                        <MetricCard>
                          <MetricTitle>Tiempo Promedio</MetricTitle>
                          <MetricValue>2.3s</MetricValue>
                          <MetricLabel>respuesta IA</MetricLabel>
                          <ProgressBar>
                            <ProgressFill width="92%" />
                          </ProgressBar>
                        </MetricCard>
                      </MetricsGrid>
                    </Section>

                    <Section>
                      <h2>Gráficas de Uso</h2>
                      
                      <ChartsGrid>
                        <ChartCard>
                          <ChartTitle>Uso Semanal del Chatbot</ChartTitle>
                          <SimpleChart>
                            <ChartBar height="30%" day="Lun" />
                            <ChartBar height="45%" day="Mar" />
                            <ChartBar height="65%" day="Mié" />
                            <ChartBar height="80%" day="Jue" />
                            <ChartBar height="55%" day="Vie" />
                            <ChartBar height="25%" day="Sáb" />
                            <ChartBar height="15%" day="Dom" />
                          </SimpleChart>
                        </ChartCard>
                        
                        <ChartCard>
                          <ChartTitle>Distribución de Usuarios</ChartTitle>
                          <PieChart>
                            <PieSlice color="#AEF3E7" percentage="40%" label="Activos (4)" />
                            <PieSlice color="#5EEAD4" percentage="30%" label="Moderados (3)" />
                            <PieSlice color="#2DD4BF" percentage="20%" label="Ocasionales (2)" />
                            <PieSlice color="#14B8A6" percentage="10%" label="Nuevos (1)" />
                          </PieChart>
                        </ChartCard>
                      </ChartsGrid>
                    </Section>

                    <Section>
                      <h2>Estadísticas Adicionales</h2>
                      <StatsGrid>
                        <StatItem>
                          <StatLabel>Mensajes totales procesados</StatLabel>
                          <StatValue>1,247</StatValue>
                        </StatItem>
                        <StatItem>
                          <StatLabel>Eficiencia del sistema</StatLabel>
                          <StatValue>98.5%</StatValue>
                        </StatItem>
                        <StatItem>
                          <StatLabel>Usuarios conectados ahora</StatLabel>
                          <StatValue>NaN</StatValue>
                        </StatItem>
                        <StatItem>
                          <StatLabel>Uptime del servidor</StatLabel>
                          <StatValue>99.9%</StatValue>
                        </StatItem>
                      </StatsGrid>
                    </Section>

                    <ActionButtons>
                      <ActionButton onClick={() => setIsOpen(false)}>
                        Cerrar
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
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const MetricCard = styled.div`
  background: rgba(174, 243, 231, 0.1);
  border: 1px solid rgba(174, 243, 231, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(174, 243, 231, 0.2);
  }
`;

const MetricTitle = styled.h3`
  color: #AEF3E7;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MetricValue = styled.div`
  color: #5EEAD4;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const MetricLabel = styled.div`
  color: #e2e8f0;
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(174, 243, 231, 0.2);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${props => props.width};
  height: 100%;
  background: linear-gradient(90deg, #AEF3E7, #5EEAD4);
  transition: width 0.8s ease;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const ChartCard = styled.div`
  background: rgba(174, 243, 231, 0.05);
  border: 1px solid rgba(174, 243, 231, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
`;

const ChartTitle = styled.h4`
  color: #AEF3E7;
  margin-bottom: 1rem;
  text-align: center;
`;

const SimpleChart = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 150px;
  padding: 0 10px;
`;

const ChartBar = styled.div`
  width: 25px;
  height: ${props => props.height};
  background: linear-gradient(to top, #AEF3E7, #5EEAD4);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: scaleY(1.1);
  }

  &::after {
    content: '${props => props.day}';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: #e2e8f0;
  }
`;

const PieChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PieSlice = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: ${props => props.color};
    border-radius: 50%;
    flex-shrink: 0;
  }

  &::after {
    content: '${props => props.label}';
    color: #e2e8f0;
    font-size: 0.9rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(174, 243, 231, 0.05);
  border-radius: 8px;
  border-left: 4px solid #AEF3E7;
`;

const StatLabel = styled.span`
  color: #e2e8f0;
  font-size: 0.9rem;
`;

const StatValue = styled.span`
  color: #AEF3E7;
  font-weight: bold;
  font-size: 1.1rem;
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

export default Button3;