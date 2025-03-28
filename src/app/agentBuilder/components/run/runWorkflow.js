import { handleGmailLoginClient } from '../../../../../src/app/components/gmail/oAuth/handleGmailLoginClient';
import { handleFetchEmails } from '../../../../../lib/services/gmail/fetchEmails';
import { handleSendEmail } from '../../../../../lib/services/gmail/sendEmail';
import { handleWebSearch } from '../../../../../lib/services/gmail/webSearch';
import { NODE_STATUS } from '../../constants';
import { APPS_LABELS } from '../../../../../lib/constants';
import { handleFetchSheetContent } from '../../../../../lib/services/sheets/getFileContent';
import { convertRowsToObjects } from './utils';
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
export async function executeNode({ node, input, expertisesList, onRedirect }) {
  console.info('executeNode', { node, input, expertisesList });

  // Exécution selon le type d'application (défini dans node.app)
  if (node.app === APPS_LABELS.SHEET) {
    console.info('SHEET', { node, input, expertisesList });

    console.info('SHEET 1 ', { fileId: node.fileName });

    const accessToken = await handleGmailLoginClient('/agentBuilder');
    console.info('SHEET access token', accessToken);

    // const { data } = await handleFetchSheets(accessToken);
    const { data } = await handleFetchSheetContent({
      accessToken,
      selectedSheetId: node.fileId,
      selectedSheetName: node.sheet,
    });

    console.info('SHEET access token 2 ', data);

    const result = convertRowsToObjects(data);
    console.info('SHEET access token 3 ', result);

    return result;
  } else if (node.app === APPS_LABELS.GMAIL) {
    if (node.expertise === 'gmailEmails') {
      const accessToken = await handleGmailLoginClient('/agentBuilder');
      console.info('gmail access token', 'accessToken');
      // Appel à l'API Gmail pour récupérer les emails
      const { messages } = await handleFetchEmails(accessToken);

      console.info('POST GMAIL 1', messages);
      const formattedEmails = messages.map(({ from, subject, snippet }) => ({
        from,
        subject,
        snippet,
      }));
      console.info('POST GMAIL 2', formattedEmails);

      // Retourner une chaîne formatée représentant les emails récupérés
      return formattedEmails;
    } else if (node.expertise === 'sendEmail') {
      console.info('POST GMAIL sendEmail 456', node);
      const accessToken = await handleGmailLoginClient('/agentBuilder');
      console.info('gmail access token', 'accessToken');

      const emails = await sendModelMessage({ input, node, expertisesList });

      console.info('emails 123', emails);

      for (const email of emails) {
        const { from = '', subject = '', body = '' } = email;
        console.info('emails 456', emails);

        await handleSendEmail(accessToken, 'dsp_fx@hotmail.com', subject, body);
      }

      return emails;
    } else if (node.expertise === 'webSearch') {
      console.info('POST GMAIL webSearch', input);

      // Si l'entrée contient une requête de recherche, on l'utilise
      let searchQuery = '';
      if (input && input.length > 0 && input[0].data) {
        console.info('POST GMAIL webSearch 1', input);
        // Tenter d'extraire la requête de recherche à partir de l'entrée
        const searchData = input[0].data;
        if (Array.isArray(searchData) && searchData.length > 0) {
          console.info('POST GMAIL webSearch 2', searchData);
          if (searchData[0]) {
            console.info('POST GMAIL webSearch 3', searchData[0]);
            searchQuery = searchData[0];
          } else {
            // Fallback - utiliser une chaîne de caractères ou le premier élément
            searchQuery =
              typeof searchData[0] === 'string'
                ? searchData[0]
                : JSON.stringify(searchData[0]);
          }
        }
      }

      // Effectuer la recherche web
      const { results } = await handleWebSearch({
        searchQuery: searchQuery || 'Météo à Floirac 18 mars 2025',
      });

      return [{ search: searchQuery, results }];
    }
  } else if (node.app === APPS_LABELS.IA_MODEL) {
    const modelMessage = await sendModelMessage({
      input,
      node,
      expertisesList,
    });
    console.info('modelMessage', modelMessage);

    return modelMessage;
  } else if (node.app === APPS_LABELS.DISPLAYS) {
    console.info('DISPLAYS', { node, input, expertisesList });

    const modelMessage = await sendModelMessage({
      input,
      node,
      expertisesList,
    });

    const currentExpertise = node.expertise;
    const { inputs = {}, component = <></> } = expertisesList.find(
      ({ id }) => id === currentExpertise
    );

    console.info('DISPLAYS', { currentExpertise, inputs, component });

    if (currentExpertise === 'displaysRanking') {
      console.info('displaysRanking', modelMessage);
      onRedirect({ path: '/displays/ranking', data: modelMessage });
    }
    // return input;
  } else {
    // Si aucune logique n'est définie pour ce node, retourner un message par défaut.
    return `Aucune logique définie pour le node ${node.id} (app: ${node.app}).`;
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
  executionPlan,
  initialInput,
  expertisesList,
  onExcecutedNode,
  onRedirect
) {
  console.info('runWorkflow', { executionPlan, initialInput });

  if (!Array.isArray(executionPlan)) {
    throw new Error("Le plan d'exécution doit être un tableau.");
  }
  let currentInput = [{ id: '', data: [initialInput] }];

  // Parcourir chaque étape dans l'ordre (le plan est supposé trié par "step" croissant)
  for (const event of executionPlan) {
    // Pour chaque node de l'étape, exécuter en parallèle.
    const outputs = await Promise.all(
      event.nodes.map(async (node) => {
        console.info('nodes 25', node);

        onExcecutedNode({ nodeId: node.id, status: NODE_STATUS.RUN });

        console.info('expertisesList 123', { node, expertisesList });
        const data = await executeNode({
          node,
          input: currentInput,
          expertisesList,
          onRedirect,
        });

        const result = {
          id: `${node.id}-${node.expertise}`,
          data,
        };

        onExcecutedNode({
          nodeId: node.id,
          status: NODE_STATUS.FINISH,
          // result,
        });

        console.info('expertisesList 123456', result);

        // Formatage de la sortie pour inclure l'identifiant du node et son app.
        return result;
      })
    );
    // Concaténer toutes les sorties pour constituer l'input de la prochaine étape.
    // currentInput = outputs.join('\n');
    currentInput = outputs;
    console.log(`Étape ${event.step} exécutée. Sortie combinée:`, currentInput);
  }

  return currentInput;
}
