'use client';

import React, { useState } from 'react';
import useTickets from './useTickets';

export default function JiraTickets() {
  const [boardId, setBoardId] = useState('');
  const [sprintId, setSprintId] = useState('');

  const { tickets, isLoading, error, fetchTickets } = useTickets();

  console.info('JiraTickets', tickets);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lance la requête
    fetchTickets(boardId, sprintId);
  };

  return (
    <div
      style={{
        margin: '20px',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <h2>Récupérer les tickets JIRA</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <div>
          <label htmlFor="boardId">Board ID&nbsp;</label>
          <input
            id="boardId"
            type="text"
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            placeholder="Ex: 123"
          />
        </div>
        <div>
          <label htmlFor="sprintId">Sprint ID&nbsp;</label>
          <input
            id="sprintId"
            type="text"
            value={sprintId}
            onChange={(e) => setSprintId(e.target.value)}
            placeholder="Ex: 456"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Chargement...' : 'Récupérer'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red', marginTop: '8px' }}>Erreur : {error}</p>
      )}

      {/* Affichage des tickets */}
      <div style={{ marginTop: '16px' }}>
        {tickets.length > 0 ? (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.key}>
                <strong>{ticket.key}</strong> - {ticket.summary} | Statut:{' '}
                {ticket.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun ticket à afficher.</p>
        )}
      </div>
    </div>
  );
}
