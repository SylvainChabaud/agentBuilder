import { useCallback, useEffect, useRef, useState } from 'react';
import {
  INITIAL_COLOR,
  INITIAL_EDGES_POSITION,
  INITIAL_NODE,
  INITIAL_NODE_POSITION,
  INITIAL_NODES,
  NODE_PARAMS,
  NODE_POSITION_OFFSET,
} from '../constants';
import { getExpertises } from 'lib/expertiseManager/getExpertises';
import { getWorkflows } from 'lib/workflowManager/getWorkflows';
import NodeLabel from './nodeLabel';

const useAgentBuilder = ({
  setNodes,
  setEdges,
  addEdge,
  setExpertisesList,
  setWorkflowsList,
  setIsWorkflowOpen,
  setIsTerminalOpen,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeName, setNodeName] = useState('');
  const [nodeBg, setNodeBg] = useState('');
  const [nodeApp, setNodeApp] = useState('');
  const [nodeExpertise, setNodeExpertise] = useState('');
  const [nodeFile, setNodeFile] = useState({});
  const [nodeSheet, setNodeSheet] = useState([]);
  const [selectedWorkflowName, setSelectedWorkflowName] = useState('');

  const lastSelectionRef = useRef(null);

  console.info('useAgentBuilder');

  useEffect(() => {
    console.info('useAgentBuilder useEffect');

    const fetchExpertises = async () => {
      const expertises = (await getExpertises()) || [];
      console.info('fetchExpertise', expertises);

      setExpertisesList((prev) => [...prev, ...expertises]);
    };

    const fetchWorkflows = async () => {
      const workflows = await getWorkflows();
      console.info('getWorkflows', workflows);

      setWorkflowsList((prev) => (prev.length === 0 ? [...workflows] : prev)); // ✅ Évite la boucle infinie
    };

    fetchExpertises();
    fetchWorkflows();
  }, []);

  const onAddNode = () => {
    console.info('onAddNode 1');
    setNodes((prevNodes) => {
      const hasNoLastNode = !prevNodes || prevNodes.length === 0;

      const lastNode = hasNoLastNode
        ? INITIAL_NODE
        : prevNodes[prevNodes.length - 1];

      const newNodeId = hasNoLastNode
        ? '1'
        : (parseInt(lastNode.id, 10) + 1).toString();

      const newLabel = `Node ${newNodeId}`;

      const newPosition = hasNoLastNode
        ? INITIAL_NODE_POSITION
        : {
            x: lastNode.position.x + NODE_POSITION_OFFSET,
            y: lastNode.position.y + NODE_POSITION_OFFSET,
          };

      console.info('onAddNode 2', { newNodeId });

      const newNode = {
        ...lastNode,
        id: newNodeId,
        data: { label: newLabel },
        position: newPosition,
        style: { backgroundColor: INITIAL_COLOR },
        ...INITIAL_EDGES_POSITION,
      };

      console.info('onAddNode 3', newNode);

      return [...prevNodes, newNode];
    });
  };

  const onSelectionChange = ({ nodes, edges }) => {
    const [node] = nodes;

    console.info('onSelectionChange test', node);

    if (!node) {
      // setSelectedNodeId('');
      // setIsWorkflowOpen(false);
      // setIsTerminalOpen(false);
      // return;
    } // ✅ Évite de mettre à jour un état null

    const newSelection = {
      id: node?.id || '',
      name: node?.data?.name || '',
      app: node?.data?.app || '',
      expertise: node?.data?.expertise || '',
      fileId: node?.data?.fileId || '',
      fileName: node?.data?.fileName || '',
      sheet: node?.data?.sheet || '',
      backgroundColor: node?.style?.backgroundColor || '',
    };

    // Vérifier si la nouvelle sélection est identique à la précédente
    if (
      JSON.stringify(newSelection) === JSON.stringify(lastSelectionRef.current)
    ) {
      console.info(
        "⏭️ Aucun changement dans la sélection, on ignore l'update."
      );
      return; // Sortir de la fonction si les données sont les mêmes
    }

    // Mise à jour des valeurs
    lastSelectionRef.current = newSelection; // Stocker la nouvelle sélection pour le prochain rendu
    setSelectedNodeId(newSelection.id);
    setNodeName(newSelection.name);
    setNodeBg(newSelection.backgroundColor);
    setNodeApp(newSelection.app);
    setNodeExpertise(newSelection.expertise);
    setNodeSheet(newSelection.sheet);
    setNodeFile({
      id: newSelection.fileId,
      name: newSelection.fileName,
      sheetNames: [newSelection.sheet],
    });

    // setSelectedNodeId((prev) => (prev !== node.id ? node.id : prev));
    // setNodeName((prev) => (prev !== node.data.name ? node.data.name : prev));
    // setNodeBg((prev) =>
    //   prev !== node.style.backgroundColor ? node.style.backgroundColor : prev
    // );
    // setNodeApp((prev) => (prev !== node.data.app ? node.data.app : prev));
    // setNodeExpertise((prev) =>
    //   prev !== node.data.expertise ? node.data.expertise : prev
    // );
    // setNodeSheet((prev) => (prev !== node.data.sheet ? node.data.sheet : prev));
    // setNodeFile((prev) =>
    //   prev.id !== node.data.fileId
    //     ? {
    //         id: node.data.fileId,
    //         name: node.data.fileName,
    //         sheetNames: [node.data.sheet],
    //       }
    //     : prev
    // );

    // const {
    //   id,
    //   data: {
    //     name = '',
    //     app = '',
    //     expertise = '',
    //     fileId = '',
    //     fileName = '',
    //     sheet,
    //     label = '',
    //   },
    //   style: { backgroundColor },
    // } = node || INITIAL_NODE;

    // setSelectedNodeId(id);
    // setNodeName(name);
    // setNodeBg(backgroundColor);
    // setNodeApp(app);
    // setNodeExpertise(expertise);
    // setNodeSheet(sheet);
    // setNodeFile({
    //   id: fileId,
    //   name: fileName,
    //   sheetNames: [sheet],
    // });
  };

  const onChangeNodeParams = ({ type, value, file }) => {
    console.info('onChangeNodeParams', { type, value, file });
    switch (type) {
      case NODE_PARAMS.BG_COLOR:
        setNodeBg(value);
        setNodes((nodes) =>
          nodes.map((node) => {
            const { id } = node;
            const shouldChange = id === selectedNodeId;
            return {
              ...node,
              ...(shouldChange ? { style: { backgroundColor: value } } : {}),
            };
          })
        );
        break;

      case NODE_PARAMS.NAME:
        setNodeName(value);
        setNodes((nodes) =>
          nodes.map((node) => {
            const {
              id,
              data: {
                app = '',
                expertise = '',
                fileName = '',
                fileId = '',
                sheet = '',
              },
            } = node;

            const shouldChange = id === selectedNodeId;

            return {
              ...node,
              ...(shouldChange
                ? {
                    data: {
                      name: value,
                      app,
                      expertise,
                      fileId,
                      fileName,
                      sheet,
                      label: (
                        <NodeLabel
                          app={app}
                          name={value}
                          expertise={expertise}
                          fileName={fileName || ''}
                        />
                      ),
                    },
                  }
                : {}),
            };
          })
        );
        break;

      case NODE_PARAMS.SELECT_APP:
        console.info('SELECT_APP', value);
        setNodeExpertise('');
        setNodeSheet([]);
        setNodeFile({});

        setNodeApp(value);
        setNodes((nodes) =>
          nodes.map((node) => {
            const {
              id,
              data: { name = '' },
            } = node;

            const shouldChange = id === selectedNodeId;

            return {
              ...node,
              ...(shouldChange
                ? {
                    data: {
                      name,
                      app: value,
                      expertise: '',
                      fileName: '',
                      fileId: '',
                      sheet: '',
                      label: <NodeLabel app={value} name={name} />,
                    },
                  }
                : {}),
            };
          })
        );
        break;

      case NODE_PARAMS.EXPERTISE:
        console.info('EXPERTISE', value);
        setNodeSheet([]);
        setNodeFile({});

        setNodeExpertise(value);
        setNodes((nodes) =>
          nodes.map((node) => {
            const {
              id,
              data: { app = '', name = '' },
            } = node;

            const shouldChange = id === selectedNodeId;

            return {
              ...node,
              ...(shouldChange
                ? {
                    data: {
                      expertise: value,
                      name,
                      app,
                      fileName: '',
                      fileId: '',
                      sheet: '',
                      label: (
                        <NodeLabel app={app} name={name} expertise={value} />
                      ),
                    },
                  }
                : {}),
            };
          })
        );
        break;

      case NODE_PARAMS.FILE:
        console.info('FILE', { file, value });
        setNodeSheet([]);

        // setNodeSheet(file.sheetNames[0]);
        setNodeFile(file);
        setNodes((nodes) =>
          nodes.map((node) => {
            const {
              id,
              data: { app = '', name = '', expertise = '' },
            } = node;

            const shouldChange = id === selectedNodeId;

            return {
              ...node,
              ...(shouldChange
                ? {
                    data: {
                      expertise,
                      name,
                      app,
                      fileName: file.name,
                      fileId: file.id,
                      sheet: file.sheetNames[0],
                      label: (
                        <NodeLabel
                          app={app}
                          name={name}
                          expertise={expertise}
                          fileName={file.name}
                        />
                      ),
                    },
                  }
                : {}),
            };
          })
        );
        break;

      case NODE_PARAMS.SHEET:
        console.info('SHEET', { file, value });

        setNodeSheet(value);
        setNodes((nodes) =>
          nodes.map((node) => {
            const {
              id,
              data: {
                app = '',
                name = '',
                expertise = '',
                fileId = '',
                fileName = '',
              },
            } = node;

            const shouldChange = id === selectedNodeId;

            return {
              ...node,
              ...(shouldChange
                ? {
                    data: {
                      expertise,
                      name,
                      app,
                      fileName,
                      fileId,
                      sheet: value,
                      label: (
                        <NodeLabel
                          app={app}
                          name={name}
                          expertise={expertise}
                          fileName={fileName}
                        />
                      ),
                    },
                  }
                : {}),
            };
          })
        );
        break;

      case NODE_PARAMS.DELETE:
        setNodes((prevNodes) =>
          prevNodes.filter(({ id }) => id !== selectedNodeId)
        );
        setEdges((prevEdges) =>
          prevEdges.filter(({ source, target }) => {
            const isFind =
              source === selectedNodeId || target === selectedNodeId;
            return !isFind;
          })
        );
        setSelectedNodeId(null);
        break;

      default:
        break;
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onSelectWorkflow = (workflow) => {
    console.info('onSelectWorkflow', workflow);

    // setWorkflowId(workflow.id);
    onWorkflowName(workflow.name);

    const selectedNodes = workflow.data?.nodes;
    const selectedEdges = workflow.data?.edges;

    setNodes(() => {
      return selectedNodes.map((node) => {
        const {
          data: { app, expertise, name, fileName, fileId, sheet },
        } = node;

        console.info('onSelectWorkflow', node);

        return {
          ...node,
          data: {
            label: (
              <NodeLabel
                name={name}
                app={app}
                expertise={expertise}
                fileName={fileName}
              />
            ),
            app,
            expertise,
            name,
            fileName,
            fileId,
            sheet,
          },
        };
      });
    });

    // onSelectionChange({ nodes });

    // setNodes(INITIAL_NODES);
    setEdges(selectedEdges);

    // const selectedNodes = workflow.data?.nodes;
    // const selectedEdges = workflow.data?.edges;

    // setNodes((prevNodes) =>
    //   JSON.stringify(prevNodes) !== JSON.stringify(selectedNodes)
    //     ? selectedNodes
    //     : prevNodes
    // );
    // setEdges((prevEdges) =>
    //   JSON.stringify(prevEdges) !== JSON.stringify(selectedEdges)
    //     ? selectedEdges
    //     : prevEdges
    // );
  };

  const onWorkflowName = (value) => {
    console.info('value', value);
    setSelectedWorkflowName(value);
  };

  console.info('selectedNodeId', selectedNodeId);

  return {
    onWorkflowName,
    onSelectWorkflow,
    onSelectionChange,
    onChangeNodeParams,
    onAddNode,
    onConnect,
    selectedWorkflowName,
    showNodeParameters: selectedNodeId !== '',
    nodeName,
    nodeBg,
    nodeApp,
    nodeExpertise,
    nodeFile,
    nodeSheet,
  };
};

export default useAgentBuilder;
