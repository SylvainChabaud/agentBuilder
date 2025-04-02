// src/
// - components/
//   - iaAgent/
//     - MainAgentInterface.js          // Composant principal de l’interface utilisateur avec l’IA
//     - ObjectiveForm.js               // Formulaire de soumission d’un objectif utilisateur
//     - ObjectiveContextUploader.js    // Pour ajouter des fichiers / contraintes au contexte
//     - AgentExecutionViewer.js        // Affichage du déroulement de l’exécution (étapes, logs, agents actifs)
//     - FinalOutputViewer.js           // Affiche le livrable final généré
//     - AgentStatusBadge.js            // Badge pour afficher le statut d’un agent (idle, running, done, error)
//     - MemoryTimeline.js              // Affiche les versions successives de la mémoire (v1, v2…)
//     - ValidationFeedback.js          // Affiche le résultat du goalValidatorAgent

// // hooks/
// - useMainAgent.js                     // Hook pour lancer et suivre un cycle d’orchestration IA

// // types/
// - types.js                            // Définition JSDoc des structures : Objective, Task, Agent, Memory...

// // styles/
// - iaAgent.module.css                  // Styles dédiés au composant d’interface IA

// ---

// Composant React de base : MainAgentInterface.js
import React, { useState } from 'react';
import ObjectiveForm from './ObjectiveForm';
import ObjectiveContextUploader from './ObjectiveContextUploader';
import AgentExecutionViewer from './AgentExecutionViewer';
import FinalOutputViewer from './FinalOutputViewer';
import ValidationFeedback from './ValidationFeedback';
import useMainAgent from '@/hooks/useMainAgent';

const MainAgentInterface = () => {
  const [objective, setObjective] = useState('');
  const [contextFiles, setContextFiles] = useState([]);
  const {
    runOrchestration,
    isRunning,
    logs,
    output,
    memory,
    validation
  } = useMainAgent();

  const handleLaunch = () => {
    runOrchestration({ objective, contextFiles });
  };

  return (
    <div className="ia-agent-container">
      <h2>🧠 Chef de projet IA</h2>

      <ObjectiveForm
        value={objective}
        onChange={setObjective}
        onSubmit={handleLaunch}
        disabled={isRunning}
      />

      <ObjectiveContextUploader
        contextFiles={contextFiles}
        setContextFiles={setContextFiles}
      />

      {isRunning && <AgentExecutionViewer logs={logs} memory={memory} />}

      {output && <FinalOutputViewer output={output} />}

      {validation && <ValidationFeedback validation={validation} />}
    </div>
  );
};

export default MainAgentInterface;
