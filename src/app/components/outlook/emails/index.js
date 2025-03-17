'use client';

import React from 'react';
import { useEmails } from './useEmails';

const Emails = () => {
  const { emails, loading, error } = useEmails();

  if (loading) return <div>Chargement des emails...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            <strong>{email.subject || '(Sans sujet)'}</strong>
            <p>De : {email.from?.emailAddress?.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Emails;
