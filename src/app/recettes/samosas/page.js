'use client';

import React from 'react';
import { useRecipes } from './useRecipes';

export default function SamosaRecipes() {
  const { recipes, loading, error, handleSearch } = useRecipes();

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '20px',
          color: '#333',
        }}
      >
        Recettes Originales
      </h1>

      <button
        onClick={handleSearch}
        style={{
          display: 'block',
          margin: '0 auto 20px auto',
          padding: '10px 20px',
          backgroundColor: '#e67e22',
          color: '#fff',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          fontWeight: 'bold',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d35400')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e67e22')}
      >
        Découvrir de Nouvelles Recettes
      </button>

      {loading && (
        <div style={{ textAlign: 'center', color: '#666', margin: '40px 0' }}>
          <p style={{ fontSize: '18px' }}>
            Recherche des meilleures recettes de samoussas...
          </p>
          <p style={{ fontSize: '14px' }}>
            Cela peut prendre quelques instants
          </p>
        </div>
      )}

      {error && (
        <p style={{ textAlign: 'center', color: 'red', margin: '20px 0' }}>
          Erreur : {error}
        </p>
      )}

      {/* Affichage des recettes formatées */}
      {!loading && recipes.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px',
            margin: '30px 0',
          }}
        >
          {recipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = 'translateY(-5px)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = 'translateY(0)')
              }
            >
              <img
                src={recipe.image}
                alt={recipe.titre}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ padding: '20px' }}>
                <h2 style={{ margin: '0 0 10px 0', color: '#e67e22' }}>
                  {recipe.titre}
                </h2>
                <p
                  style={{
                    color: '#666',
                    fontSize: '14px',
                    margin: '0 0 15px 0',
                  }}
                >
                  {recipe.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '15px',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    Préparation: {recipe.temps_preparation}
                  </span>
                  <span
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    Cuisson: {recipe.temps_cuisson}
                  </span>
                  <span
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    Difficulté: {recipe.difficulte}
                  </span>
                </div>

                <details style={{ marginTop: '10px' }}>
                  <summary
                    style={{
                      cursor: 'pointer',
                      color: '#e67e22',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      outline: 'none',
                    }}
                  >
                    Voir les ingrédients
                  </summary>
                  <ul
                    style={{
                      paddingLeft: '20px',
                      marginTop: '10px',
                      color: '#555',
                      fontSize: '14px',
                    }}
                  >
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i} style={{ marginBottom: '5px' }}>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </details>

                <details style={{ marginTop: '15px' }}>
                  <summary
                    style={{
                      cursor: 'pointer',
                      color: '#e67e22',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      outline: 'none',
                    }}
                  >
                    Voir les étapes
                  </summary>
                  <ol
                    style={{
                      paddingLeft: '20px',
                      marginTop: '10px',
                      color: '#555',
                      fontSize: '14px',
                    }}
                  >
                    {recipe.etapes.map((etape, i) => (
                      <li key={i} style={{ marginBottom: '8px' }}>
                        {etape}
                      </li>
                    ))}
                  </ol>
                </details>

                <p
                  style={{
                    fontSize: '12px',
                    color: '#999',
                    marginTop: '20px',
                    fontStyle: 'italic',
                  }}
                >
                  Source: {recipe.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message si aucun résultat n'est trouvé */}
      {!loading && recipes.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            margin: '40px 0',
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
            Aucune recette disponible. Cliquez sur "Découvrir de Nouvelles
            Recettes" pour commencer.
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            Vous découvrirez des recettes de samoussas traditionnels et
            originaux du monde entier !
          </p>
        </div>
      )}
    </div>
  );
}
