"use client";

import { forwardRef } from "react";
import { ThemeDefinition, BuilderFields } from "@/types";
import { Palm } from "@/components/decor/Palm";

interface BuilderCardProps {
  imageUrl: string | null;
  theme: ThemeDefinition;
  fields: BuilderFields;
  width?: number;
}

/**
 * Event-badge style card: photo + name + stack/role + generated builder title.
 * Designed to be posted as an image (16:10-ish ratio reads well as an X card / OG image).
 */
export const BuilderCard = forwardRef<HTMLDivElement, BuilderCardProps>(
  ({ imageUrl, theme, fields, width = 640 }, ref) => {
    const height = Math.round(width / 1.586);

    return (
      <div
        ref={ref}
        style={{ width, height, backgroundColor: theme.bg }}
        className="relative overflow-hidden rounded-[24px] font-body"
      >
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 85% 0%, ${theme.accent}33, transparent 55%)` }}
        />
        <Palm color={theme.ring} className="absolute -right-6 -bottom-4 h-40 w-40 opacity-20" />

        {/* dotted perimeter */}
        <div className="dotted-border-gold absolute inset-2 rounded-[20px] opacity-60" />
        <div className="absolute inset-[14px] rounded-[16px]" style={{ backgroundColor: theme.bg }} />

        <div className="relative h-full w-full px-7 py-6 flex flex-col justify-between">
          {/* header row */}
          <div className="flex items-start justify-between">
            <div>
              <p
                className="font-mono uppercase tracking-[0.25em] text-[11px]"
                style={{ color: theme.ring }}
              >
                Builder ID
              </p>
              <p className="font-display text-lg leading-tight" style={{ color: "#FBF6E9" }}>
                Hacker House <span style={{ color: theme.accent }}>Goa</span>
              </p>
            </div>
            <div
              className="font-mono text-[10px] px-2 py-1 rounded-full border"
              style={{ borderColor: theme.ring, color: theme.ring }}
            >
              28–31 OCT 2026
            </div>
          </div>

          {/* body row */}
          <div className="flex items-center gap-5">
            <div
              className="relative shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: height * 0.42,
                height: height * 0.42,
                boxShadow: `0 0 0 4px ${theme.bg}, 0 0 0 8px ${theme.ring}`
              }}
            >
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-black/20" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="font-display font-bold leading-none truncate"
                style={{ color: "#FBF6E9", fontSize: width * 0.052 }}
              >
                {fields.name || "Your Name"}
              </p>
              <p
                className="font-mono mt-2 text-sm truncate"
                style={{ color: theme.ring }}
              >
                {fields.role || "Role"} {fields.stack ? `· ${fields.stack}` : ""}
              </p>
              <span
                className="inline-block mt-3 rounded-full px-3 py-1 font-body font-semibold text-xs"
                style={{ backgroundColor: theme.accent, color: "#FBF6E9" }}
              >
                {fields.title}
              </span>
            </div>
          </div>

          {/* footer */}
          <div className="flex items-center justify-between font-mono text-[10px]" style={{ color: `${theme.ring}99` }}>
            <span>#FrameInGoa</span>
            <span>GOA, INDIA</span>
          </div>
        </div>
      </div>
    );
  }
);
BuilderCard.displayName = "BuilderCard";
