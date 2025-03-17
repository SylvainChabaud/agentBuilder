import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

/**
 * Node "Gmail" : Paramètres pour (accessToken, label?) ou plus tard
 * Sur exécution, il appelle /api/gmail/emails pour récupérer la liste d'emails.
 */
export default function GmailNode({ data }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        background: '#fefefe',
        borderRadius: '4px',
      }}
    >
      <strong>Gmail Node</strong>
      <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
        Récupère les emails
      </div>
      {/* Un handle output pour envoyer la liste d'emails */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
