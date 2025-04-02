// components/iaAgent/ValidationFeedback.js
import React from 'react';

/**
 * Affiche le résultat de la validation finale par le goalValidatorAgent.
 * @param {Object} props
 * @param {Object} props.validation - Objet contenant le statut de validation et les suggestions éventuelles
 * @param {boolean} props.validation.success - Résultat binaire de la validation
 * @param {string} [props.validation.feedback] - Commentaire ou justification
 */
const ValidationFeedback = ({ validation }) => {
  const { success, feedback } = validation || {};

  const statusStyle = {
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: success ? '#d4edda' : '#f8d7da',
    color: success ? '#155724' : '#721c24',
    border: `1px solid ${success ? '#c3e6cb' : '#f5c6cb'}`,
    marginTop: '2rem',
  };

  return (
    <div style={statusStyle}>
      <strong>
        {success
          ? '✅ Objectif atteint !'
          : '❌ L’objectif n’est pas encore totalement satisfait.'}
      </strong>

      {feedback && (
        <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default ValidationFeedback;
