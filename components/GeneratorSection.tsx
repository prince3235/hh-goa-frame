"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useImageUpload } from "@/hooks/useImageUpload";
import { UploadZone } from "@/components/UploadZone";
import { FormatToggle } from "@/components/FormatToggle";
import { ThemePicker } from "@/components/ThemePicker";
import { FramePreview } from "@/components/FramePreview";
import { BuilderCard } from "@/components/BuilderCard";
import { BuilderForm } from "@/components/BuilderForm";
import { ResultActions } from "@/components/ResultActions";
import { THEMES } from "@/lib/constants";
import { generateBuilderTitle, rerollBuilderTitle } from "@/lib/builder-title";
import { FrameTheme, OutputFormat, BuilderFields } from "@/types";
import { RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function GeneratorSection() {
  const { image, error, isProcessing, load, clear } = useImageUpload();
  const [format, setFormat] = useState<OutputFormat>("pfp");
  const [themeId, setThemeId] = useState<FrameTheme>("classic");
  const [fields, setFields] = useState<BuilderFields>({
    name: "",
    stack: "",
    role: "",
    title: generateBuilderTitle("builder")
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [ready, setReady] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  // simulate the "watch a smooth animation" moment between upload and reveal
  useEffect(() => {
    if (!image) {
      setReady(false);
      return;
    }
    setIsGenerating(true);
    setReady(false);
    const timer = setTimeout(() => {
      setIsGenerating(false);
      setReady(true);
    }, 700);
    return () => clearTimeout(timer);
  }, [image, format, themeId]);

  useEffect(() => {
    if (format === "card" && themeId !== "builder") setThemeId("builder");
    if (format === "pfp" && themeId === "builder") setThemeId("classic");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  const activeTheme = format === "card" ? THEMES.find((t) => t.id === "builder")! : theme;

  return (
    <section id="generator" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-hibiscus" />
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Make your frame</h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        {/* Controls */}
        <div className="space-y-6">
          <FormatToggle value={format} onChange={setFormat} />
          <UploadZone onFile={load} error={error} isProcessing={isProcessing} />

          {image && (
            <button
              onClick={clear}
              className="focus-ring flex items-center gap-1.5 text-sm font-semibold text-hibiscus"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Choose a different photo
            </button>
          )}

          {format === "pfp" ? (
            <ThemePicker value={themeId} onChange={setThemeId} />
          ) : (
            <BuilderForm
              fields={fields}
              onChange={setFields}
              onReroll={() =>
                setFields((f) => ({ ...f, title: rerollBuilderTitle(f.name || f.role || f.stack) }))
              }
            />
          )}
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex min-h-[320px] w-full items-center justify-center">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    className="h-14 w-14 rounded-full border-4 border-marigold border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                  />
                  <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">Generating…</p>
                </motion.div>
              ) : (
                <motion.div
                  key={format}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                >
                  {format === "pfp" ? (
                    <FramePreview ref={previewRef} imageUrl={image?.url ?? null} theme={activeTheme} size={340} />
                  ) : (
                    <BuilderCard ref={previewRef} imageUrl={image?.url ?? null} theme={activeTheme} fields={fields} width={480} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full max-w-sm">
            <ResultActions
              nodeRef={previewRef}
              filename={`hh-goa-2026-${format}.png`}
              disabled={!image || !ready}
              format={format}
              theme={activeTheme}
              imageUrl={image?.url ?? null}
              fields={fields}
            />
            {!image && (
              <p className="mt-3 text-center text-sm opacity-60">Upload a photo to unlock download & share.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
