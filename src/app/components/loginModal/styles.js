import styled from 'styled-components';

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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-family: var(--font-geist-mono);
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid var(--foreground);
  border-radius: 5px;
  font-family: var(--font-geist-sans);
  background-color: transparent;
  color: var(--foreground);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
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
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--foreground);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  line-height: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
