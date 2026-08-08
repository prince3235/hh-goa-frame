"use client";

import { motion } from "framer-motion";
import { Upload, Wand2, Share2 } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Upload your photo",
    body: "Drag in any JPG, PNG, or HEIC — portrait, landscape, off-center, doesn't matter. No manual cropping."
  },
  {
    icon: Wand2,
    title: "Pick a theme",
    body: "Choose Classic, Neon, Beach, Tropical, or the Builder card. The frame engine handles the rest."
  },
  {
    icon: Share2,
    title: "Download & share",
    body: "Get a high-res PNG instantly, then post to X with #FrameInGoa pre-filled in one tap."
  }
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="font-display text-3xl font-bold sm:text-4xl">How it works</h2>
      <p className="mt-2 max-w-lg opacity-70">Three steps, start to finish, no account required.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-hover-glow rounded-2xl border border-black/5 bg-white/70 p-6 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-jungle text-marigold dark:bg-marigold dark:text-jungle">
              <step.icon className="h-5 w-5" />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-50">Step 0{i + 1}</p>
            <h3 className="mt-1 font-display text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm opacity-70">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
