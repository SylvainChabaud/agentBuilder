'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  //   const model = 'deepseek/deepseek-r1:free';
  //   const model = 'deepseek/deepseek-chat:free';
  //   const model = 'qwen/qwen-2.5-coder-32b-instruct:free';

  //   const model = 'mistralai/mistral-7b-instruct:free';
  //   const model = 'deepseek/deepseek-r1-distill-llama-70b:free';
  const model = 'nvidia/llama-3.1-nemotron-70b-instruct:free';

  //   const model = 'sophosympatheia/rogue-rose-103b-v0.2:free';
  //   const model = 'qwen/qwen-2-7b-instruct:free';

  const max_tokens = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/openRouter', {
      method: 'POST',
      body: JSON.stringify({ prompt, model, max_tokens }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || 'Aucune réponse.');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Pose une question..."
        />
        <button type="submit">Envoyer</button>
      </form>
      <p>Réponse : {response}</p>
    </div>
  );
}
