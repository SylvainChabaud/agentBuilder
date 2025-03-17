'use client';

import React from 'react';
import { useLogout } from './useLogout';

const LogoutButton = () => {
  const { isLoading } = useLogout();

  if (isLoading) {
    return <div>Déconnexion en cours...</div>;
  }

  return null; // Le composant peut rester invisible si rien n'est affiché
};

export default LogoutButton;
