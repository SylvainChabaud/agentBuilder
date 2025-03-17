/**
 * Effectue un appel à l'API Hugging Face pour un modèle donné.
 * @param {string} model - Nom du modèle (ex : "facebook/bart-large-cnn")
 * @param {string} text - Texte à transmettre au modèle
 * @returns {Promise<string>} - Résumé généré par le modèle
 */
export const fetchFromHuggingFace = async (model, text) => {
  const apiKey = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;
  const endpoint = `https://api-inference.huggingface.co/models/${model}`;

  const body = {
    inputs: text,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur API Hugging Face');
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Hugging Face :", error);
    throw error;
  }
};
