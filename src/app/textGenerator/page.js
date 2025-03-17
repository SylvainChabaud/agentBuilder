'use client';

import { fetchFromHuggingFace } from 'lib/services/huggingFace/fetchFromHuggingFace';
import React, { useState } from 'react';

const MOCK_TEXT = `Artificial Intelligence (AI) is transforming the world by enabling machines to perform tasks that typically require human intelligence. These tasks include recognizing speech, making decisions, and understanding natural language. AI is used in various fields, such as healthcare, education, and transportation, to improve efficiency and solve complex problems.`;

const SentimentAnalyzer = () => {
  const [text, setText] = useState(MOCK_TEXT);
  const [sentiment, setSentiment] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeSentiment = async () => {
    setLoading(true);
    setError(null);

    try {
      const [res] = await fetchFromHuggingFace(
        'distilbert-base-uncased-finetuned-sst-2-english',
        text
      );

      console.info('Sentiment analysé :', res);

      const positiveScore = res.find(({ label }) => label === 'POSITIVE').score;
      const negativeScore = res.find(({ label }) => label === 'NEGATIVE').score;

      console.info('Sentiment analysé :', { positiveScore, negativeScore });
      setSentiment({ positiveScore, negativeScore });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Analyseur de sentiment</h1>

      <textarea
        placeholder="Entrez un texte pour analyser le sentiment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button onClick={handleAnalyzeSentiment} disabled={loading}>
        {loading ? 'Analyse en cours...' : 'Analyser le sentiment'}
      </button>

      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

      {sentiment.positiveScore && sentiment.negativeScore && (
        <div>
          <h2>Résultat de l'analyse :</h2>
          <p>POSITIVE: {sentiment.positiveScore}</p>
          <p>NEGATIVE: {sentiment.negativeScore}</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;
