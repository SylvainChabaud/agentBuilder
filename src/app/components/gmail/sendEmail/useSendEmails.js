'use client';
import { useState, useEffect } from 'react';
import { handleSendEmail as sendEmailService } from 'lib/services/gmail/sendEmail';
import { handleGmailLoginClient } from '../oAuth/handleGmailLoginClient';

export const useSendEmail = () => {
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    console.info('useSendEmail');

    const getToken = async () => {
      console.info('getToken');
      const accessToken = await handleGmailLoginClient('/gmail/sendEmail');
      console.info('useSendEmail 1', accessToken);

      setAccessToken(accessToken);
    };

    getToken();
  }, []);

  const handleSendEmail = async () => {
    try {
      setError(null);
      setStatus('Envoi en cours...');
      await sendEmailService(accessToken, to, subject, body);
      setStatus('Email envoyé avec succès !');
    } catch (err) {
      setError(err.message);
      setStatus('');
    }
  };

  return {
    handleSendEmail,
    setError,
    error,
    status,
    to,
    setTo,
    subject,
    setSubject,
    body,
    setBody,
  };
};
