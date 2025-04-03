// lib/parsers/docx.js
import { readFile } from 'fs/promises';
import { Document } from 'docx4js';

/**
 * Extrait le texte brut d'un fichier .docx
 * @param {string} filePath
 * @returns {Promise<string>} contenu texte
 */
export async function readDocxText(filePath) {
  try {
    const buffer = await readFile(filePath);
    const doc = await Document.load(buffer);
    return doc.text(); // méthode fournie par docx4js
  } catch (err) {
    console.error('Erreur lecture docx:', err);
    return '[Erreur lecture .docx]';
  }
}
