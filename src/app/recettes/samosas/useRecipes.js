import { MODEL_SOURCES } from 'app/constants';
import { handleWebSearch } from 'lib/services/gmail/webSearch';
import { handleScrapesPages } from 'lib/services/pupperteer/scrapePages';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { extractObject } from 'src/app/agentBuilder/components/run/utils';
import { MODELS } from 'src/app/chatInterface/constants';

export const useRecipes = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  console.info('userId', userId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);
  // Variables pour l'API
  const iaModel = MODELS[13]?.model || 'qwen2.5:1.5b';
  const modelSource = MODELS[13]?.modelSource || MODEL_SOURCES.OLLAMA;
  const outputs = {
    titre: 'string',
    description: 'string',
    ingredients: 'array',
    etapes: 'array',
    temps_preparation: 'string',
    temps_cuisson: 'string',
    difficulte: 'string',
    portion: 'string',
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const randomVariations = [
        'indian',
        'african',
        'traditional',
        'spicy',
        'vegetarian',
        'authentic',
        'easy',
        'street-food',
        'crispy',
        'baked',
        'fried',
        'fusion',
        'gourmet',
      ];

      const randomTerm =
        randomVariations[Math.floor(Math.random() * randomVariations.length)];

      const randomCountrySites = [
        'site:.fr',
        'site:.com',
        'site:.co.uk',
        'site:.ca',
        'site:.in',
      ];
      const randomSite =
        randomCountrySites[
          Math.floor(Math.random() * randomCountrySites.length)
        ];

      const searchQuery = `${randomTerm} samossa recipes ${randomSite}`;
      // const searchQuery = `beef recipes`;

      console.info('randomTerm', searchQuery);

      const { results } = await handleWebSearch({
        searchQuery,
        isWebSearch: true,
      });

      console.info('handleWebSearch', results);

      const slidedResults = results.slice(0, 3);
      const pagesContent = slidedResults.map(
        ({ formattedUrl }) => formattedUrl
      );
      const { results: scrapesContent } = await handleScrapesPages({
        pagesContent,
      });

      const systemMessage = {
        id: '0',
        role: 'system',
        content: `GOAL: Résumer et extraire une recette complète depuis un texte brut issu d'un site web sur la cuisine, en créant une recette claire, structurée et originale à partir des ingrédients et instructions identifiés.
        
        RETURN_FORMAT: {
          "titre": "Titre de la recette",
          "description": "Une brève description de la recette",
          "ingredients": [
            "ingrédient 1",
            "ingrédient 2",
            "ingrédient 3"
          ],
          "etapes": [
            "Étape 1 de la préparation",
            "Étape 2 de la préparation",
            "Étape 3 de la préparation"
          ],
          "temps_preparation": "Temps de préparation",
          "temps_cuisson": "Temps de cuisson",
          "difficulte": "Difficulté de la recette",
          "portion": "Nombre de portions"
        }
        
        WARNINGS: [
          "Respecte rigoureusement le format JSON indiqué. Ne pas ajouter de champs supplémentaires.",
          "Assure-toi de ne garder que les informations pertinentes liées à une recette (éviter les textes hors sujet, publicités, commentaires d'utilisateurs, etc.).",
          "Si une information comme le temps de cuisson ou difficulté est absente du texte, indique explicitement 'non spécifié'."
        ],
        
        CONTEXT_DUMP: "Le texte brut complet (environ 2000 tokens) du site web concernant la cuisine et contenant des ingrédients et des instructions pour réaliser une recette sera fourni ici. Ton travail consiste à extraire les éléments clés de ce texte pour créer un résumé précis et structuré selon le format JSON indiqué."
        `,
        timestamp: new Date(),
      };

      const assistantMessage = {
        id: '1',
        role: 'assistant',
        content: `{
          "titre": "Titre de la recette",
          "description": "Une brève description de la recette",
          "ingredients": [
            "ingrédient 1",
            "ingrédient 2",
            "ingrédient 3"
          ],
          "etapes": [
            "Étape 1 de la préparation",
            "Étape 2 de la préparation",
            "Étape 3 de la préparation"
          ],
          "temps_preparation": "Temps de préparation",
          "temps_cuisson": "Temps de cuisson",
          "difficulte": "Difficulté de la recette",
          "portion": "Nombre de portions"
        }`,
        timestamp: new Date(),
      };

      const recipesResults = [];

      // Traiter chaque élément du tableau scrapedContents
      for (const content of scrapesContent) {
        if (content && content.fullText) {
          const userMessage = {
            id: '2',
            role: 'user',
            content: content.fullText,
            timestamp: new Date(),
          };

          const messages = [systemMessage, assistantMessage, userMessage];
          console.info('Processing content from:', content);

          try {
            // Fetch vers api/chat pour chaque élément
            const res = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId,
                messages,
                model: iaModel,
                modelSource,
              }),
            });

            if (!res.ok) {
              const { error } = await res.json();
              throw new Error(
                error || "Erreur lors de l'analyse par le model."
              );
            }

            const { message } = await res.json();
            let iaContent = (message && message.content) || '';

            console.info('iaContent', iaContent);

            // Supprimer les balises <think>...</think> si présentes
            iaContent = iaContent
              .replace(/<think>[\s\S]*?<\/think>/g, '')
              .trim();

            console.info('iaContent', iaContent);

            const iaContentObj = extractObject(iaContent, outputs);

            console.info('iaContentObj', iaContentObj);

            // Ajouter la source de la recette
            const recipeWithSource = {
              ...iaContentObj,
              source: content.url || 'Source inconnue',
            };

            recipesResults.push(recipeWithSource);
          } catch (err) {
            console.error(`Erreur pour l'URL ${content.url}:`, err);
            // Continuer avec les autres éléments même si un échec
          }
        }
      }

      setRecipes(recipesResults);

      const formattedRecipesResults = recipesResults.map((recipe, idx) => ({
        image:
          slidedResults[idx].pagemap?.cse_image?.[0]?.src ||
          slidedResults[idx].pagemap?.metatags?.[0]?.['og:image'] ||
          slidedResults[idx].pagemap?.cse_thumbnail?.[0]?.src,
        titre: recipe.titre || 'non spécifié',
        description: recipe.description || 'non spécifié',
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : [],
        etapes: Array.isArray(recipe.etapes) ? recipe.etapes : [],
        temps_preparation: recipe.temps_preparation || 'non spécifié',
        temps_cuisson: recipe.temps_cuisson || 'non spécifié',
        difficulte: recipe.difficulte || 'non spécifié',
        portion: recipe.portion || 'non spécifié',
        source: recipe.source || 'non spécifié',
      }));

      console.info('Recettes extraites', formattedRecipesResults);

      setRecipes(formattedRecipesResults);
    } catch (err) {
      console.error('Erreur lors de la recherche web:', err);
      setError(err.message || 'Une erreur est survenue lors de la recherche');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    recipes,
    loading,
    error,
    handleSearch,
  };
};
