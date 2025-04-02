// components/iaAgent/ObjectiveForm.js
import React from 'react';

/**
 * Formulaire pour saisir un objectif utilisateur en langage naturel.
 * @param {Object} props
 * @param {string} props.value - Texte de l’objectif en cours
 * @param {Function} props.onChange - Fonction de mise à jour de l’objectif
 * @param {Function} props.onSubmit - Fonction appelée au clic sur "Lancer"
 * @param {boolean} props.disabled - Si le bouton est désactivé ou non
 */
const ObjectiveForm = ({ value, onChange, onSubmit, disabled }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.info('event', { e, value });

    if (value?.trim()) onSubmit();
    else
      alert("Veuillez définir un objectif avant de lancer l'orchestration IA.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="objective-form"
      style={{ marginBottom: '1rem' }}
    >
      <label htmlFor="objectiveInput">🎯 Objectif à atteindre :</label>
      <textarea
        id="objectiveInput"
        placeholder="Ex : Rédiger une synthèse juridique sur le RGPD"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />

      <button
        type="submit"
        disabled={disabled}
        style={{
          marginTop: '0.5rem',
          padding: '0.5rem 1rem',
          fontWeight: 'bold',
        }}
      >
        {disabled ? 'En cours...' : 'Lancer le projet IA'}
      </button>
    </form>
  );
};

export default ObjectiveForm;
