// lib/utils/encryption.js
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.SECRET_ENCRYPTION_KEY?.slice(0, 32); // 32 caractères = 256 bits

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error(
    '❌ SECRET_ENCRYPTION_KEY manquant ou invalide (doit faire 32 caractères)'
  );
}

const IV_LENGTH = 16; // Longueur du vecteur d'initialisation (en octets)

/**
 * Chiffre une chaîne de texte avec AES-256-CBC
 * @param {string} text - texte en clair
 * @returns {string} iv:encrypted
 */
export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Déchiffre une valeur chiffrée au format iv:encrypted
 * @param {string} encryptedValue - valeur chiffrée (ex: 1234abcd...:ae8b34...)
 * @returns {string} texte déchiffré
 */
export function decrypt(encryptedValue) {
  if (!encryptedValue.includes(':')) return '[clé corrompue]';

  const [ivHex, encryptedText] = encryptedValue.split(':');
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
