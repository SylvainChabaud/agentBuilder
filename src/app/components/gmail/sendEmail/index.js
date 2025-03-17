'use client';

import { useSendEmail } from './useSendEmails';

export default function SendEmailPage() {
  const {
    to,
    subject,
    body,
    handleSendEmail,
    setTo,
    setSubject,
    setBody,
    error,
    status,
  } = useSendEmail();

  return (
    <div
      style={{
        maxWidth: '42rem',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Envoyer un Email via Gmail
      </h1>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>Erreur: {error}</p>
      )}
      {status && (
        <p style={{ color: 'green', textAlign: 'center' }}>{status}</p>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Destinataire :
        </label>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="ex: destinataire@gmail.com"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Sujet :
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Sujet de l'email"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Contenu :
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Votre message..."
          rows={5}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
            outline: 'none',
            resize: 'vertical',
          }}
        />
      </div>

      <button
        onClick={handleSendEmail}
        disabled={!to || !subject || !body}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: !to || !subject || !body ? '#9ca3af' : '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          cursor: !to || !subject || !body ? 'not-allowed' : 'pointer',
          transition: 'background 0.3s',
        }}
      >
        Envoyer
      </button>
    </div>
  );
}
