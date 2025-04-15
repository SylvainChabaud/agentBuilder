/**
 * Calcule un plan d'exécution à partir des nodes et edges d'un React Flow.
 *
 * Chaque nœud doit avoir au minimum la structure suivante :
 * {
 *   id: string,
 *   data: { app?: string, label?: any }
 * }
 *
 * Les edges doivent être un tableau d'objets avec { id, source, target }.
 *
 * La fonction effectue un tri topologique en calculant le niveau de chaque nœud.
 * Les nœuds sans dépendances sont de niveau 1, et un nœud a pour niveau le maximum des niveaux de ses prédécesseurs plus 1.
 * Les nœuds ayant le même niveau sont regroupés ensemble (exécutés en parallèle).
 *
 * En sortie, la fonction renvoie un tableau d'événements trié par ordre croissant de niveau,
 * où chaque événement est un objet de la forme :
 * {
 *   step: <number>,       // numéro de l'étape (niveau)
 *   nodes: [ { id, app } ] // tous les nœuds de ce niveau
 * }
 *
 * Si les données ne sont pas correctement structurées, la fonction renvoie un tableau vide.
 *
 * @param {Object} params
 * @param {Array} params.nodes - Le tableau de nodes du React Flow.
 * @param {Array} params.edges - Le tableau d'arêtes du React Flow.
 * @returns {Array} Le plan d'exécution.
 */
export function getExecutionPlan({ nodes, edges }) {
  console.info('getExecutionPlan 1', { nodes, edges });
  // Vérifier que nodes et edges sont des tableaux
  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    console.error(
      'Les données en entrée doivent être des tableaux : nodes et edges.'
    );
    return [];
  }

  // Filtrer les nodes valides et construire un mapping id -> node
  const nodeMap = {};
  const inDegree = {};
  nodes.forEach((node) => {
    if (!node || typeof node.id !== 'string') {
      console.warn('Node invalide (id manquant ou non string):', node);
      return;
    }
    if (!node.data || typeof node.data !== 'object') {
      console.warn('Node invalide (data manquant ou non objet):', node);
      return;
    }
    nodeMap[node.id] = node;
    inDegree[node.id] = 0;
  });

  // console.info('getExecutionPlan 2', { nodeMap, inDegree });

  // Vérifier et filtrer les edges
  const validEdges = edges.filter((edge) => {
    if (
      !edge ||
      typeof edge.source !== 'string' ||
      typeof edge.target !== 'string'
    ) {
      console.warn('Edge invalide (source ou target manquant):', edge);
      return false;
    }
    return true;
  });

  // console.info('getExecutionPlan 3', { validEdges });

  // Calculer le degré entrant pour chaque node
  validEdges.forEach((edge) => {
    if (inDegree.hasOwnProperty(edge.target)) {
      inDegree[edge.target]++;
    }
  });

  console.info('getExecutionPlan 4', { validEdges, inDegree });

  // Initialiser une map pour stocker le niveau (level) de chaque node et une queue pour le tri topologique
  const levelMap = {};
  const queue = [];

  // Les nœuds sans dépendances ont le niveau 1
  Object.keys(inDegree).forEach((id) => {
    if (inDegree[id] === 0) {
      levelMap[id] = 1;
      queue.push(id);
    }
  });

  // console.info('getExecutionPlan 5', { levelMap, queue });

  // Exécuter le tri topologique et calculer les niveaux
  while (queue.length > 0) {
    const currentId = queue.shift();
    const currentLevel = levelMap[currentId] || 1;
    validEdges.forEach((edge) => {
      if (edge.source === currentId) {
        const targetId = edge.target;
        const newLevel = currentLevel + 1;
        if (!levelMap[targetId] || newLevel > levelMap[targetId]) {
          levelMap[targetId] = newLevel;
        }
        inDegree[targetId]--;
        if (inDegree[targetId] === 0) {
          queue.push(targetId);
        }
      }
    });
  }

  // console.info('getExecutionPlan 6', { levelMap, queue, inDegree });

  // Regrouper les nodes par niveau dans eventsMap
  const eventsMap = {};
  Object.keys(levelMap).forEach((nodeId) => {
    const node = nodeMap[nodeId];
    if (!node) return;
    const lvl = levelMap[nodeId];
    if (!eventsMap[lvl]) {
      eventsMap[lvl] = [];
    }
    // Utiliser une valeur par défaut pour app si non défini
    const sheet = node.data.sheet ? node.data.sheet.toString() : '';
    const fileId = node.data.fileId ? node.data.fileId.toString() : '';
    const fileName = node.data.fileName ? node.data.fileName.toString() : '';
    const appValue = node.data.app ? node.data.app.toString() : '';
    const mixerValue = node.data.isMixerEnabled ?? false;

    console.info('ooooo', { data: node.data, mixerValue });

    const expertiseValue = node.data.expertise
      ? node.data.expertise.toString()
      : '';
    eventsMap[lvl].push({
      id: node.id,
      app: appValue,
      expertise: expertiseValue,
      isMixerEnabled: mixerValue,
      fileName: fileName,
      fileId: fileId,
      sheet: sheet,
    });
  });

  // console.info('getExecutionPlan 7', { eventsMap });

  // Construire le tableau d'événements trié par niveau croissant
  const steps = Object.keys(eventsMap)
    .map(Number)
    .sort((a, b) => a - b)
    .map((step) => {
      const nodesWithInputs = eventsMap[step].map((node) => {
        // Initialiser le tableau des inputs pour chaque nœud
        const nodeWithInputs = { ...node, inputs: [] };

        // Parcourir les arêtes pour déterminer les nœuds sources (dépendances)
        validEdges.forEach((edge) => {
          if (edge.target === node.id) {
            // Si le nœud courant est la cible, ajoute le source comme input
            nodeWithInputs.inputs.push(edge.source);
          }
        });

        return nodeWithInputs;
      });

      return {
        step,
        nodes: nodesWithInputs,
      };
    });

  console.info('getExecutionPlan 8', { steps });

  return steps;
}
