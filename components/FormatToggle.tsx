"use client";

import { motion } from "framer-motion";
import { OutputFormat } from "@/types";
import { cn } from "@/lib/utils";

interface FormatToggleProps {
  value: OutputFormat;
  onChange: (format: OutputFormat) => void;
}

const OPTIONS: { id: OutputFormat; label: string; sub: string }[] = [
  { id: "pfp", label: "PFP Frame", sub: "Circular profile picture" },
  { id: "card", label: "Builder ID", sub: "Name + stack + title card" }
];

export function FormatToggle({ value, onChange }: FormatToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Output format"
      className="relative grid grid-cols-2 gap-1 rounded-full bg-black/5 p-1 dark:bg-white/5"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          role="tab"
          aria-selected={value === opt.id}
          onClick={() => onChange(opt.id)}
          className="focus-ring relative z-10 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors"
        >
          {value === opt.id && (
            <motion.span
              layoutId="format-pill"
              className="absolute inset-0 -z-10 rounded-full bg-jungle shadow-soft dark:bg-marigold"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className={cn(value === opt.id ? "text-sand dark:text-ink" : "opacity-70")}>
            {opt.label}
          </span>
          <span className="block text-[10px] font-normal opacity-60">{opt.sub}</span>
        </button>
      ))}
    </div>
  );
}
