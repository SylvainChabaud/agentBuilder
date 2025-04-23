export const handleWebSearch = async ({ searchQuery, isWebSearch = false }) => {
  try {
    console.info('handleWebSearch:', { searchQuery, isWebSearch });

    // Vérification de la présence de la query
    if (!searchQuery) {
      throw new Error('La requête de recherche est requise.');
    }

    // Appel à l'API de recherche web
    const response = await fetch(
      `/api/webSearch?query=${encodeURIComponent(searchQuery)}`
    );

    // Vérification de la réponse de l'API
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la recherche');
    }

    const { results = [] } = await response.json();

    // Simplification des résultats en fonction de `isWebSearch`
    const formattedResults = isWebSearch
      ? results
      : simplifyGoogleSearchResults(results);

    console.info('handleWebSearch:', formattedResults);

    return { results: formattedResults };
  } catch (error) {
    console.error('Erreur lors de la recherche web:', error.message);

    // Renvoyer une erreur explicite
    throw new Error(`Erreur dans handleWebSearch: ${error.message}`);
  }
};
