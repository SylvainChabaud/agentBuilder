'use client';
import React from 'react';
import SecureInput from './components/secureInput';
import { useApiKeyManager } from './hooks/useApiKeyManager';

export default function UserSettings() {
  const {
    inputValue,
    userApiKey,
    handleInput,
    saveKey,
    clearKey,
    saved,
    deleted,
  } = useApiKeyManager();

  console.info('inputValue', inputValue);
  console.info('userApiKey', userApiKey);

  return (
    <div style={styles.wrapper}>
      <label htmlFor="apiKey" style={styles.label}>
        Votre clé API personnelle :
      </label>

      <SecureInput value={inputValue} onChange={handleInput} />

      <div style={styles.buttonRow}>
        <button onClick={saveKey} style={styles.saveButton}>
          💾 Enregistrer
        </button>

        {userApiKey && (
          <button onClick={clearKey} style={styles.clearButton}>
            🗑 Purger la clé existante
          </button>
        )}

        {saved && <span style={styles.savedMessage}>✔️ Clé enregistrée</span>}
        {deleted && <span style={styles.deletedMessage}>🗑 Clé supprimée</span>}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: '24px', // plus de marge en haut
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // espacement vertical global entre les sections
    fontFamily: 'Arial, sans-serif',
  },
  label: {
    fontWeight: 500,
    fontSize: '14px',
    color: '#333',
  },
  buttonRow: {
    display: 'flex',
    gap: '16px', // plus d’espace entre les boutons
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '8px',
  },
  saveButton: {
    padding: '10px 20px', // plus de confort visuel
    backgroundColor: '#cfe8fc',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  clearButton: {
    padding: '10px 20px',
    backgroundColor: '#fcdede',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  savedMessage: {
    fontSize: '13px',
    color: '#2e7d32',
    backgroundColor: '#dbf4e1',
    padding: '6px 12px',
    borderRadius: '4px',
    fontWeight: 500,
    marginLeft: '12px',
  },
  deletedMessage: {
    fontSize: '13px',
    color: '#c62828',
    backgroundColor: '#fcdede',
    padding: '6px 12px',
    borderRadius: '4px',
    fontWeight: 500,
    marginLeft: '12px',
  },
};
