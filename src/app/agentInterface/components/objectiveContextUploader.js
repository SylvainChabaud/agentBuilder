// components/iaAgent/ObjectiveContextUploader.js
import React from 'react';

/**
 * Composant pour uploader des fichiers contextuels liés à l’objectif.
 * @param {Object} props
 * @param {File[]} props.contextFiles - Liste actuelle des fichiers
 * @param {Function} props.setContextFiles - Fonction pour mettre à jour les fichiers
 */
const ObjectiveContextUploader = ({ contextFiles, setContextFiles }) => {
  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setContextFiles([...contextFiles, ...newFiles]);
  };

  const handleRemove = (index) => {
    const updated = contextFiles.filter((_, i) => i !== index);
    setContextFiles(updated);
  };

  return (
    <div className="objective-uploader" style={{ marginBottom: '1rem' }}>
      <label htmlFor="contextUploader">
        📎 Ajouter des fichiers de contexte :
      </label>
      <input
        id="contextUploader"
        type="file"
        multiple
        onChange={handleChange}
        style={{ display: 'block', marginTop: '0.5rem' }}
      />

      {contextFiles.length > 0 && (
        <ul style={{ marginTop: '0.5rem' }}>
          {contextFiles.map((file, index) => (
            <li key={index}>
              {file.name}{' '}
              <button
                onClick={() => handleRemove(index)}
                style={{ color: 'red', marginLeft: '0.5rem' }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ObjectiveContextUploader;
