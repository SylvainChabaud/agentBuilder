import { useState } from 'react';
import { getExecutionPlan } from './utils';
import { runWorkflow } from '../components/run/runWorkflow';
import { setWorkflow } from '../../../../lib/workflowManager/setWorkflow';
import { deleteWorkflow } from '../../../../lib/workflowManager/removeWorkflow';
import { NODE_STATUS } from '../constants';
import { useSession } from 'next-auth/react';

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
  // TODO
  // const userId = '6ec9d968-10ef-48be-b136-28dbe422fbda';

  const { data: session } = useSession();
  const userId = session?.user?.id;

  console.log('useWorkflow', { nodes, edges });

  const onExcecutedNode = ({ nodeId, status, result }) => {
    console.info('onExcecutedNode', { nodeId, status, result });

    let className = '';

    // Utilisation du switch pour gérer les différents statuts
    switch (status) {
      case NODE_STATUS.RUN:
        // Si le nœud est en cours d'exécution, appliquer une bordure clignotante
        className = 'blinking-border';
        break;

      case NODE_STATUS.ERROR:
        // Si le nœud rencontre une erreur, appliquer une bordure rouge (erreur)
        className = 'error-border';
        break;

      case NODE_STATUS.FINISH:
        // Si le nœud a terminé, tu peux aussi ajouter une bordure ou une autre action
        className = 'finished-border'; // Exemple : bordure pour un nœud terminé
        break;

      case NODE_STATUS.WAIT:
        // Si le nœud a terminé, tu peux aussi ajouter une bordure ou une autre action
        className = ''; // Exemple : bordure pour un nœud terminé
        break;

      default:
        // Autres statuts, ajouter une classe par défaut ou gérer d'autres comportements
        className = '';
        break;
    }

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
        userId,
        plan,
        initialInput,
        expertisesList,
        onExcecutedNode,
        onRedirect
      );

      // Vérifier si le résultat contient une erreur (par exemple, venant de `runWorkflow`)
      if (finalOutput.error) {
        setOutput(`Erreur : ${finalOutput.error}`); // Afficher l'erreur reçue de runWorkflow
        console.error(
          "Erreur lors de l'exécution du workflow:",
          finalOutput.error
        );
      } else {
        setOutput(finalOutput); // Stocker le résultat si tout est OK
        console.log('Workflow terminé. Output final:', finalOutput);
      }
    } catch (err) {
      // Gestion des erreurs générales qui surviennent lors de l'appel de runWorkflow
      setOutput(`Erreur : ${err.message}`); // Afficher l'erreur générale
      console.error("Erreur lors de l'exécution du workflow:", err);
    } finally {
      setIsRunning(false); // Toujours réinitialiser l'état de running à false
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

      const { app = '', expertise = '', name = '' } = props || {};

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
