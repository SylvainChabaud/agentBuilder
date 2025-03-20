import React from 'react';
import { Handle, Position } from '@xyflow/react';

/**
 * Node "Gmail" : Paramètres pour (accessToken, label?) ou plus tard
 * Sur exécution, il appelle /api/gmail/emails pour récupérer la liste d'emails.
 */
export default function GmailNode({ data }) {
  // Déterminer le texte d'assistance à afficher en fonction de l'expertise
  let expertiseText = 'Récupère les emails';

  if (data && data.expertise) {
    if (data.expertise === 'sendEmail') {
      expertiseText = 'Envoie des emails';
    } else if (data.expertise === 'webSearch') {
      expertiseText = 'Effectue des recherches web';
    }
  }

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        background: data?.bg || '#fefefe',
        borderRadius: '4px',
      }}
    >
      <strong>{data?.label || 'Gmail Node'}</strong>
      <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
        {expertiseText}
      </div>
      {/* Un handle output pour envoyer la liste d'emails */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
