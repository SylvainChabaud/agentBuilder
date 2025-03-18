/**
 * Service pour effectuer des recherches web via Gmail
 */

export const handleWebSearch = async ({ searchQuery, isWebSearch = false }) => {
  try {
    // Simulation d'une recherche web
    // Dans une implémentation réelle, vous pourriez appeler une API de recherche externe
    console.info('handleWebSearch:', { searchQuery, isWebSearch });

    // Appel à l'API de recherche web
    const response = await fetch(
      `/api/webSearch?query=${encodeURIComponent(searchQuery)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la recherche');
    }

    const { results = [] } = await response.json();

    const formattedResults = isWebSearch
      ? results
      : simplifyGoogleSearchResults(results);

    console.info('handleWebSearch:', formattedResults);

    return { results: formattedResults };
  } catch (error) {
    console.error('Erreur lors de la recherche web:', error);
    throw new Error(`Erreur lors de la recherche web: ${error.message}`);
  }
};

function simplifyGoogleSearchResults(items) {
  return items.map((item) => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
    image:
      item.pagemap?.cse_image?.[0]?.src ||
      item.pagemap?.cse_thumbnail?.[0]?.src ||
      null,
    displayLink: item.displayLink,
  }));
}
