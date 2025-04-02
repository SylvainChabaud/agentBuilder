'use client';

import React, { useState } from 'react';
import useMainAgent from './hooks/useMainAgent';
import ObjectiveForm from './components/objectiveForm';
import AgentExecutionViewer from './components/agentExecutionViewer';
import ObjectiveContextUploader from './components/objectiveContextUploader';
import FinalOutputViewer from './components/finalOutputViewer';
import ValidationFeedback from './components/validationFeedback';

const MainAgentInterface = () => {
  const [objective, setObjective] = useState('');
  const [contextFiles, setContextFiles] = useState([]);
  const { runOrchestration, isRunning, logs, output, memory, validation } =
    useMainAgent();

  const handleLaunch = () => {
    console.info('handleLaunch', { objective, contextFiles });
    runOrchestration({ objective, contextFiles });
  };

  console.info('MainAgentInterface', {
    isRunning,
    output,
    memory,
    logs,
    validation,
  });

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
