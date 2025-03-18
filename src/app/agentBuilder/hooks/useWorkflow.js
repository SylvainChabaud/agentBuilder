import { useState } from 'react';
import { getExecutionPlan } from './utils';
import { runWorkflow } from '../components/run/runWorkflow';
import { setWorkflow } from 'lib/workflowManager/setWorkflow';
import { deleteWorkflow } from 'lib/workflowManager/removeWorkflow';
import { NODE_STATUS } from '../constants';

export const useWorkflow = ({
  nodes,
  edges,
  expertisesList,
  onRedirect,
  selectedWorkflowName,
  setIsTerminalOpen,
  setIsWorkflowOpen,
  setWorkflowsList,
  setNodes,
}) => {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  console.log('Events to execute 1:', { nodes, edges });

  const onExcecutedNode = ({ nodeId, status, result }) => {
    console.info('onExcecutedNode', { nodeId, status, result });

    const className = status === NODE_STATUS.RUN ? 'blinking-border' : '';

    // setOutput([result]);

    setNodes((nodes) => {
      const formattedNodes = nodes.map((currentNode) => {
        if (currentNode.id === nodeId) {
          console.info('currentNode', currentNode);
          return {
            ...currentNode,
            className,
          };
        }

        return currentNode;
      });

      return formattedNodes;
    });
  };

  // Fonction qui déclenche l'exécution du workflow
  const handleRunWorkflow = async () => {
    const initialInput = 'recette de samosa originale';

    console.log('initialInput', initialInput);

    // Générer le plan d'exécution basé sur nodes et edges
    const plan = getExecutionPlan({ nodes, edges });
    console.log('Events to execute 2:', plan);

    try {
      setIsRunning(true);
      setIsTerminalOpen(true);
      setIsWorkflowOpen(false);

      const finalOutput = await runWorkflow(
        plan,
        initialInput,
        expertisesList,
        onExcecutedNode,
        onRedirect
      );
      // const formattedOutput = JSON.stringify(finalOutput);

      setOutput(finalOutput); // Stocker le résultat
      console.log('Workflow terminé. Output final:', finalOutput);
      // Vous pouvez par la suite stocker ce résultat dans un state pour l'afficher dans le front.
    } catch (err) {
      setOutput(`Erreur : ${err.message}`); // Afficher l'erreur
      console.error("Erreur lors de l'exécution du workflow:", err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRecWorkflow = () => {
    console.info('handleRecWorkflow', nodes);

    const formattedNodes = nodes.map((node) => {
      const {
        data: {
          label: { props },
        },
      } = node;

      const { app, expertise, name } = props;

      console.info('handleRecWorkflow 1', {
        props,
        node,
        app,
        expertise,
        name,
      });

      // { id: '', name: '', data: { nodes: [{}], edges: [{}] } },

      return {
        ...node,
        data: {
          ...node.data,
          label: name,
        },
      };
    });

    console.info('handleRecWorkflow', formattedNodes);

    // setWorkflowId(workflowsList[workflowsList.length - 1].id + 1);
    setWorkflowsList((workflows) => [
      ...workflows,
      {
        id: workflows[workflows.length - 1]?.id + 1,
        name: selectedWorkflowName,
        data: { nodes: formattedNodes, edges },
      },
    ]);

    setWorkflow({
      name: selectedWorkflowName,
      data: { nodes: formattedNodes, edges },
    });

    setIsWorkflowOpen(true);
  };

  // ✅ Fonction pour supprimer un workflow
  const removeWorkflow = (workflowId) => {
    console.info('removeWorkflow', workflowId);

    const isConfirmed = confirm(
      'êtes-vous sûr de vouloir suppprimer ce workflow ?'
    );

    if (isConfirmed) {
      deleteWorkflow(workflowId);

      setWorkflowsList((prev) =>
        prev.filter((workflow) => workflow.id !== workflowId)
      );
    }
  };

  return {
    handleRunWorkflow,
    handleRecWorkflow,
    removeWorkflow,
    output,
    isRunning,
  };
};
