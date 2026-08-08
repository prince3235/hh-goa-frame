"use client";

import { motion } from "framer-motion";
import { Palm } from "@/components/decor/Palm";
import { THEMES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const theme = THEMES[0];

  return (
    <section id="top" className="relative overflow-hidden bg-jungle text-sand">
      {/* Top marquee dotted strip */}
      <div className="dotted-border absolute inset-x-0 top-0 h-2 opacity-70" />

      {/* Dynamic Animated Ambient Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Warm Golden Glow Orb */}
        <div className="animate-orb-1 absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-marigold/15 blur-[100px]" />
        {/* Hibiscus Pink Glow Orb */}
        <div className="animate-orb-2 absolute -right-20 top-10 h-[450px] w-[450px] rounded-full bg-hibiscus/15 blur-[120px]" />
        {/* Soft Center Bottom Light */}
        <div className="animate-orb-3 absolute left-1/3 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-[90px]" />
      </div>

      {/* Swaying Tropical Palm Decorations */}
      <div className="pointer-events-none absolute -left-12 top-8 animate-palm-left opacity-20" aria-hidden="true">
        <Palm color="#F6C90E" className="h-72 w-72" />
      </div>
      <div className="pointer-events-none absolute -right-12 top-0 animate-palm-right opacity-15" aria-hidden="true">
        <Palm color="#E8177D" className="h-80 w-80" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-marigold">
            28–31 Oct 2026 · Goa, India
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            Get your <span className="text-marigold">HH Goa</span> identity
            <br />
            in under <span className="text-hibiscus">2 seconds</span>.
          </h1>
          <p className="mt-5 max-w-md text-lg opacity-80">
            Upload a photo, get a branded frame or Builder ID card back instantly. No login,
            no cropping, no waiting around — just download and post with{" "}
            <span className="font-semibold text-marigold">#FrameInGoa</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}>
              Start generating
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto animate-float"
        >
          <div
            className="relative flex h-72 w-72 items-center justify-center rounded-[28px] sm:h-80 sm:w-80"
            style={{ backgroundColor: theme.bg }}
          >
            <div className="dotted-border-gold absolute inset-3 rounded-[22px] opacity-70" />
            <div className="absolute inset-[18px] rounded-[18px]" style={{ backgroundColor: theme.bg }} />
            <div
              className="relative h-40 w-40 rounded-full bg-gradient-to-br from-hibiscus/60 to-marigold/60 sm:h-44 sm:w-44"
              style={{ boxShadow: `0 0 0 6px ${theme.bg}, 0 0 0 12px ${theme.ring}` }}
            />
            <div className="absolute bottom-6 rounded-full bg-hibiscus px-4 py-1.5 font-display text-xs font-semibold text-sand">
              HACKER HOUSE GOA · 2026
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
