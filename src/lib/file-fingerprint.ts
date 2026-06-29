/** Identifica a mesma foto selecionada duas vezes — evita recompressão desnecessária. */
export function createFileFingerprint(file: File): string {
  return `${file.name}:${file.size}:${file.lastModified}`;
}
