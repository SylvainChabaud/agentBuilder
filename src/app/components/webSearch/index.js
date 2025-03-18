'use client';

import { useWebSearch } from './useWebSearch';

export default function WebSearch() {
  const { results, error, isLoading, query, setQuery, handleSearch } =
    useWebSearch();

  return (
    <div
      style={{
        maxWidth: '42rem',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Recherche Web
      </h1>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>Erreur: {error}</p>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Votre recherche..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
          onClick={() => handleSearch()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
            color: '#fff',
            borderRadius: '0.5rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            border: 'none',
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Recherche...' : 'Rechercher'}
        </button>
      </div>

      {results && results.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            Résultats de recherche
          </h2>

          {results.map((result, index) => (
            <div
              key={index}
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#fff',
              }}
            >
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                <a href={result.link} target="_blank" rel="noopener noreferrer">
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
                {result.displayLink}
              </p>

              <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                {result.snippet}
              </p>

              {result.pagemap?.cse_image?.[0]?.src && (
                <img
                  src={result.pagemap.cse_image[0].src}
                  alt={result.title}
                  style={{
                    width: '100%',
                    borderRadius: '0.5rem',
                    marginTop: '1rem',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
