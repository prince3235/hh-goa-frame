"use client";

import { useCallback, useState } from "react";
import { UploadedImage } from "@/types";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/heif"];
const MAX_SIZE_MB = 25;

export function useImageUpload() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const load = useCallback(async (file: File) => {
    setError(null);

    const typeOk =
      ACCEPTED_TYPES.includes(file.type) ||
      /\.(jpe?g|png|heic|heif)$/i.test(file.name);

    if (!typeOk) {
      setError("Please upload a JPG, PNG, or HEIC photo.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`That file is a bit large — keep it under ${MAX_SIZE_MB}MB.`);
      return;
    }

    setIsProcessing(true);
    try {
      const url = URL.createObjectURL(file);
      const dims = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => reject(new Error("Could not read that image."));
        img.src = url;
      });
      setImage({ file, url, width: dims.width, height: dims.height });
    } catch {
      setError("Could not read that image — try a different file.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clear = useCallback(() => {
    if (image?.url) URL.revokeObjectURL(image.url);
    setImage(null);
    setError(null);
  }, [image]);

  return { image, error, isProcessing, load, clear };
}
