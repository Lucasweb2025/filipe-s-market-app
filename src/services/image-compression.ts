import { IMAGE_UPLOAD_CONFIG } from "@/config/image";
import { createFileFingerprint } from "@/lib/file-fingerprint";

export type CompressedImage = {
  /** Arquivo pronto para upload no Firebase Storage. */
  file: File;
  /** URL temporária para pré-visualização na UI. */
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Não foi possível ler a imagem selecionada."));
    };
    image.src = objectUrl;
  });
}

function scaleDimensions(width: number, height: number, maxDimension: number) {
  const longestSide = Math.max(width, height);
  if (longestSide <= maxDimension) return { width, height };

  const scale = maxDimension / longestSide;
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number, mimeType: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Falha ao compactar a imagem."))),
      mimeType,
      quality,
    );
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function revokeCompressedImagePreview(image: CompressedImage | null) {
  if (image?.previewUrl.startsWith("blob:")) {
    URL.revokeObjectURL(image.previewUrl);
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Não foi possível preparar a imagem."));
    reader.readAsDataURL(file);
  });
}

const compressionCache = new Map<string, CompressedImage>();
let compressionInFlight: Promise<CompressedImage> | null = null;
let compressionInFlightKey: string | null = null;

function cloneCachedImage(cached: CompressedImage): CompressedImage {
  return {
    ...cached,
    previewUrl: URL.createObjectURL(cached.file),
  };
}

/**
 * Redimensiona e comprime a foto no celular antes de salvar ou enviar ao Storage.
 * Mantém qualidade visual da vitrine sem arquivos pesados do tipo 4–8 MB.
 */
export async function compressImageForUpload(
  file: File,
  config = IMAGE_UPLOAD_CONFIG,
): Promise<CompressedImage> {
  const fingerprint = createFileFingerprint(file);
  const cached = compressionCache.get(fingerprint);
  if (cached) {
    return cloneCachedImage(cached);
  }

  if (compressionInFlight && compressionInFlightKey === fingerprint) {
    return compressionInFlight;
  }

  compressionInFlightKey = fingerprint;
  compressionInFlight = compressImageForUploadInternal(file, config)
    .then((result) => {
      compressionCache.set(fingerprint, {
        ...result,
        previewUrl: result.previewUrl,
      });
      return result;
    })
    .finally(() => {
      compressionInFlight = null;
      compressionInFlightKey = null;
    });

  return compressionInFlight;
}

async function compressImageForUploadInternal(
  file: File,
  config = IMAGE_UPLOAD_CONFIG,
): Promise<CompressedImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem válido.");
  }

  if (file.size > config.maxFileInputBytes) {
    throw new Error(`A imagem é muito grande. O limite é ${formatFileSize(config.maxFileInputBytes)}.`);
  }

  const source = await loadImage(file);
  let { width, height } = scaleDimensions(
    source.naturalWidth,
    source.naturalHeight,
    config.maxDimension,
  );

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Seu navegador não suporta compactação de imagem.");
  }

  let quality = config.initialQuality;
  let blob: Blob | null = null;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);

    blob = await canvasToBlob(canvas, quality, config.mimeType);
    if (blob.size <= config.maxBytes) break;

    if (quality > config.minQuality) {
      quality = Math.max(config.minQuality, quality - 0.08);
      continue;
    }

    width = Math.round(width * 0.85);
    height = Math.round(height * 0.85);
    quality = config.initialQuality;
  }

  if (!blob) {
    throw new Error("Falha ao compactar a imagem.");
  }

  const baseName = file.name.replace(/\.[^.]+$/, "") || "produto";
  const compressedFile = new File([blob], `${baseName}.jpg`, { type: config.mimeType });

  return {
    file: compressedFile,
    previewUrl: URL.createObjectURL(blob),
    originalSize: file.size,
    compressedSize: blob.size,
    width,
    height,
  };
}
