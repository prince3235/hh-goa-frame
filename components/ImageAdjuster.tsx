"use client";

import { ImageTransform } from "@/types";
import { Move, ZoomIn, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImageAdjusterProps {
  transform: ImageTransform;
  onChange: (transform: ImageTransform) => void;
}

export function ImageAdjuster({ transform, onChange }: ImageAdjusterProps) {
  const handleReset = () => {
    onChange({ zoom: 1.0, offsetX: 0, offsetY: 0 });
  };

  return (
    <div className="space-y-3 rounded-2xl border-2 border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Move className="h-4 w-4 text-marigold" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] opacity-80">
            Adjust Photo Position & Zoom
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-7 px-2 text-xs"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {/* Zoom */}
        <div>
          <label className="mb-1 flex items-center justify-between font-mono text-[11px] opacity-70">
            <span className="flex items-center gap-1">
              <ZoomIn className="h-3 w-3" /> Zoom
            </span>
            <span>{transform.zoom.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min="1.0"
            max="2.5"
            step="0.05"
            value={transform.zoom}
            onChange={(e) =>
              onChange({ ...transform, zoom: parseFloat(e.target.value) })
            }
            className="w-full accent-marigold cursor-pointer"
          />
        </div>

        {/* Pan X */}
        <div>
          <label className="mb-1 flex items-center justify-between font-mono text-[11px] opacity-70">
            <span>Position X</span>
            <span>{transform.offsetX > 0 ? `+${transform.offsetX}` : transform.offsetX}%</span>
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            step="1"
            value={transform.offsetX}
            onChange={(e) =>
              onChange({ ...transform, offsetX: parseInt(e.target.value, 10) })
            }
            className="w-full accent-marigold cursor-pointer"
          />
        </div>

        {/* Pan Y */}
        <div>
          <label className="mb-1 flex items-center justify-between font-mono text-[11px] opacity-70">
            <span>Position Y</span>
            <span>{transform.offsetY > 0 ? `+${transform.offsetY}` : transform.offsetY}%</span>
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            step="1"
            value={transform.offsetY}
            onChange={(e) =>
              onChange({ ...transform, offsetY: parseInt(e.target.value, 10) })
            }
            className="w-full accent-marigold cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
