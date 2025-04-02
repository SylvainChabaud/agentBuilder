// components/iaAgent/FinalOutputViewer.js
import React from 'react';

/**
 * Affiche le résultat final généré par le moteur IA (rapport, texte, synthèse...).
 * @param {Object} props
 * @param {any} props.output - Résultat structuré ou textuel retourné par OutputBuilderAgent
 */
const FinalOutputViewer = ({ output }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>📄 Résultat final</h3>

      {typeof output === 'string' ? (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            backgroundColor: '#f4f7fa',
            padding: '1rem',
            borderRadius: '6px',
            fontFamily: 'monospace',
          }}
        >
          {output}
        </div>
      ) : (
        <pre
          style={{
            backgroundColor: '#f4f7fa',
            padding: '1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(output, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default FinalOutputViewer;
