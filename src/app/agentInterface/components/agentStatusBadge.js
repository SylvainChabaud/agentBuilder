// components/iaAgent/AgentStatusBadge.js
import React from 'react';

/**
 * Affiche un badge visuel pour le type de log : info, success, warning, error
 * @param {Object} props
 * @param {'info'|'success'|'warning'|'error'} props.type - Type de message
 */
const AgentStatusBadge = ({ type }) => {
  const colorMap = {
    info: '#5589fe',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
  };

  const labelMap = {
    info: 'INFO',
    success: 'OK',
    warning: '⚠',
    error: '⛔',
  };

  const bgColor = colorMap[type] || '#ccc';
  const label = labelMap[type] || 'LOG';

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        backgroundColor: bgColor,
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.75rem',
        marginRight: '0.5rem',
      }}
    >
      {label}
    </span>
  );
};

export default AgentStatusBadge;
