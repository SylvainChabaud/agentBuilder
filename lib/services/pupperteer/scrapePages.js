/**
 * Service pour effectuer des recherches web via Gmail
 */

export const handleScrapesPages = async ({ pagesContent }) => {
  try {
    // Simulation d'une recherche web
    // Dans une implémentation réelle, vous pourriez appeler une API de recherche externe
    console.info('handleScrapesPages:', { pagesContent });

    // Appel à l'API de recherche web
    const response = await fetch('/api/scrapeRecipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sitesToScrape: pagesContent }),
    });

    if (!response.ok) {
      const errInfo = await response.json();
      throw new Error(errInfo.error || 'Erreur du scraping Puppeteer');
    }

    const { results } = await response.json();

    console.info('handleScrapesPages:', results);

    return { results };
  } catch (error) {
    console.error('Erreur lors de la recherche web:', error);
    throw new Error(`Erreur lors de la recherche web: ${error.message}`);
  }
};
