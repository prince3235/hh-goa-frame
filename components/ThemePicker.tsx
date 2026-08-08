"use client";

import { THEMES } from "@/lib/constants";
import { FrameTheme } from "@/types";
import { cn } from "@/lib/utils";

interface ThemePickerProps {
  value: FrameTheme;
  onChange: (theme: FrameTheme) => void;
}

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] opacity-60">Frame theme</p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Frame theme">
        {THEMES.map((t) => (
          <button
            key={t.id}
            role="radio"
            aria-checked={value === t.id}
            title={t.description}
            onClick={() => onChange(t.id)}
            className={cn(
              "focus-ring flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-all",
              value === t.id
                ? "border-hibiscus bg-hibiscus/10"
                : "border-transparent bg-black/5 dark:bg-white/5 hover:border-hibiscus/40"
            )}
          >
            <span
              className="h-3 w-3 rounded-full ring-2 ring-offset-1 ring-offset-transparent"
              style={{ backgroundColor: t.ring, boxShadow: `0 0 0 2px ${t.bg}` }}
            />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
