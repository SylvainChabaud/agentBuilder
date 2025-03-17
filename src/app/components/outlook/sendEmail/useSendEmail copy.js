import { useState } from 'react';
import { sendOutlookEmail } from 'lib/services/outlook/fetchSendEmail';

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

    const result = await sendOutlookEmail({ to, subject, content });

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
