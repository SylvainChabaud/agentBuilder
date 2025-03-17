'use client';

import { useEmails } from './useEmails';

export default function Emails() {
  const { emails, error, isDisabled, onGetEmails, onDeleteEmail } = useEmails();

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
        Liste des Emails Gmail
      </h1>
      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>Erreur: {error}</p>
      )}

      <button
        onClick={onGetEmails}
        disabled={isDisabled}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: isDisabled ? '#9ca3af' : '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.3s',
          marginBottom: '1rem',
        }}
      >
        Récupérer mes emails
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {emails.map((msg) => (
          <li
            key={msg.id}
            style={{
              border: '1px solid #ccc',
              margin: '1rem 0',
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p>
              <strong>From:</strong> {msg.from}
            </p>
            <p>
              <strong>Subject:</strong> {msg.subject}
            </p>
            <p>
              <strong>Snippet:</strong> {msg.snippet}
            </p>
            {msg.htmlContent ? (
              <div
                style={{
                  border: '1px solid #ddd',
                  marginTop: '1rem',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f1f5f9',
                }}
                dangerouslySetInnerHTML={{ __html: msg.htmlContent }}
              />
            ) : (
              <p style={{ fontStyle: 'italic' }}>Pas de contenu HTML</p>
            )}
            <button
              onClick={() => onDeleteEmail(msg.id)}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
