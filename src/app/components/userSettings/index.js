'use client';
import React, { useState, useEffect } from 'react';
import SecureInput from './components/secureInput';
import { useApiKeyManager } from './hooks/useApiKeyManager';

export default function UserSettings() {
  const { llmSettings, handleChange, saveKey, clearKey, saved, deleted } =
    useApiKeyManager();

  const [testResult, setTestResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  // Réinitialiser le résultat du test à chaque modification
  useEffect(() => {
    setTestResult('');
  }, [llmSettings.apiKeyInput, llmSettings.baseUrl, llmSettings.model]);

  useEffect(() => {
    if (!llmSettings.hasKey) {
      handleChange('baseUrl', '');
      handleChange('model', '');
      handleChange('apiKeyInput', '');
    }
  }, [llmSettings.hasKey]);

  const testApiKey = async () => {
    setTestResult('');
    setIsTesting(true);

    const { apiKeyInput, baseUrl, model } = llmSettings;

    if (!apiKeyInput || !baseUrl || !model) {
      setTestResult('❌ Remplissez tous les champs avant de tester.');
      setIsTesting(false);
      return;
    }

    try {
      const response = await fetch('/api/testModel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKeyInput,
          baseURL: baseUrl,
          model,
        }),
      });

      const data = await response.json();
      if (data?.success) {
        setTestResult('✅ Clé valide et modèle compatible.');
      } else {
        setTestResult(`❌ Erreur : ${data?.error || 'inconnue'}`);
      }
    } catch (err) {
      setTestResult('❌ Échec du test : ' + err.message);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>Votre clé API personnelle :</label>

      {llmSettings.hasKey ? (
        <div style={styles.infoBox}>✅ Une clé est déjà enregistrée.</div>
      ) : (
        <div style={styles.infoBox}>❌ Aucune clé API enregistrée.</div>
      )}

      {llmSettings.hasKey && (
        <p style={styles.securityNotice}>
          🔒 Une clé est déjà enregistrée. Pour des raisons de sécurité, elle
          n’est jamais visible ni testable automatiquement. Si vous souhaitez
          tester une nouvelle clé, vous pouvez en saisir une nouvelle et
          l’enregistrer à la place de l’ancienne.
        </p>
      )}

      <SecureInput
        value={llmSettings.apiKeyInput}
        onChange={(val) => handleChange('apiKeyInput', val)}
        placeholder="sk-..."
      />
      <p style={styles.infoMessage}>
        🔐 La clé API que vous saisissez ici est utilisée uniquement pour tester
        la connexion. Elle n’est{' '}
        <strong>jamais enregistrée automatiquement</strong>.
      </p>

      <label style={styles.label}>URL de l’API :</label>
      <input
        style={styles.input}
        value={llmSettings.baseUrl}
        onChange={(e) => handleChange('baseUrl', e.target.value)}
        placeholder="https://api.deepseek.com"
      />

      <label style={styles.label}>Modèle à utiliser :</label>
      <input
        style={styles.input}
        value={llmSettings.model}
        onChange={(e) => handleChange('model', e.target.value)}
        placeholder="deepseek-chat"
      />

      <div style={styles.buttonRow}>
        <button onClick={saveKey} style={styles.saveButton}>
          💾 Enregistrer
        </button>

        {llmSettings.hasKey && (
          <button onClick={clearKey} style={styles.clearButton}>
            🗑 Purger la clé
          </button>
        )}

        {llmSettings.apiKeyInput && (
          <button
            onClick={testApiKey}
            style={{
              ...styles.testButton,
              opacity: isTesting ? 0.6 : 1,
              pointerEvents: isTesting ? 'none' : 'auto',
            }}
          >
            {isTesting ? '⏳ Test en cours...' : '🔍 Tester la clé'}
          </button>
        )}

        {saved && <span style={styles.savedMessage}>✔️ Clé enregistrée</span>}
        {deleted && <span style={styles.deletedMessage}>🗑 Clé supprimée</span>}
      </div>

      {testResult && <p style={styles.testResult}>{testResult}</p>}
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  label: { fontWeight: 500, fontSize: '14px', color: '#333' },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
  },
  buttonRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '8px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#cfe8fc',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  clearButton: {
    padding: '10px 20px',
    backgroundColor: '#fcdede',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  testButton: {
    padding: '10px 20px',
    backgroundColor: '#e7f0fe',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  savedMessage: {
    fontSize: '13px',
    color: '#2e7d32',
    backgroundColor: '#dbf4e1',
    padding: '6px 12px',
    borderRadius: '4px',
    fontWeight: 500,
  },
  deletedMessage: {
    fontSize: '13px',
    color: '#c62828',
    backgroundColor: '#fcdede',
    padding: '6px 12px',
    borderRadius: '4px',
    fontWeight: 500,
  },
  testResult: {
    fontSize: '14px',
    color: '#333',
    marginTop: '12px',
    fontWeight: 500,
  },
  infoBox: {
    fontSize: '13px',
    color: '#555',
    backgroundColor: '#f2f2f2',
    padding: '6px 10px',
    borderRadius: '4px',
    fontStyle: 'italic',
  },
};
