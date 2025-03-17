import { useEffect, useState } from 'react';

const ExpertiseBuilder = ({ onCreateExpert, builderValues }) => {
  console.info('ExpertiseBuilder', builderValues);
  const [expertise, setExpertise] = useState({
    name: builderValues.name,
    outputs: [],
  });

  const [newOutput, setNewOutput] = useState({
    name: '',
    values: '',
  });

  useEffect(() => {
    console.info('useEffect ExpertiseBuilder', builderValues);
    const revertConvertOutputs = (convertedOutputs) => {
      if (!builderValues.outputs) return [];

      return Object.entries(convertedOutputs).map(([key, value]) => ({
        name: key,
        values: value.split('|').map((v) => v.trim()), // Séparer et nettoyer les valeurs
      }));
    };

    setExpertise((expertise) => ({
      ...expertise,
      name: builderValues.name,
      outputs: revertConvertOutputs(builderValues.outputs),
    }));
  }, [builderValues]);

  const handleCreateExpert = () => {
    console.info('handleCreateExpert', expertise);

    onCreateExpert(expertise);
  };

  const handleAddOutput = () => {
    if (!newOutput.name) return;

    const valuesArray = newOutput.values
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v);

    setExpertise((prev) => ({
      ...prev,
      outputs: [
        ...prev.outputs,
        {
          name: newOutput.name.trim(),
          values: valuesArray,
        },
      ],
    }));

    setNewOutput({ name: '', values: '' });
  };

  const handleRemoveOutput = (index) => {
    const isConfirmed = confirm(
      'êtes-vous sûr de vouloir suppprimer cette sortie ?'
    );
    isConfirmed &&
      setExpertise((prev) => {
        const newOutputs = [...prev.outputs];
        newOutputs.splice(index, 1);
        return { ...prev, outputs: newOutputs };
      });
  };

  const generatePromptSyntax = () => {
    let prompt = `Expertise : ${expertise.name || '[NOM_EXPERTISE]'}\n\n`;
    prompt += expertise.outputs
      .map((output) => {
        const values =
          output.values.length > 0
            ? `(${output.values.join('|')})`
            : `[${output.name.toLowerCase()}]`;

        return `${output.name.toUpperCase()} : ${values}`;
      })
      .join('\n');
    return prompt;
  };

  return (
    <div className="expertise-builder">
      <div className="expertise-header">
        <input
          type="text"
          placeholder="Nom de l'expertise"
          value={expertise.name}
          onChange={(e) =>
            setExpertise((prev) => ({ ...prev, name: e.target.value }))
          }
          className="input-field"
        />
      </div>

      <div className="output-form">
        <input
          type="text"
          placeholder="Nom de la sortie (ex: TYPE)"
          value={newOutput.name}
          onChange={(e) => setNewOutput({ ...newOutput, name: e.target.value })}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Valeurs possibles (séparées par des virgules)"
          value={newOutput.values}
          onChange={(e) =>
            setNewOutput({ ...newOutput, values: e.target.value })
          }
          className="input-field"
        />

        <button onClick={handleAddOutput} className="add-button">
          Ajouter une sortie
        </button>
      </div>

      <div className="outputs-list">
        {expertise.outputs.map((output, index) => (
          <div key={index} className="output-item">
            <div className="output-header">
              <h4>{output.name.toUpperCase()}</h4>
              <button
                onClick={() => handleRemoveOutput(index)}
                className="remove-button"
              >
                ×
              </button>
            </div>

            {output.values.length > 0 && (
              <div className="values-list">
                {output.values.map((value, i) => (
                  <span key={i} className="value-tag">
                    {value}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="prompt-preview">
        <h3>Sorties générées :</h3>
        <pre>{generatePromptSyntax()}</pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleCreateExpert} className="create-button">
          Créer l'expert
        </button>
      </div>

      <style jsx>{`
        .expertise-builder {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .expertise-header {
          margin-bottom: 20px;
        }

        .expertise-header .input-field {
          width: 100%;
          padding: 12px;
          font-size: 1.1em;
        }

        .output-form {
          display: grid;
          gap: 10px;
          margin-bottom: 20px;
        }

        .input-field {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .add-button {
          background: #4caf50;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .create-button {
          background: rgb(245, 132, 235);
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s;
          width: 100%;
        }

        .add-button:hover {
          opacity: 0.9;
        }

        .outputs-list {
          margin-top: 20px;
        }

        .output-item {
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #fff;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .remove-button {
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .remove-button:hover {
          transform: scale(1.1);
        }

        .values-list {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .value-tag {
          background: #e0e0e0;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.9em;
        }

        .prompt-preview pre {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 6px;
          white-space: pre-wrap;
          margin-top: 15px;
          border: 1px solid #eee;
        }
      `}</style>
    </div>
  );
};

export default ExpertiseBuilder;
