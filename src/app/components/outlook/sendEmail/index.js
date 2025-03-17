'use client';

import React from 'react';
import { useSendEmail } from './useSendEmail';

const SendEmail = () => {
  const {
    loading,
    message,
    to,
    subject,
    content,
    handleSubmit,
    setTo,
    setSubject,
    setContent,
  } = useSendEmail();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Destinataire :</label>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div>
        <label>Sujet :</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label>Contenu :</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Envoyer'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SendEmail;
