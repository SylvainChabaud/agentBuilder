'use client';
import { useState } from 'react';

export const useWebSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Appel à l'API de recherche web
      const response = await fetch(
        `/api/webSearch?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la recherche');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Erreur lors de la recherche web:', err);
      setError(err.message || 'Une erreur est survenue lors de la recherche');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    handleSearch,
  };
};
