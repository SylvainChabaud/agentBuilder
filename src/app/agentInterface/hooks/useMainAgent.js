// hooks/useMainAgent.js
import { useSession } from 'next-auth/react';
import { useState } from 'react';

/**
 * Hook principal pour orchestrer un objectif utilisateur via le mainAgent.
 */
const useMainAgent = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [output, setOutput] = useState(null);
  const [memory, setMemory] = useState(null);
  const [validation, setValidation] = useState(null);

  // TODO
  // const userId = '6ec9d968-10ef-48be-b136-28dbe422fbda';

  const { data: session } = useSession();
  const userId = session?.user?.id;

  /**
   * Lancement complet d’un cycle d’orchestration
   * @param {Object} params
   * @param {string} params.objective - Objectif utilisateur en langage naturel
   * @param {File[]} params.contextFiles - Fichiers contextuels optionnels
   */
  const runOrchestration = async ({ objective, contextFiles = [] }) => {
    setIsRunning(true);
    setLogs([]);
    setOutput(null);
    setValidation(null);
    setMemory(null);

    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('objective', objective);
      contextFiles.forEach((file) => {
        formData.append('files', file); // Champ multiple côté back
      });

      for (let [key, value] of formData.entries()) {
        console.log('FormData:', key, value);
      }

      const res = await fetch('/api/mainAgent/run', {
        method: 'POST',
        body: formData,
      });

      // console.info('res', res);

      const data = await res.json();

      console.info('res', data);

      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      // const data = {};

      console.info('data 123', data);
      setLogs(data.logs);
      setOutput(data.output);
      setMemory(data.memory);
      setValidation(data.validation);
    } catch (err) {
      console.error('Erreur mainAgent:', err);
      setLogs((prev) => [...prev, { type: 'error', message: err.message }]);
      return { error: err.message };
    } finally {
      setIsRunning(false);
    }
  };

  return {
    runOrchestration,
    isRunning,
    logs,
    output,
    memory,
    validation,
  };
};

export default useMainAgent;
