// types/types.js

/** @typedef {Object} Objective
 * @property {string} id - Identifiant unique de l’objectif
 * @property {string} text - Objectif exprimé en langage naturel
 * @property {Array<{ name: string, path: string }>} [files] - Fichiers de contexte liés à l’objectif
 */

/** @typedef {Object} Task
 * @property {string} id - Identifiant unique de la tâche
 * @property {string} title - Intitulé de la tâche
 * @property {string} description - Détail fonctionnel de la tâche
 * @property {string[]} [dependencies] - Liste des ID de tâches dépendantes
 */

/** @typedef {Object} Agent
 * @property {string} id - Identifiant unique de l’agent
 * @property {string} role - Rôle ou spécialité (ex: "juriste", "data analyst")
 * @property {string[]} tools - Outils accessibles par l’agent
 */

/** @typedef {Object} ChallengePlan
 * @property {Array<{ stepId: string, taskId: string, agentId: string }>} steps - Étapes ordonnées
 */

/** @typedef {Object} AgentMemory
 * @property {Object} byTask - Détail des résultats par tâche
 * @property {Object} byAgent - Détail des contributions par agent
 */

/** @typedef {Object} Memory
 * @property {number} version - Version actuelle de la mémoire
 * @property {AgentMemory} content - Détail des mémoires croisées
 */

/** @typedef {Object} ValidationResult
 * @property {boolean} success - L’objectif a-t-il été atteint ?
 * @property {string} [feedback] - Remarques, suggestions, corrections
 */

/** @typedef {Object} WorkflowState
 * @property {string} workflowId
 * @property {"initialized"|"running"|"completed"|"needs_review"} status
 * @property {Objective} objective
 * @property {Task[]} [tasks]
 * @property {Agent[]} [agents]
 * @property {ChallengePlan} [plan]
 * @property {Memory} memory
 * @property {Array<Object>} logs
 * @property {any} [output]
 * @property {ValidationResult} [validation]
 */
