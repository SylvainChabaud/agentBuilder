'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';
import { addUser } from '../../../../lib/usersManager/addUser';
import { AnimatePresence } from 'framer-motion';
import {
  Overlay,
  ModalContainer,
  CloseButton,
  Title,
  TabContainer,
  TabButton,
  Form,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  ProvidersContainer,
  Divider,
  ProviderButton,
  overlayVariants,
  modalVariants,
} from './styles';

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

    try {
      await addUser(form.username, form.password);
      // Auto-login après inscription
      await handleLogin(e);
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription");
    }
  };

  const handleModeChange = (newMode) => {
    if (mode !== newMode) {
      // Réinitialiser le formulaire et les erreurs
      setForm({ username: '', password: '' });
      setError('');
      setMode(newMode);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={onClose}
          className={`${geistSans.variable} ${geistMono.variable}`}
        >
          <ModalContainer
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>✕</CloseButton>

            <Title>{mode === 'login' ? 'Connexion' : 'Créer un compte'}</Title>

            <TabContainer>
              <TabButton
                $active={mode === 'login'}
                onClick={() => handleModeChange('login')}
              >
                Connexion
              </TabButton>
              <TabButton
                $active={mode === 'register'}
                onClick={() => handleModeChange('register')}
              >
                Inscription
              </TabButton>
            </TabContainer>

            <Form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
              <Label>
                Nom d'utilisateur
                <Input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleInputChange}
                  autoComplete="username"
                />
              </Label>
              <Label>
                Mot de passe
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleInputChange}
                  autoComplete={
                    mode === 'login' ? 'current-password' : 'new-password'
                  }
                />
              </Label>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {mode === 'login' ? 'Se connecter' : 'Créer le compte'}
              </SubmitButton>
            </Form>

            {Object.values(providers).some(
              (provider) => provider.id !== 'credentials'
            ) && (
              <>
                <Divider>
                  <span>OU</span>
                </Divider>

                <ProvidersContainer>
                  {Object.values(providers).map(
                    (provider) =>
                      provider.id !== 'credentials' && (
                        <ProviderButton
                          key={provider.name}
                          onClick={() => signIn(provider.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Se connecter avec {provider.name}
                        </ProviderButton>
                      )
                  )}
                </ProvidersContainer>
              </>
            )}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
