'use client';

import { useState, useCallback } from 'react';
import { handleFetchJiraTickets } from 'lib/services/jira/fetchTickets';
import { handleJiraLoginClient } from '../oAuth/handleJiraLoginClient';

/**
 * Hook permettant de gérer la récupération et l'affichage des tickets JIRA
 */
export default function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Lance l'appel API pour récupérer les tickets d'un board/sprint
   * @param {string} boardId
   * @param {string} sprintId
   */
  const fetchTickets = useCallback(async (boardId, sprintId) => {
    try {
      setIsLoading(true);
      setError('');

      console.info('fetchTickets', { boardId, sprintId });

      // Assure-toi qu'on a bien un accessToken JIRA
      // handleJiraLoginClient renvoie l'accessToken si déjà dispo,
      // ou déclenche la redirection OAuth sinon.
      const accessToken = await handleJiraLoginClient('/jira/tickets');
      if (!accessToken) {
        // La redirection OAuth va se faire, la suite s'arrête ici
        return;
      }

      console.info('fetchTickets accessToken', accessToken);

      // Appel à la fonction qui fetch les tickets côté client
      const data = await handleFetchJiraTickets(accessToken, boardId, sprintId);
      // data contiendra la liste des issues, ex: { issues: [...] }

      console.info('fetchTickets data', data);

      // Suppose qu'on renvoie un champ "issues" dans l'API, à ajuster selon ton format.
      setTickets(data.issues || []);
    } catch (err) {
      console.error('Erreur fetchTickets:', err);
      setError(err.message || 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tickets,
    isLoading,
    error,
    fetchTickets,
  };
}
