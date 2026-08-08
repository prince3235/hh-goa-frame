"use client";

import { forwardRef } from "react";
import { TeamFields } from "@/types";
import { Palm } from "@/components/decor/Palm";

interface TeamFramePreviewProps {
  fields: TeamFields;
  width?: number;
}

export const TeamFramePreview = forwardRef<HTMLDivElement, TeamFramePreviewProps>(
  ({ fields, width = 500 }, ref) => {
    const members = fields.members.slice(0, fields.memberCount);

    return (
      <div
        ref={ref}
        style={{ width: `${width}px`, height: `${width}px` }}
        className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-[#0A3A27] p-5 sm:p-6 text-sand shadow-2xl border-2 border-marigold/30 max-w-full"
      >
        {/* Ambient radial gold glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 85% 0%, rgba(246,201,14,0.22), transparent 60%)"
          }}
        />

        {/* Dotted seal border inset */}
        <div className="dotted-border-gold absolute inset-3 rounded-[22px] opacity-70 pointer-events-none" />

        {/* Palm frond decorations */}
        <Palm color="#F6C90E" className="absolute -left-3 top-3 h-24 w-24 opacity-80 -scale-x-100 pointer-events-none" />
        <Palm color="#E8177D" className="absolute -right-3 top-3 h-24 w-24 opacity-70 pointer-events-none" />

        {/* Header Row */}
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-marigold font-semibold">
              Official Team Pass
            </p>
            <h3 className="font-display text-base sm:text-xl font-bold leading-tight text-[#FBF6E9]">
              Hacker House <span className="text-marigold">Goa</span>
            </h3>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-marigold/40 bg-black/40 px-2.5 py-1 font-mono text-[10px] font-medium text-marigold backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-marigold animate-pulse" />
            <span>28–31 OCT 2026</span>
          </div>
        </div>

        {/* Center: Team Member Cards */}
        <div
          className="relative z-10 my-auto grid gap-3 sm:gap-4 py-2 items-center w-full"
          style={{ gridTemplateColumns: `repeat(${fields.memberCount}, minmax(0, 1fr))` }}
        >
          {members.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Photo Double Ring Frame */}
              <div
                className="relative flex h-32 w-full max-w-[125px] flex-col items-center justify-end overflow-hidden rounded-[22px] bg-[#06261A] shadow-xl sm:h-40 sm:max-w-[145px]"
                style={{
                  boxShadow: "0 0 0 3px #0A3A27, 0 0 0 6px #F6C90E, 0 14px 28px rgba(0,0,0,0.5)"
                }}
              >
                {m.imageUrl ? (
                  <div className="absolute inset-0 overflow-hidden">
                    {/* eslint-disable-next-html-element-suppress */}
                    <img
                      src={m.imageUrl}
                      alt={m.name}
                      style={{
                        transform: `scale(${m.transform?.zoom || 1}) translate(${m.transform?.offsetX || 0}%, ${m.transform?.offsetY || 0}%)`,
                        transformOrigin: "center"
                      }}
                      className="h-full w-full object-cover transition-transform duration-100"
                    />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-black/30 text-sand">
                    <span className="font-display text-2xl sm:text-3xl font-black text-marigold/70">
                      T{idx + 1}
                    </span>
                  </div>
                )}
                {/* Bottom Title/Builder Ribbon */}
                <div className="relative z-10 w-full bg-hibiscus py-0.5 text-center font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] text-[#FBF6E9] shadow-md truncate px-1">
                  {m.title || "BUILDER"}
                </div>
              </div>

              {/* Name & Role */}
              <p className="mt-2.5 font-display text-xs sm:text-sm font-bold text-[#FBF6E9] text-center truncate w-full px-1">
                {m.name || `Teammate ${idx + 1}`}
              </p>
              <p className="font-mono text-[10px] sm:text-[11px] font-semibold text-marigold text-center truncate w-full px-1">
                ⚡ {m.role || "Builder"}
              </p>
              {m.stack && (
                <span className="mt-1 inline-block rounded-full bg-marigold/15 px-2 py-0.5 font-mono text-[9px] font-medium text-marigold truncate max-w-full">
                  {m.stack}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="relative z-10 border-t border-marigold/20 pt-2.5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-hibiscus px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#FBF6E9] shadow-xs shrink-0">
              {fields.memberCount} BUILDERS TEAM
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-medium text-[#FBF6E9]/90 truncate">
              {fields.tagline || "Official Goa Expedition Team"}
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-marigold drop-shadow-sm truncate pr-2">
              TEAM {fields.teamName || "ALPHA"}
            </h2>
            <span className="rounded-full bg-marigold px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold text-[#0B2118] shadow-sm shrink-0">
              #FrameInGoa
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between font-mono text-[8px] sm:text-[9px] text-[#FBF6E9]/50">
            <span>1080 × 1080 RETINA EXPORT</span>
            <span>GOA, INDIA</span>
          </div>
        </div>
      </div>
    );
  }
);
TeamFramePreview.displayName = "TeamFramePreview";

