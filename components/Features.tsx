"use client";

import { motion } from "framer-motion";
import { Zap, ScanFace, Palette, Smartphone, Lock, Download } from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Near-instant", body: "Upload to finished result in seconds, not a spinner." },
  { icon: ScanFace, title: "Smart auto-center", body: "Handles portrait, landscape, and off-center crops automatically." },
  { icon: Palette, title: "5 frame themes", body: "Classic, Tropical, Beach, Neon, and Builder — swap anytime." },
  { icon: Smartphone, title: "Mobile-first", body: "Built for the phone in your pocket, not just desktop." },
  { icon: Lock, title: "No login", body: "No signup wall, no gate before you see your result." },
  { icon: Download, title: "Real PNG file", body: "High-resolution download, not a screen-only render." }
];

export function Features() {
  return (
    <section id="features" className="bg-jungle-deep/[0.03] py-20 dark:bg-white/[0.03]">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Built for the ladder</h2>
        <p className="mt-2 max-w-lg opacity-70">Everything the HH Goa 2026 task asks for, wrapped in one flow.</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="card-hover-glow rounded-2xl border-2 border-black/5 bg-white/40 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hibiscus/10 dark:bg-hibiscus/20">
                <f.icon className="h-5 w-5 text-hibiscus" />
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm opacity-70">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
