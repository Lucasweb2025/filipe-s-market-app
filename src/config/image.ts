/** Limites para upload de fotos de produto (Storage + banda). */
export const IMAGE_UPLOAD_CONFIG = {
  maxDimension: 1200,
  initialQuality: 0.82,
  minQuality: 0.5,
  /** Alvo máximo por foto — evita estourar cota do Firebase Storage. */
  maxBytes: 350 * 1024,
  mimeType: "image/jpeg",
  maxFileInputBytes: 15 * 1024 * 1024,
} as const;
