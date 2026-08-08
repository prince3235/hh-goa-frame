"use client";

import { useState } from "react";
import { Download, Twitter, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { exportFrameOrCard, downloadDataUrl, dataUrlToFile } from "@/lib/export-image";
import { HASHTAG, SHARE_CAPTIONS } from "@/lib/constants";
import { ThemeDefinition, BuilderFields, OutputFormat, TeamFields } from "@/types";

interface ResultActionsProps {
  nodeRef: React.RefObject<HTMLDivElement | null>;
  filename: string;
  disabled: boolean;
  format?: OutputFormat;
  theme?: ThemeDefinition;
  imageUrl?: string | null;
  fields?: BuilderFields;
  teamFields?: TeamFields;
}

export function ResultActions({
  nodeRef,
  filename,
  disabled,
  format = "pfp",
  theme,
  imageUrl,
  fields,
  teamFields
}: ResultActionsProps) {
  const [isExporting, setIsExporting] = useState<"download" | "share" | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  const caption = SHARE_CAPTIONS[Math.floor(Math.random() * SHARE_CAPTIONS.length)];

  const generateDataUrl = async () => {
    if (theme) {
      return await exportFrameOrCard({
        format,
        imageUrl: imageUrl ?? null,
        theme,
        fields,
        teamFields,
        node: nodeRef.current
      });
    }
    if (!nodeRef.current) throw new Error("Preview element not found");
    const { exportNodeToPng } = await import("@/lib/export-image");
    return await exportNodeToPng(nodeRef.current);
  };

  const handleDownload = async () => {
    setIsExporting("download");
    try {
      const dataUrl = await generateDataUrl();
      downloadDataUrl(dataUrl, filename);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.error("Export download error:", err);
      alert(err instanceof Error ? err.message : "Failed to generate image.");
    } finally {
      setIsExporting(null);
    }
  };

  const handleShare = async () => {
    setIsExporting("share");
    try {
      const dataUrl = await generateDataUrl();
      const file = dataUrlToFile(dataUrl, filename);
      const text = `${caption} ${HASHTAG}`;

      // Native share sheet (mobile / supporting browsers) can attach the image directly.
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text });
        return;
      }

      // Fallback: download the image, then open a pre-filled tweet composer.
      downloadDataUrl(dataUrl, filename);
      const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(intent, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Export share error:", err);
      alert(err instanceof Error ? err.message : "Failed to generate image for sharing.");
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button variant="secondary" size="lg" disabled={disabled || !!isExporting} onClick={handleDownload} className="flex-1">
        {isExporting === "download" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : downloaded ? (
          <Check className="h-5 w-5" />
        ) : (
          <Download className="h-5 w-5" />
        )}
        {downloaded ? "Downloaded" : "Download PNG"}
      </Button>
      <Button variant="primary" size="lg" disabled={disabled || !!isExporting} onClick={handleShare} className="flex-1">
        {isExporting === "share" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Twitter className="h-5 w-5" />}
        Share to X
      </Button>
    </div>
  );
}
