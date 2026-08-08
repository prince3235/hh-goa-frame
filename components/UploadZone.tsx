"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, ImageOff } from "lucide-react";

interface UploadZoneProps {
  onFile: (file: File) => void;
  error: string | null;
  isProcessing: boolean;
}

export function UploadZone({ onFile, error, isProcessing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <div>
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Upload your photo. Click or drag and drop a JPG, PNG, or HEIC file."
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`focus-ring cursor-pointer rounded-[24px] border-2 border-dashed p-10 text-center transition-colors duration-200 ${
          isDragging
            ? "border-marigold bg-marigold/10"
            : "border-jungle-light/40 dark:border-sand/30 hover:border-marigold/70"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/heic,image/heif"
          className="hidden"
          aria-hidden="true"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
            e.target.value = "";
          }}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-hibiscus/10 p-4">
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <UploadCloud className="h-7 w-7 text-hibiscus" />
              </motion.div>
            ) : (
              <UploadCloud className="h-7 w-7 text-hibiscus" />
            )}
          </div>
          <p className="font-display text-xl">
            {isProcessing ? "Reading your photo…" : "Drop your photo here"}
          </p>
          <p className="text-sm opacity-70">or click to browse — JPG, PNG, HEIC</p>
          <p className="text-xs opacity-50">No cropping needed. Portrait, landscape, or square all work.</p>
        </div>
      </motion.div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-hibiscus" role="alert">
          <ImageOff className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}
