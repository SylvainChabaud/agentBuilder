import React from 'react';
import Emails from 'src/app/components/gmail/emails';

const GmailsPage = () => {
  return (
    <div>
      <h1>Accueil</h1>
      <p>Bienvenue sur l’intégration Gmail.</p>
      <Emails />
    </div>
  );
};

export default GmailsPage;
