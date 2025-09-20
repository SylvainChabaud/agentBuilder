import { handleGmailLoginClient } from '../../../../../src/app/components/gmail/oAuth/handleGmailLoginClient';
import { handleFetchEmails } from '../../../../../lib/services/gmail/fetchEmails';
import { handleSendEmail } from '../../../../../lib/services/gmail/sendEmail';
import { handleWebSearch } from '../../../../../lib/services/gmail/webSearch';
import { NODE_STATUS } from '../../constants';
import { APPS_LABELS } from '../../../../../lib/constants';
import { handleFetchSheetContent } from '../../../../../lib/services/sheets/getFileContent';
import { convertRowsToObjects, mixData, resetNodeStatuses } from './utils';
import { sendModelMessage } from './sendModelMessage';

/**
 * Exécute un nœud en fonction de sa propriété "app".
 *
 * La fonction se base sur la valeur de node.app pour déterminer quelle action exécuter.
 * Elle récupère l'accessToken depuis l'URL si nécessaire.
 *
 * @param {Object} node - Un objet contenant { id, app }.
 * @param {any} input - L'input courant (la sortie de l'étape précédente).
 * @returns {Promise<string>} La sortie produite par le nœud.
 */
export async function executeNode({
  userId,
  node,
  input,
  expertisesList,
  onRedirect,
}) {
  console.info('executeNode', { node, input, expertisesList });

  // Fonction pour gérer l'erreur
  const handleExecutionError = async (action) => {
    try {
      return await action();
    } catch (err) {
      console.error(
        `Erreur lors de l'exécution du nœud ${node.id}:`,
        err.message
      );
      return {
        error: `Erreur dans l'exécution du nœud ${node.id}: ${err.message}`,
      };
    }
  };

  // Exécution selon le type d'application (défini dans node.app)
  try {
    if (node.app === APPS_LABELS.SHEET) {
      console.info('SHEET', { node, input, expertisesList });
      const accessToken = await handleGmailLoginClient('/agentBuilder');
      console.info('SHEET access token', accessToken);

      return handleExecutionError(() =>
        handleFetchSheetContent({
          accessToken,
          selectedSheetId: node.fileId,
          selectedSheetName: node.sheet,
        }).then(({ data }) => {
          const result = convertRowsToObjects(data);
          return result;
        })
      );
    } else if (node.app === APPS_LABELS.GMAIL) {
      if (node.expertise === 'gmailEmails') {
        const accessToken = await handleGmailLoginClient('/agentBuilder');
        console.info('gmail access token', 'accessToken');

        return handleExecutionError(() =>
          handleFetchEmails(accessToken).then(({ messages }) => {
            const formattedEmails = messages.map(
              ({ from, subject, snippet }) => ({ from, subject, snippet })
            );
            return formattedEmails;
          })
        );
      } else if (node.expertise === 'sendEmail') {
        console.info('POST GMAIL sendEmail 456', node);
        const accessToken = await handleGmailLoginClient('/agentBuilder');
        console.info('gmail access token', 'accessToken');

        return handleExecutionError(() =>
          sendModelMessage({ userId, input, node, expertisesList }).then(
            (emails) => {
              console.info('emails 123', emails);
              for (const email of emails) {
                const { from = '', subject = '', body = '' } = email;
                handleSendEmail(
                  accessToken,
                  'dsp_fx@hotmail.com',
                  subject,
                  body
                );
              }
              return emails;
            }
          )
        );
      } else if (node.expertise === 'webSearch') {
        console.info('POST GMAIL webSearch', input);

        let searchQuery = '';
        if (input && input.length > 0 && input[0].data) {
          const searchData = input[0].data;
          searchQuery = searchData[0] || '';
        }

        return handleExecutionError(() =>
          handleWebSearch({
            searchQuery: searchQuery || 'Météo à Bordeaux',
          }).then(({ results }) => {
            return [{ search: searchQuery, results }];
          })
        );
      }
    } else if (node.app === APPS_LABELS.IA_MODEL) {
      const { mixedResults, mixedExpertisesList } = node.isMixerEnabled
        ? mixData({ input, expertisesList })
        : { mixedResults: input, mixedExpertisesList: expertisesList };

      console.info('executeNode formattedInput', {
        mixedResults,
        mixedExpertisesList,
      });
      console.info('executeNode formattedInput', { input, expertisesList });

      return handleExecutionError(() =>
        sendModelMessage({
          userId,
          node,
          input: mixedResults,
          expertisesList: mixedExpertisesList,
        }).then((modelMessage) => {
          console.info('modelMessage', modelMessage);

          return modelMessage;
        })
      );
    } else if (node.app === APPS_LABELS.DISPLAYS) {
      console.info('DISPLAYS', { node, input, expertisesList });

      return handleExecutionError(() =>
        sendModelMessage({
          userId,
          input,
          node,
          expertisesList,
        }).then((modelMessage) => {
          const currentExpertise = node.expertise;
          // const { inputs = {}, component = <></> } = expertisesList.find(
          //   ({ id }) => id === currentExpertise
          // );
          if (currentExpertise === 'displaysRanking') {
            onRedirect({ path: '/displays/ranking', data: modelMessage });
          }
          return modelMessage;
        })
      );
    } else {
      return `Aucune logique définie pour le node ${node.id} (app: ${node.app}).`;
    }
  } catch (err) {
    console.error("Erreur lors de l'exécution du nœud:", err.message);
    return { error: `Erreur dans executeNode: ${err.message}` };
  }
}

/**
 * Exécute un workflow en se basant sur le plan d'exécution.
 *
 * Le plan d'exécution est un tableau d'événements trié par ordre croissant de niveau,
 * chaque événement ayant la forme : { step: <number>, nodes: [{ id, app }] }.
 *
 * Pour chaque étape, tous les nœuds de l'étape sont exécutés en parallèle avec l'input courant.
 * La sortie de chaque nœud est préfixée par "[node.id-node.app]: " et les sorties sont concaténées
 * pour constituer l'input de l'étape suivante.
 *
 * @param {Array} executionPlan - Le plan d'exécution obtenu de getExecutionPlan.
 * @param {any} initialInput - L'input initial à passer au premier nœud.
 * @returns {Promise<any>} La sortie finale du workflow.
 */
export async function runWorkflow(
  userId,
  executionPlan,
  initialInput,
  expertisesList,
  onExcecutedNode,
  onRedirect
) {
  console.info('runWorkflow', { executionPlan, initialInput });

  try {
    if (!Array.isArray(executionPlan)) {
      throw new Error("Le plan d'exécution doit être un tableau.");
    }

    resetNodeStatuses(executionPlan, onExcecutedNode); // Réinitialisation des nœuds
    let currentOutputs = [];

    for (const event of executionPlan) {
      console.info('nodes 24', { event, currentOutputs });

      const outputs = await Promise.all(
        event.nodes.map(async (node) => {
          console.info('nodes 25', { node });

          const inputsIds = node.inputs;
          const inputToExecute = inputsIds
            .map((inputId) => {
              const input = currentOutputs.find(({ id }) => {
                const inputIdWithoutSuffix = id.split('-')[0];
                return inputIdWithoutSuffix === inputId;
              });

              if (!input) {
                console.warn(
                  `Input avec id ${inputId} non trouvé dans currentOutputs`
                );
              }

              return input;
            })
            .filter((input) => input !== undefined);

          onExcecutedNode({ nodeId: node.id, status: NODE_STATUS.RUN });

          let data;
          try {
            // Exécuter le nœud et gérer les erreurs spécifiques
            data = await executeNode({
              userId,
              node,
              input: inputToExecute,
              expertisesList,
              onRedirect,
            });

            const isValidResult =
              data && !(Array.isArray(data) && data.length === 0);

            onExcecutedNode({
              nodeId: node.id,
              status: isValidResult ? NODE_STATUS.FINISH : NODE_STATUS.ERROR,
            });

            return isValidResult
              ? { id: `${node.id}-${node.expertise}`, data }
              : {
                  error: `Erreur: Le noeud ${node.id} n'a renvoyé aucune réponse.`,
                };
          } catch (err) {
            console.error("Erreur lors de l'exécution du nœud:", err.message);
            onExcecutedNode({
              nodeId: node.id,
              status: NODE_STATUS.ERROR,
            });

            return {
              error: `Erreur dans l'exécution du nœud ${node.id}: ${err.message}`,
            };
          }
        })
      );

      currentOutputs = [...currentOutputs, ...outputs];
      console.log(
        `Étape ${event.step} exécutée. Sortie combinée:`,
        currentOutputs
      );
    }

    return currentOutputs;
  } catch (err) {
    // Si une erreur générale survient dans runWorkflow, on la retourne avec un message explicite
    console.error("Erreur lors de l'exécution du workflow:", err.message);
    return { error: `Erreur dans runWorkflow: ${err.message}` };
  }
}
