import dotenv from 'dotenv';
import fs from 'fs/promises';
import mammoth from 'mammoth';
import PDFParser from 'pdf2json';
import path from 'path';

dotenv.config();

const WORKFLOW_ROOT = path.resolve(process.cwd(), process.env.WORKFLOW_DIR);

/**
 * Extraction simple de texte depuis un PDF avec pdf2json
 * @param {string} filePath
 * @returns {Promise<string>}
 */
export async function extractPdfText(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataError', (errData) => {
      console.error('PDF2JSON Error:', errData.parserError);
      reject('[Erreur lecture PDF]');
    });

    pdfParser.on('pdfParser_dataReady', () => {
      const text = pdfParser.getRawTextContent();
      console.info('PDF2JSON text:', text);

      resolve(text.trim());
    });

    pdfParser.loadPDF(filePath);
  });
}

/**
 * Extrait le contenu d’un fichier supporté (docx, pdf, xlsx, txt)
 * @param {Object} f - Fichier formidable
 * @returns {Promise<string>}
 */
/**
 * Extrait le contenu texte brut d’un fichier uploadé (FormData via formidable)
 * @param {{ filepath: string, mimetype: string }} f
 * @returns {Promise<string>}
 */
export async function extractFileContent(f) {
  try {
    const buffer = await fs.readFile(f.filepath);
    const type = f.mimetype;

    if (type === 'application/doc') {
      // return buffer.toString('utf-8');
    }

    if (type === 'application/pdf') {
      console.info('PDF2JSON pdf 456:', text);

      const x = await extractPdfText(f.filepath);
      console.info('PDF2JSON pdf 789:', text);

      return x;
    }

    if (
      // TYPE: DOCX
      type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value.trim();
    }

    return `[Type non supporté : ${type}]`;
  } catch (err) {
    console.error('❌ Erreur extractFileContent :', err);
    return '[Erreur lecture fichier]';
  }
}

/**
 * Met à jour le fichier state.json pour un workflow donné
 * @param {string} userId
 * @param {string} workflowId
 * @param {Object} state - L’état complet du workflow à sauvegarder
 * @returns {Promise<void>}
 */
export async function updateWorkflowState(userId, workflowId, state) {
  const basePath = path.join(WORKFLOW_ROOT, userId, workflowId);
  const filePath = path.join(basePath, 'state.json');

  console.info('filePath 999', filePath);

  await fs.writeFile(filePath, JSON.stringify(state, null, 2));

  // const filePath = path.join(WORKFLOW_ROOT, userId, workflowId, 'state.json');
  // await fs.writeFile(filePath, JSON.stringify(state, null, 2), 'utf-8');
}
