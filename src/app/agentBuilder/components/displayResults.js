// DisplayKeys.jsx
import React from 'react';
import { advancedTextParser } from './run/contracts/contracts';

const DisplayResults = ({ data }) => {
  console.info('DisplayResults reçoit :', data);

  // Si data est vide ou non défini, on affiche un message
  if (!data || data.length === 0 || !Array.isArray(data)) {
    return <div>Aucune donnée à afficher.</div>;
  }

  return (
    <div className="keysContainer">
      <h3>Sortie du workflow :</h3>

      {data?.map((dataElement, i) => {
        console.info('Bloc n°', i, ' -> ', dataElement);

        // Supposons que dataElement ressemble à { data: [...] }
        const elements = dataElement.data;

        // Vérifie que elements est un tableau
        if (!elements || !Array.isArray(elements)) {
          return (
            <div key={i} style={{ marginBottom: '1rem' }}>
              Pas de propriété "data" sous forme de tableau.
            </div>
          );
        }

        // Pour chaque élément du tableau, on parse (si string) ou on prend tel quel (si objet)
        return (
          <div key={i} style={{ marginBottom: '1rem' }}>
            {elements.map((element, j) => {
              console.info('Élément n°', j, ' -> ', element);

              // Parse la string si c'est une chaîne, sinon on le considère déjà comme un objet
              const formattedData =
                typeof element === 'string'
                  ? advancedTextParser(element)
                  : element;

              console.info('Élément formaté :', formattedData);

              // Si après parsing ce n'est pas un objet, on affiche un message
              if (!formattedData || typeof formattedData !== 'object') {
                return (
                  <div key={j} style={{ color: 'red' }}>
                    Aucun objet valide fourni.
                  </div>
                );
              }

              // On affiche les clés de l'objet :
              const objectEntries = Object.entries(formattedData);

              return (
                <ul
                  key={j}
                  style={{
                    paddingBottom: '20px',
                    borderBottom: '1px solid #333',
                  }}
                >
                  <>
                    <strong>{element.id}</strong>
                    {objectEntries.map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}</strong> : {JSON.stringify(value)}
                      </li>
                    ))}
                  </>
                </ul>
              );
            })}
          </div>
        );
      })}

      <style jsx>{`
        .keysContainer {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f9f9f9;
        }
        h3 {
          margin-bottom: 12px;
          font-size: 1.2rem;
        }
        ul {
          list-style-type: none;
          padding: 0;
          margin: 0.5rem 0;
        }
        li {
          margin-bottom: 6px;
          line-height: 1.4;
        }
        li strong {
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default DisplayResults;
