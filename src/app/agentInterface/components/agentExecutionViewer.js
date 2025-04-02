// components/iaAgent/AgentExecutionViewer.js
import React from 'react';
import AgentStatusBadge from './agentStatusBadge';

/**
 * Affiche les logs d’exécution et les états mémoire intermédiaires pendant le cycle IA.
 * @param {Object} props
 * @param {Array} props.logs - Liste des événements/logs pendant l’exécution
 * @param {Object} props.memory - Données mémoire en cours (v1, v2, etc.)
 */
const AgentExecutionViewer = ({ logs = [], memory }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>🔁 Exécution en cours</h3>

      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          background: '#f6f8fa',
          padding: '0.5rem',
          borderRadius: '6px',
        }}
      >
        {logs.length === 0 ? (
          <p style={{ fontStyle: 'italic' }}>En attente de logs...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {logs.map((log, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>
                <AgentStatusBadge type={log.type} />{' '}
                {log.message || '[Entrée non définie]'}
              </li>
            ))}
          </ul>
        )}
      </div>

      {memory && (
        <div style={{ marginTop: '1rem' }}>
          <strong>🧠 Mémoire active :</strong>
          <pre
            style={{
              fontSize: '0.8rem',
              background: '#eef1f5',
              padding: '0.5rem',
              borderRadius: '4px',
              overflowX: 'auto',
            }}
          >
            {JSON.stringify(memory, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AgentExecutionViewer;
