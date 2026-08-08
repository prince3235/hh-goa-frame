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
        className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-sand p-6 text-jungle shadow-2xl transition-all duration-300 dark:bg-sand dark:text-jungle border-4 border-jungle"
      >
        {/* Palm frond decoration top right */}
        <div className="pointer-events-none absolute -right-6 -top-6 opacity-30">
          <Palm color="#0F4C33" className="h-44 w-44" />
        </div>

        {/* Live Badge top right */}
        <div className="absolute right-6 top-6 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-jungle/90 px-3 py-1 text-[11px] font-bold text-sand shadow-sm">
            <span className="h-2 w-2 rounded-full bg-marigold animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jungle font-display text-xs font-bold text-marigold">
              H
            </span>
            <h3 className="font-display text-xl font-extrabold tracking-tight text-jungle">
              HACKER HOUSE GOA
            </h3>
          </div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-jungle/60">
            OFFICIAL TEAM PASS · 2026
          </p>
        </div>

        {/* Center: Team Member Arched Cards */}
        <div className="relative z-10 my-auto grid gap-4 py-2" style={{ gridTemplateColumns: `repeat(${fields.memberCount}, minmax(0, 1fr))` }}>
          {members.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Arched Photo Frame */}
              <div className="relative flex h-36 w-full max-w-[130px] flex-col items-center justify-end overflow-hidden rounded-t-[45px] rounded-b-[16px] border-4 border-jungle bg-jungle-deep shadow-md sm:h-44 sm:max-w-[150px]">
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
                  <div className="flex h-full w-full items-center justify-center bg-jungle/80 text-sand">
                    <span className="font-display text-3xl font-extrabold text-marigold opacity-80">
                      T{idx + 1}
                    </span>
                  </div>
                )}
                {/* Bottom Builder Pill Label */}
                <div className="relative z-10 w-full bg-jungle/90 py-1 text-center font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-marigold">
                  BUILDER
                </div>
              </div>

              {/* Name & Role */}
              <p className="mt-2 font-display text-sm font-extrabold text-jungle text-center truncate max-w-[140px]">
                {m.name || `Teammate ${idx + 1}`}
              </p>
              <p className="font-mono text-[10px] font-semibold text-hibiscus text-center truncate max-w-[140px]">
                ⚡ {m.role || "Builder"}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t-2 border-jungle/10 pt-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-marigold px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-ink shadow-xs">
              {fields.memberCount} BUILDERS TEAM
            </span>
            <span className="font-mono text-[11px] font-semibold text-jungle/70 truncate">
              {fields.tagline || "Official Goa Expedition Team"}
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-jungle">
              TEAM {fields.teamName || "ALPHA"}
            </h2>
            <span className="rounded-full bg-hibiscus px-3 py-0.5 font-mono text-[11px] font-bold text-sand">
              #FrameInGoa
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between font-mono text-[9px] opacity-60">
            <span>1080 × 1080 RETINA EXPORT</span>
            <span>GOA, INDIA</span>
          </div>
        </div>
      </div>
    );
  }
);
TeamFramePreview.displayName = "TeamFramePreview";
