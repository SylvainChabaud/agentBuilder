'use client';

import React, { useState } from 'react';
import useMainAgent from './hooks/useMainAgent';
import ObjectiveForm from './components/objectiveForm';
import AgentExecutionViewer from './components/agentExecutionViewer';
import ObjectiveContextUploader from './components/objectiveContextUploader';
import FinalOutputViewer from './components/finalOutputViewer';
import ValidationFeedback from './components/validationFeedback';

const MainAgentInterface = () => {
  const [hasError, setHasError] = useState(false);
  const [objective, setObjective] = useState('');
  const [contextFiles, setContextFiles] = useState([]);
  const { runOrchestration, isRunning, logs, output, memory, validation } =
    useMainAgent();

  const handleLaunch = async () => {
    try {
      const result = await runOrchestration({ objective, contextFiles });

      if (result?.error) {
        setHasError(true);
        setTimeout(() => setHasError(false), 3000);
      }
    } catch (err) {
      console.error('Erreur lors de l’exécution de l’agent :', err);
      setHasError(true);
      setTimeout(() => setHasError(false), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🧠 Chef de projet IA</h1>
        <p
          style={{ ...styles.banner, ...(hasError ? styles.bannerError : {}) }}
        >
          ⚠️ Pour utiliser l’agent IA, renseignez votre clé API dans les{' '}
          <a href="/userSettings" style={styles.link}>
            paramètres utilisateur
          </a>
          .
        </p>
      </header>

      <section style={styles.section}>
        <ObjectiveForm
          value={objective}
          onChange={setObjective}
          onSubmit={handleLaunch}
          disabled={isRunning}
        />

        <ObjectiveContextUploader
          contextFiles={contextFiles}
          setContextFiles={setContextFiles}
        />
      </section>

      {isRunning && (
        <section style={styles.section}>
          <AgentExecutionViewer logs={logs} memory={memory} />
        </section>
      )}

      {output && (
        <section style={styles.section}>
          <FinalOutputViewer output={output} />
        </section>
      )}

      {validation && (
        <section style={styles.section}>
          <ValidationFeedback validation={validation} />
        </section>
      )}
    </div>
  );
};

export default MainAgentInterface;

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '32px 20px',
    fontFamily: 'Inter, sans-serif',
    lineHeight: '1.6',
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#2c3e50',
    marginBottom: '12px',
  },
  banner: {
    fontSize: '15px',
    backgroundColor: '#fff8e1',
    color: '#8a6d3b',
    border: '1px solid #f0c36d',
    padding: '12px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease-in-out',
  },
  bannerError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderColor: '#f5c6cb',
    boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.2)',
  },
  link: {
    color: '#004085',
    textDecoration: 'underline',
    fontWeight: 500,
  },
  section: {
    marginBottom: '40px',
    backgroundColor: '#f9f9f9',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
  },
};
