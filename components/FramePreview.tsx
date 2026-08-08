"use client";

import { forwardRef } from "react";
import { ThemeDefinition } from "@/types";
import { Palm } from "@/components/decor/Palm";

interface FramePreviewProps {
  imageUrl: string | null;
  theme: ThemeDefinition;
  size?: number;
}

/**
 * Square, ready-to-use X profile picture: uploaded photo center-cropped into a circle,
 * wrapped in HH Goa 2026 branding. forwardRef exposes the DOM node for PNG export.
 */
export const FramePreview = forwardRef<HTMLDivElement, FramePreviewProps>(
  ({ imageUrl, theme, size = 480 }, ref) => {
    const showPalms = theme.id === "tropical" || theme.id === "beach" || theme.id === "classic";

    return (
      <div
        ref={ref}
        style={{ width: size, height: size, backgroundColor: theme.bg }}
        className="relative overflow-hidden rounded-[28px]"
      >
        {/* ambient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${theme.ring}22, transparent 60%)`
          }}
        />

        {/* dotted seal border, inset from the edge like the event badge */}
        <div className="dotted-border-gold absolute inset-3 rounded-[22px] opacity-70" />
        <div
          className="absolute inset-[18px] rounded-[18px]"
          style={{ backgroundColor: theme.bg }}
        />

        {showPalms && (
          <>
            <Palm color={theme.ring} className="absolute -left-2 top-4 h-24 w-24 opacity-90 -scale-x-100" />
            <Palm color={theme.ring} className="absolute -right-2 top-4 h-24 w-24 opacity-90" />
          </>
        )}

        {/* photo */}
        <div className="absolute inset-0 flex items-center justify-center pt-2">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: size * 0.58,
              height: size * 0.58,
              boxShadow: `0 0 0 6px ${theme.bg}, 0 0 0 12px ${theme.ring}, 0 20px 40px rgba(0,0,0,0.35)`
            }}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="Your uploaded photo, framed" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-black/20 flex items-center justify-center text-sand/40 font-body text-sm">
                Your photo
              </div>
            )}
          </div>
        </div>

        {/* bottom ribbon */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div
            className="rounded-full px-4 py-1.5 font-display font-semibold tracking-wide text-center whitespace-nowrap"
            style={{
              backgroundColor: theme.accent,
              color: "#FBF6E9",
              fontSize: size * 0.036
            }}
          >
            HACKER HOUSE GOA · 2026
          </div>
        </div>
      </div>
    );
  }
);
FramePreview.displayName = "FramePreview";
