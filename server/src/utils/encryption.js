import crypto from "crypto";
import env from "../config/env.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

/**
 * Derives a 32-byte key from the encryption key using SHA-256.
 */
const getKey = () => {
  return crypto.createHash("sha256").update(env.ENCRYPTION_KEY).digest();
};

/**
 * Encrypts a string using AES-256-GCM.
 * @param {string} text - Plaintext to encrypt
 * @returns {string} - Encrypted string (iv:authTag:ciphertext) in hex
 */
export const encrypt = (text) => {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
};

/**
 * Decrypts a string encrypted with AES-256-GCM.
 * @param {string} encryptedText - Encrypted string (iv:authTag:ciphertext)
 * @returns {string} - Decrypted plaintext
 */
export const decrypt = (encryptedText) => {
  const [ivHex, authTagHex, ciphertext] = encryptedText.split(":");
  const key = getKey();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

/**
 * Encrypts sensitive fields in an object.
 * @param {Object} data - Data with sensitive fields to encrypt
 * @param {string[]} fields - Field names to encrypt
 * @returns {Object} - Object with specified fields encrypted
 */
export const encryptFields = (data, fields) => {
  const result = { ...data };
  for (const field of fields) {
    if (result[field] !== undefined && result[field] !== null) {
      result[field] = encrypt(String(result[field]));
    }
  }
  return result;
};

/**
 * Decrypts sensitive fields in an object.
 * @param {Object} data - Data with encrypted fields
 * @param {string[]} fields - Field names to decrypt
 * @returns {Object} - Object with specified fields decrypted
 */
export const decryptFields = (data, fields) => {
  const result = { ...data };
  for (const field of fields) {
    if (result[field] !== undefined && result[field] !== null) {
      try {
        result[field] = decrypt(String(result[field]));
      } catch {
        // Field was not encrypted, keep original value
      }
    }
  }
  return result;
};
