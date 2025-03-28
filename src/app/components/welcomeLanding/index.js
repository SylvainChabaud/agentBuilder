// File: WelcomeLanding.jsx
import React from 'react';
import FooterWrapper from '../footer';

export default function WelcomeLanding({ onLoginClick }) {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(to bottom, #f9f9f9, #e0f0ff)',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111' }}>
        Bienvenue sur <span style={{ color: '#0070f3' }}>AgentBuilder</span> 🚀
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          lineHeight: '1.6',
          marginBottom: '2rem',
          color: '#444',
        }}
      >
        Créez vos propres agents intelligents, connectez vos outils et
        automatisez tout ce qui peut l’être. Une plateforme moderne, intuitive,
        propulsée par l’IA, pour libérer votre potentiel.
      </p>
      <button
        onClick={onLoginClick}
        style={{
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '14px 28px',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        Commencer maintenant
      </button>
    </main>
  );
}
