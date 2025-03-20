import React from 'react';
import { Handle, Position } from '@xyflow/react';

/**
 * Node "Display" : Reçoit la classification (2 catégories),
 * affiche + propose suppression.
 */
export default function DisplayNode({ data }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        background: '#eaffea',
        borderRadius: '4px',
      }}
    >
      <strong>Display Node</strong>
      <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
        Affiche &amp; supprime
      </div>

      <Handle type="target" position={Position.Top} />
      {/* Pas de source, c’est un “end” node */}
    </div>
  );
}
