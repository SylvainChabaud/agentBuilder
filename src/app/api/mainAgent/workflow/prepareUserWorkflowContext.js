// src/app/api/mainAgent/workflow/prepareUserWorkflowContext.js

import { consolidateSummaries, summarizeOne } from './contextSummarizerAgent';
import { extractFileContent } from './utils';

/**
 * Étape 1 – Extraction brute des données utilisateur depuis le POST FormData
 * @param {Object} fields
 * @param {Object} files
 * @returns {Promise<{ userId: string, objectiveText: string, contextFiles: string[] }>}
 */
async function extractUserData(fields, files) {
  const objectiveText = fields.objective;
  const userIdRaw = fields.userId ?? 'demo';
  const userId = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw;

  const uploadedFiles = Array.isArray(files.files)
    ? files.files
    : files.files
      ? [files.files]
      : [];

  const contextFiles = await Promise.all(
    uploadedFiles.map(async (f) => ({
      name: f.originalFilename,
      path: f.filepath,
      type: f.mimetype,
      content: await extractFileContent(f),
    }))
  );

  return { userId, objectiveText, contextFiles };
}

/**
 * Étape 2 – Création d’un résumé structuré des fichiers fournis
 * @param {ContextFile[]} contextFiles
 * @returns {Promise<EnrichedContext>}
 */
async function summarizeContextFiles(contextFiles) {
  const fileSummaries = await Promise.all(
    contextFiles.map(async (file) => {
      const result = await summarizeOne(file);
      return {
        name: file.name,
        summary: result.summary,
        keyElements: result.keyElements || [],
      };
    })
  );

  let enrichedContext;

  // Seulement si plusieurs documents à analyser
  // Permet de résumer tous les documentsP
  if (fileSummaries.length === 1) {
    enrichedContext = {
      summary: fileSummaries[0].summary,
      keyElements: fileSummaries[0].keyElements,
    };
  } else {
    enrichedContext = await consolidateSummaries(
      fileSummaries.map(({ name, summary, keyElements }) => ({
        name,
        summary,
        keyElements,
      }))
    );
  }

  return {
    rawFiles: contextFiles,
    fileSummaries,
    enrichedContext, // 👈 toujours au même format
  };
}

/**
 * Fonction principale – Construction du contexte utilisateur complet
 * @param {Object} fields
 * @param {Object} files
 * @returns {Promise<{ userId: string, objectiveText: string, enrichedContext: EnrichedContext }>}
 */
export async function prepareUserWorkflowContext(fields, files) {
  const { userId, objectiveText, contextFiles } = await extractUserData(
    fields,
    files
  );

  const summarizedContextFiles =
    Array.isArray(contextFiles) && contextFiles.length > 0
      ? await summarizeContextFiles(contextFiles)
      : null;

  return { userId, objectiveText, contextFiles: summarizedContextFiles };
}
