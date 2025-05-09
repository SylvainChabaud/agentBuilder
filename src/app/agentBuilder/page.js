'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import useAgentBuilder from './hooks/useAgentBuilder';
import { StyledReactFlow } from './styles';

import { EXPERTISES_LIST, INITIAL_EDGES, INITIAL_NODES } from './constants';
import NodeParameters from './components/nodeParameters';
import { useWorkflow } from './hooks/useWorkflow';
import { ButtonStyled } from './components/styles';
import DisplayResults from './components/displayResults';

import './blink.css';
import WorkflowsList from './components/workflowsList';
import { convertDataToDisplays } from './utils';

const AgentBuilder = () => {
  const router = useRouter();

  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const [expertisesList, setExpertisesList] = useState(EXPERTISES_LIST);
  const [workflowsList, setWorkflowsList] = useState([]);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const onRedirect = ({ path, data = [] }) => {
    console.info('onRedirect', { path, data });

    const visionData = convertDataToDisplays(data);
    console.info('formattedData 22 ', visionData);

    sessionStorage.setItem('RankingVision', JSON.stringify(visionData));
    path && router.push(path);
  };

  const {
    onWorkflowName,
    onSelectWorkflow,
    onEdgeClick,
    onNodeClick,
    onChangeNodeParams,
    onAddNode,
    onConnect,
    nodeName,
    nodeBg,
    nodeApp,
    nodeExpertise,
    nodeMixer,
    nodeFile,
    nodeSheet,
    selectedWorkflowName,
  } = useAgentBuilder({
    setNodes,
    setEdges,
    addEdge,
    setExpertisesList,
    setWorkflowsList,
    setIsWorkflowOpen,
    setIsTerminalOpen,
  });

  const {
    handleRunWorkflow,
    handleRecWorkflow,
    removeWorkflow,
    output,
    isRunning,
  } = useWorkflow({
    nodes,
    edges,
    expertisesList,
    selectedWorkflowName,
    onRedirect,
    setIsWorkflowOpen,
    setIsTerminalOpen,
    setWorkflowsList,
    setNodes,
  });

  console.info('AgentBuilder', {
    output,
    nodes,
    edges,
    workflowsList,
    expertisesList,
  });

  const selectedNodes = nodes.filter((node) => node.selected);
  const selectedEdges = edges.filter((edge) => edge.selected);
  const showNodeParameters =
    selectedNodes.length !== 0 || selectedEdges.length !== 0;

  const downloadOutput = () => {
    const blob = new Blob([JSON.stringify(output, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workflow-output-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <StyledReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeClick={onEdgeClick}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      style={{ background: '#F7F9FB', flex: 1 }}
      minZoom={1}
      maxZoom={4}
      attributionPosition="bottom-right"
      fitViewOptions={{ padding: 1 }}
      fitView
    >
      {/* DISPLAY BUTTONS */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
        }}
      >
        {/* DISPLAY RUN BUTTON */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: '4',
          }}
        >
          <ButtonStyled
            onClick={handleRunWorkflow}
            bgcolor="#5589fe"
            bgcolorhover="#395caa"
            disabled={isRunning}
          >
            {isRunning ? 'Running...' : 'Run Workflow'}
          </ButtonStyled>

          {!isRunning && (
            <ButtonStyled onClick={onAddNode}>Add node</ButtonStyled>
          )}
        </div>

        {/* DISPLAY SAVE BUTTON */}
        {!isRunning && (
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid green',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: '4',
              width: 'fit-content',
              marginTop: '20px',
              backgroundColor: 'azure',
            }}
          >
            <input
              type="text"
              onChange={(event) => onWorkflowName(event.target.value)}
              value={selectedWorkflowName}
              placeholder="Nom du workflow..."
              style={{
                padding: '8px',
                width: 'auto',
                borderRadius: '5px',
                textAlign: 'center',
              }}
            />

            <ButtonStyled
              onClick={handleRecWorkflow}
              bgcolor="#fc7f41"
              bgcolorhover="#b65c2f"
              style={{ left: '10px', top: '10px' }}
            >
              Save workflow
            </ButtonStyled>
          </div>
        )}
      </div>

      {/* DISPLAY WORKFLOWS LIST */}
      {!isRunning && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            position: 'absolute',
            bottom: '20px',
            right: '35%',
            zIndex: 10,
            width: '30%',
            // width: 'auto',

            // maxWidth: '500px',
            // On peut ajuster la hauteur maximale si ouvert, et la réduire si fermé
            maxHeight: '400px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            // On peut animer l'ouverture/fermeture
            transition: 'max-height 0.3s ease, padding 0.3s ease',
            // Si c’est fermé, on retire le padding pour un effet plus compact
            padding: isWorkflowOpen ? '16px' : '4px',
            overflowY: 'auto',
            backgroundColor: 'azure',
          }}
        >
          {/* Bouton pour ouvrir/fermer l'accordéon */}
          <button
            onClick={() => setIsWorkflowOpen(!isWorkflowOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#333',
              cursor: 'pointer',
              fontSize: '1.2rem',
              alignSelf: 'flex-end',
            }}
          >
            Workflows {isWorkflowOpen ? '▼' : '▲'}
          </button>

          {/* Contenu affiché uniquement si "ouvert" */}
          {isWorkflowOpen && (
            <WorkflowsList
              onSelectWorkflow={onSelectWorkflow}
              removeWorkflow={removeWorkflow}
              selectedWorkflowName={selectedWorkflowName}
              workflowsList={workflowsList}
            />
          )}
        </div>
      )}

      {/* DISPLAY TERMINAL */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 10,
          width: '30%',
          // maxWidth: '500px',
          // On peut ajuster la hauteur maximale si ouvert, et la réduire si fermé
          maxHeight: '400px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          // On peut animer l'ouverture/fermeture
          transition: 'max-height 0.3s ease, padding 0.3s ease',
          // Si c’est fermé, on retire le padding pour un effet plus compact
          padding: isTerminalOpen ? '16px' : '4px',
          overflowY: 'auto',
          backgroundColor: 'azure',
        }}
      >
        {/* Bouton pour ouvrir/fermer l'accordéon */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#333',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            Terminal {isTerminalOpen ? '▼' : '▲'}
          </button>

          {!isRunning &&
            output &&
            Array.isArray(output) &&
            output.length > 0 && (
              <button
                onClick={downloadOutput}
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                📥 Télécharger
              </button>
            )}
        </div>

        {isTerminalOpen &&
          (isRunning ? (
            'Le workflow est en cours d’exécution...'
          ) : (
            <DisplayResults data={output} />
          ))}
      </div>

      {/* DISPLAY NODE PARAMETERS */}
      {showNodeParameters && (
        <NodeParameters
          onChangeNodeParams={onChangeNodeParams}
          nodeName={nodeName}
          nodeBg={nodeBg}
          nodeApp={nodeApp}
          nodeExpertise={nodeExpertise}
          nodeMixer={nodeMixer}
          nodeFile={nodeFile}
          nodeSheet={nodeSheet}
          expertisesList={expertisesList}
        />
      )}

      {/* <Background /> */}
      <Controls />
    </StyledReactFlow>
  );
};

export default AgentBuilder;
