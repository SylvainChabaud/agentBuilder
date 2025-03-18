'use client';
import { handleWebSearch } from 'lib/services/gmail/webSearch';
import { useState } from 'react';

export const useWebSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    console.info('handleSearch', query);

    try {
      setIsLoading(true);
      setError(null);

      const { results } = await handleWebSearch({
        searchQuery: query,
        isWebSearch: true,
      });

      setResults(results || []);
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
