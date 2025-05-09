import styled from 'styled-components';

export const Header = styled.header`
  background-color: var(--foreground);
  color: var(--background);
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  nav {
    margin-top: 1rem;
    display: flex;
    gap: 1.5rem;
    position: relative;

    a,
    .nav-item {
      display: flex;
      font-family: var(--font-geist-mono);
      color: var(--background);
      text-decoration: none;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border: 2px solid transparent;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: var(--background);
        color: var(--foreground);
        border-color: var(--foreground);
      }
    }
  }

  .user-nav-item {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    font-family: var(--font-geist-mono);
    color: var(--background);
    text-decoration: none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;

    &:hover {
      background-color: var(--background);
      color: var(--foreground);
      border-color: var(--foreground);
    }
  }
`;

export const LoginButton = styled.button`
  font-family: var(--font-geist-mono);
  background-color: transparent;
  color: var(--background);
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--background);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--background);
    color: var(--foreground);
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%; /* Directement sous l'élément parent */
  left: 0; /* Aligné à gauche de l'élément parent */
  background-color: var(--foreground);
  border: 2px solid var(--background);
  border-radius: 5px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  min-width: 160px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &.visible {
    opacity: 1;
    visibility: visible;
    transform: translate(0, 5px); /* légèrement décalé pour un effet smooth */
  }

  a {
    display: block;
    padding: 0.5rem;
    color: var(--background);
    text-decoration: none;

    &:hover {
      background-color: var(--background);
      color: var(--foreground);
    }
  }
`;
