'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';
import { addUser } from '../../../../lib/usersManager/addUser';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function LoginModal({ isOpen, onClose, providers }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  if (!isOpen || !providers) return null;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username: form.username,
      password: form.password,
    });

    if (res?.error) {
      setError('Identifiants invalides');
    } else {
      onClose();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    console.log('🔍 form :', form);

    try {
      await addUser(form.username, form.password);
      // console.log('🔍 user :', user);

      // Auto-login après inscription
      await handleLogin(e);
    } catch (err) {
      setError(err.message || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '30px',
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <h1
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          {mode === 'login' ? 'Connexion' : 'Créer un compte'}
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <button onClick={() => setMode('login')} style={{ marginRight: 10 }}>
            Connexion
          </button>
          <button onClick={() => setMode('register')}>Inscription</button>
        </div>

        <form
          onSubmit={mode === 'login' ? handleLogin : handleRegister}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <label>
            Nom d'utilisateur
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginTop: '4px',
              }}
            />
          </label>
          <label>
            Mot de passe
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginTop: '4px',
              }}
            />
          </label>

          {error && (
            <p
              style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: mode === 'login' ? '#007bff' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {mode === 'login' ? 'Se connecter' : 'Créer le compte'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {Object.values(providers).map(
            (provider) =>
              provider.id !== 'credentials' && (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px',
                    marginBottom: '10px',
                  }}
                >
                  Se connecter avec {provider.name}
                </button>
              )
          )}
        </div>
      </div>
    </div>
  );
}
