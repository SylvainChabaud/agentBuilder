import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

/**
 * Node "ChatGPT" : Reçoit un tableau d'emails, renvoie la classification
 * (+importants, -importants).
 */
export default function ChatGPTNode({ data }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        background: '#f0f8ff',
        borderRadius: '4px',
      }}
    >
      <strong>ChatGPT Node</strong>
      <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
        Analyse &amp; résume
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
