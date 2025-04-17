'use client';
import React, { useState } from 'react';

export default function SecureInput({ label = 'Clé API', value, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>{label}</label>

      <div style={styles.inputWrapper}>
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={styles.input}
          placeholder="sk-xxx..."
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          style={styles.eyeButton}
          title={visible ? 'Masquer' : 'Afficher'}
        >
          {visible ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );
}

// 🎨 Styles inline
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    position: 'relative',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px 40px 10px 10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  eyeButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
