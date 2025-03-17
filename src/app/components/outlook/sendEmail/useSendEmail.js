import { useState } from 'react';
import { handleMsalLoginClient } from '../msal/handleMsalLoginClient';
import { handleSendEmail } from 'lib/services/gmail/sendEmail';

export const useSendEmail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const accessToken = await handleMsalLoginClient();

    const result = await handleSendEmail({
      to,
      subject,
      content,
      accessToken,
    });

    setMessage(result.message);
    setLoading(false);
  };

  return {
    loading,
    message,
    to,
    subject,
    content,
    handleSubmit,
    setTo,
    setSubject,
    setContent,
  };
};
