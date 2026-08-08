"use client";

import { Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { BuilderFields } from "@/types";
import { Button } from "@/components/ui/Button";

interface BuilderFormProps {
  fields: BuilderFields;
  onChange: (fields: BuilderFields) => void;
  onReroll: () => void;
}

export function BuilderForm({ fields, onChange, onReroll }: BuilderFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] opacity-60">
          Name
        </label>
        <input
          id="name"
          value={fields.name}
          maxLength={40}
          onChange={(e) => onChange({ ...fields, name: e.target.value })}
          placeholder="Ada Lovelace"
          className="focus-ring w-full rounded-xl border-2 border-black/10 bg-transparent px-4 py-2.5 font-body outline-none dark:border-white/15"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="role" className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] opacity-60">
            Role
          </label>
          <input
            id="role"
            value={fields.role}
            maxLength={24}
            onChange={(e) => onChange({ ...fields, role: e.target.value })}
            placeholder="Founder"
            className="focus-ring w-full rounded-xl border-2 border-black/10 bg-transparent px-4 py-2.5 font-body outline-none dark:border-white/15"
          />
        </div>
        <div>
          <label htmlFor="stack" className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] opacity-60">
            Stack
          </label>
          <input
            id="stack"
            value={fields.stack}
            maxLength={24}
            onChange={(e) => onChange({ ...fields, stack: e.target.value })}
            placeholder="Next.js / Rust"
            className="focus-ring w-full rounded-xl border-2 border-black/10 bg-transparent px-4 py-2.5 font-body outline-none dark:border-white/15"
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-hibiscus/10 px-4 py-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">Builder title</p>
          <motion.p
            key={fields.title}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-lg text-hibiscus"
          >
            {fields.title}
          </motion.p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onReroll} aria-label="Generate a new builder title">
          <Shuffle className="h-4 w-4" /> Reroll
        </Button>
      </div>
    </div>
  );
}
