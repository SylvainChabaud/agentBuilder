import dotenv from 'dotenv';

dotenv.config();

/**
 * Fonction pour appeler Google Custom Search API
 * @param {string} query - La requête de recherche à effectuer
 */
async function fetchGoogleSearchResults(query) {
  const endpoint = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${process.env.GOOGLE_CUSTOM_SEARCH_CX}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      const errorInfo = await response.json();
      throw new Error(`Erreur API Google: ${errorInfo.error.message}`);
    }

    const data = await response.json();

    console.info('fetchGoogleSearchResults', data);

    return data.items; // Renvoie un tableau de résultats
  } catch (error) {
    console.error(
      'Erreur lors de la recherche Google Custom Search:',
      error.message
    );
    return [];
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    console.info('query GET', query);

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Le paramètre query est requis' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const results = await fetchGoogleSearchResults(query);

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
