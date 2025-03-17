import { useState, useEffect } from 'react';

import { handleDeleteEmail } from 'lib/services/gmail/deleteEmail';
import { handleFetchEmails } from 'lib/services/gmail/fetchEmails';
import { handleGmailLoginClient } from '../oAuth/handleGmailLoginClient';

export const useEmails = () => {
  const [accessToken, setAccessToken] = useState('');
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);

  // Au montage, on vérifie la présence de ?accessToken= dans l'URL,
  // sinon on déclenche l'authentification
  useEffect(() => {
    console.info('useEmails');

    const getToken = async () => {
      console.info('getToken');
      const accessToken = await handleGmailLoginClient('/gmail/emails');
      console.info('useEmails 1', accessToken);

      setAccessToken(accessToken);
    };

    getToken();
  }, []);

  const onGetEmails = async () => {
    try {
      console.info('onGetEmails', accessToken);
      const result = await handleFetchEmails(accessToken);
      setEmails(result.messages || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const onDeleteEmail = async (messageId) => {
    try {
      await handleDeleteEmail(accessToken, messageId);
      setEmails((prev) => prev.filter((msg) => msg.id !== messageId));
      setError(null);
      alert('Email supprimé avec succès.');
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    isDisabled: !accessToken,
    emails,
    error,
    onGetEmails,
    onDeleteEmail,
  };
};
