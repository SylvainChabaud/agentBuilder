'use client';

import { useWebSearch } from './useWebSearch';

export default function WebSearch() {
  const { query, setQuery, results, isLoading, error, handleSearch } =
    useWebSearch();

  return (
    <div
      style={{
        maxWidth: '42rem',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Recherche Web
      </h1>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>Erreur: {error}</p>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Votre recherche..."
            style={{
              flexGrow: 1,
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            disabled={!query || isLoading}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: !query || isLoading ? '#9ca3af' : '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: !query || isLoading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s',
            }}
          >
            {isLoading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>
      </div>

      {isLoading && (
        <p style={{ textAlign: 'center' }}>Chargement des résultats...</p>
      )}

      {results && results.length > 0 ? (
        <div>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            Résultats de recherche
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {results.map((result, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: '#1e40af',
                  }}
                >
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    {result.title}
                  </a>
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#4b5563',
                    marginBottom: '0.5rem',
                  }}
                >
                  {result.link}
                </p>
                <p style={{ fontSize: '0.95rem' }}>{result.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        results && (
          <p style={{ textAlign: 'center' }}>
            Aucun résultat trouvé pour votre recherche.
          </p>
        )
      )}
    </div>
  );
}
