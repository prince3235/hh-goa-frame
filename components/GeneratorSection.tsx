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
import { TeamForm } from "@/components/TeamForm";
import { TeamFramePreview } from "@/components/TeamFramePreview";
import { ImageAdjuster } from "@/components/ImageAdjuster";
import { ResultActions } from "@/components/ResultActions";
import { THEMES } from "@/lib/constants";
import { generateBuilderTitle, rerollBuilderTitle } from "@/lib/builder-title";
import { FrameTheme, OutputFormat, BuilderFields, TeamFields, ImageTransform } from "@/types";
import { RotateCcw, Sparkles } from "lucide-react";

export function GeneratorSection() {
  const { image, error, isProcessing, load, clear } = useImageUpload();
  const [format, setFormat] = useState<OutputFormat>("pfp");
  const [themeId, setThemeId] = useState<FrameTheme>("classic");

  // Single Image Zoom/Pan transform
  const [singleTransform, setSingleTransform] = useState<ImageTransform>({
    zoom: 1.0,
    offsetX: 0,
    offsetY: 0
  });

  // Single Builder Card fields
  const [fields, setFields] = useState<BuilderFields>({
    name: "",
    stack: "",
    role: "",
    title: generateBuilderTitle("builder")
  });

  // Team Frame fields
  const [teamFields, setTeamFields] = useState<TeamFields>({
    teamName: "ALPHA",
    tagline: "Official Goa Expedition Team",
    memberCount: 2,
    members: [
      {
        name: "Teammate 1",
        role: "AI Architect",
        stack: "Solana / Rust",
        title: "Prompt Wizard",
        imageUrl: null,
        transform: { zoom: 1.0, offsetX: 0, offsetY: 0 }
      },
      {
        name: "Teammate 2",
        role: "Full-Stack Dev",
        stack: "Next.js / TS",
        title: "Bug Hunter",
        imageUrl: null,
        transform: { zoom: 1.0, offsetX: 0, offsetY: 0 }
      }
    ]
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [ready, setReady] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  // When a user uploads a single image, also assign it to Member 1 if in Team mode or initialize
  useEffect(() => {
    if (!image) {
      setReady(false);
      return;
    }
    setIsGenerating(true);
    setReady(false);

    // Update Team Member 1 if empty
    if (format === "team") {
      setTeamFields((tf) => {
        const newMembers = [...tf.members];
        if (!newMembers[0].imageUrl) {
          newMembers[0].imageUrl = image.url;
        }
        return { ...tf, members: newMembers };
      });
    }

    const timer = setTimeout(() => {
      setIsGenerating(false);
      setReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [image, format, themeId]);

  useEffect(() => {
    if (format === "card" && themeId !== "builder") setThemeId("builder");
    if (format === "pfp" && themeId === "builder") setThemeId("classic");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  const activeTheme = format === "card" ? THEMES.find((t) => t.id === "builder")! : theme;

  const handleUploadMemberPhoto = (memberIndex: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setTeamFields((tf) => {
        const newMembers = [...tf.members];
        newMembers[memberIndex] = {
          ...newMembers[memberIndex],
          imageUrl: url
        };
        return { ...tf, members: newMembers };
      });
    };
    reader.readAsDataURL(file);
  };

  const isDownloadDisabled =
    format === "team"
      ? !teamFields.members.some((m) => m.imageUrl !== null)
      : !image || !ready;

  return (
    <section id="generator" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-hibiscus" />
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Make your frame</h2>
        </div>
        <span className="rounded-full bg-marigold/20 px-3 py-1 font-mono text-xs font-bold text-marigold">
          1080×1080 RETINA EXPORT
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        {/* Left Column: Controls & Forms */}
        <div className="space-y-6">
          <FormatToggle value={format} onChange={setFormat} />

          {format === "pfp" && (
            <>
              <UploadZone onFile={load} error={error} isProcessing={isProcessing} />
              {image && (
                <>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={clear}
                      className="focus-ring flex items-center gap-1.5 text-sm font-semibold text-hibiscus"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Choose a different photo
                    </button>
                  </div>
                  <ImageAdjuster transform={singleTransform} onChange={setSingleTransform} />
                </>
              )}
              <ThemePicker value={themeId} onChange={setThemeId} />
            </>
          )}

          {format === "card" && (
            <>
              <UploadZone onFile={load} error={error} isProcessing={isProcessing} />
              {image && (
                <>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={clear}
                      className="focus-ring flex items-center gap-1.5 text-sm font-semibold text-hibiscus"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Choose a different photo
                    </button>
                  </div>
                  <ImageAdjuster transform={singleTransform} onChange={setSingleTransform} />
                </>
              )}
              <BuilderForm
                fields={fields}
                onChange={setFields}
                onReroll={() =>
                  setFields((f) => ({
                    ...f,
                    title: rerollBuilderTitle(f.name || f.role || f.stack)
                  }))
                }
              />
            </>
          )}

          {format === "team" && (
            <TeamForm
              fields={teamFields}
              onChange={setTeamFields}
              onUploadMemberPhoto={handleUploadMemberPhoto}
              isProcessing={isProcessing}
              error={error}
            />
          )}
        </div>

        {/* Right Column: Live Preview & Downloads */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="relative flex min-h-[340px] sm:min-h-[380px] w-full items-center justify-center overflow-hidden py-2">
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
                  <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">Generating preview…</p>
                </motion.div>
              ) : (
                <div className="w-full max-w-full flex justify-center items-center overflow-hidden px-1">
                  <motion.div
                    key={format}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                    className="shrink-0 origin-center transition-transform max-[520px]:scale-[0.85] max-[420px]:scale-[0.74] max-[375px]:scale-[0.66]"
                  >
                    {format === "pfp" && (
                      <FramePreview
                        ref={previewRef}
                        imageUrl={image?.url ?? null}
                        theme={activeTheme}
                        transform={singleTransform}
                        size={360}
                      />
                    )}

                    {format === "card" && (
                      <BuilderCard
                        ref={previewRef}
                        imageUrl={image?.url ?? null}
                        theme={activeTheme}
                        fields={fields}
                        width={480}
                      />
                    )}

                    {format === "team" && (
                      <TeamFramePreview
                        ref={previewRef}
                        fields={teamFields}
                        width={460}
                      />
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full max-w-sm">
            <ResultActions
              nodeRef={previewRef}
              filename={`hh-goa-2026-${format}.png`}
              disabled={isDownloadDisabled}
              format={format}
              theme={activeTheme}
              imageUrl={image?.url ?? null}
              fields={fields}
              teamFields={teamFields}
            />
            {isDownloadDisabled && (
              <p className="mt-3 text-center text-sm opacity-60">
                {format === "team"
                  ? "Upload at least 1 teammate photo to unlock download & share."
                  : "Upload a photo to unlock download & share."}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

