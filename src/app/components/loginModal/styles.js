import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: var(--background);
  color: var(--foreground);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  overflow: hidden;
  animation: modalFadeIn 0.3s ease;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0;
    font-family: var(--font-geist-sans);
    font-size: 1.5rem;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;

  a {
    color: #0070f3;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
  background-color: #f9f9f9;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    background-color: #fff;
  }
`;

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: var(--foreground);
  color: var(--background);
  border: none;
  border-radius: 5px;
  font-family: var(--font-geist-mono);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

// Nouveaux éléments du LoginModal
export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContainer = styled(motion.div)`
  background-color: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #222;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 4px;
`;

export const TabButton = styled.button`
  padding: 12px 24px;
  border: none;
  background: ${(props) => (props.$active ? '#fff' : 'transparent')};
  color: ${(props) => (props.$active ? '#2563eb' : '#666')};
  font-weight: ${(props) => (props.$active ? '600' : '400')};
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
  box-shadow: ${(props) =>
    props.$active ? '0 2px 10px rgba(37, 99, 235, 0.15)' : 'none'};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
`;

export const ErrorMessage = styled.p`
  color: #e11d48;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 5px;
`;

export const SubmitButton = styled(motion.button)`
  padding: 14px;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 10px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const ProvidersContainer = styled.div`
  margin-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e0e0e0;
  }

  span {
    padding: 0 10px;
    color: #888;
    font-size: 0.85rem;
  }
`;

export const ProviderButton = styled(motion.button)`
  padding: 14px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eee;
  }
`;

// Animation variants
export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const modalVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 400,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};
