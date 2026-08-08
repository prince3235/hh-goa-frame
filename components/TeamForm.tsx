"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TeamFields, Teammate } from "@/types";
import { UploadZone } from "@/components/UploadZone";
import { ImageAdjuster } from "@/components/ImageAdjuster";
import { Button } from "@/components/ui/Button";
import { rerollBuilderTitle } from "@/lib/builder-title";
import { Users, User, Shuffle, CheckCircle2, RotateCcw } from "lucide-react";

interface TeamFormProps {
  fields: TeamFields;
  onChange: (fields: TeamFields) => void;
  onUploadMemberPhoto: (memberIndex: number, file: File) => void;
  isProcessing: boolean;
  error: string | null;
}

export function TeamForm({
  fields,
  onChange,
  onUploadMemberPhoto,
  isProcessing,
  error
}: TeamFormProps) {
  const [activeTab, setActiveTab] = useState<number>(0); // 0, 1, 2 for members, 3 for team details

  const handleMemberCountChange = (count: 2 | 3) => {
    if (count === fields.memberCount) return;
    let newMembers = [...fields.members];
    if (count === 3 && newMembers.length < 3) {
      newMembers.push({
        name: "Teammate 3",
        role: "AI Developer",
        stack: "Python / PyTorch",
        title: "Prompt Architect",
        imageUrl: null,
        transform: { zoom: 1.0, offsetX: 0, offsetY: 0 }
      });
    } else if (count === 2 && newMembers.length > 2) {
      newMembers = newMembers.slice(0, 2);
    }
    onChange({ ...fields, memberCount: count, members: newMembers });
    if (activeTab > count) setActiveTab(count - 1);
  };

  const updateMember = (index: number, updated: Partial<Teammate>) => {
    const newMembers = [...fields.members];
    newMembers[index] = { ...newMembers[index], ...updated };
    onChange({ ...fields, members: newMembers });
  };

  const activeMember = fields.members[activeTab];

  return (
    <div className="space-y-6">
      {/* 1. Member Count Selection */}
      <div className="rounded-2xl border-2 border-black/10 bg-sand/50 p-4 dark:border-white/10 dark:bg-white/5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] opacity-70">
            How many team members?
          </span>
          <span className="rounded-full bg-hibiscus px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-sand">
            {fields.memberCount} Members Selected
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleMemberCountChange(2)}
            className={`focus-ring flex items-center justify-center gap-2 rounded-xl py-2.5 font-display text-sm font-bold transition-all ${
              fields.memberCount === 2
                ? "bg-marigold text-ink shadow-soft"
                : "border-2 border-black/10 bg-transparent opacity-70 hover:opacity-100 dark:border-white/15"
            }`}
          >
            <Users className="h-4 w-4" /> 2 Members
          </button>
          <button
            type="button"
            onClick={() => handleMemberCountChange(3)}
            className={`focus-ring flex items-center justify-center gap-2 rounded-xl py-2.5 font-display text-sm font-bold transition-all ${
              fields.memberCount === 3
                ? "bg-marigold text-ink shadow-soft"
                : "border-2 border-black/10 bg-transparent opacity-70 hover:opacity-100 dark:border-white/15"
            }`}
          >
            <Users className="h-4 w-4" /> 3 Members
          </button>
        </div>
      </div>

      {/* 2. Wizard Stepper / Member Tabs */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] opacity-60">
            Wizard Progress
          </span>
          <span className="font-mono text-xs font-bold text-marigold">
            {activeTab < fields.memberCount
              ? `Member ${activeTab + 1} of ${fields.memberCount}`
              : "Team Details"}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <motion.div
            className="h-full bg-marigold"
            animate={{
              width: `${((activeTab + 1) / (fields.memberCount + 1)) * 100}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Tab Buttons */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {fields.members.map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`focus-ring flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === idx
                  ? "bg-jungle text-sand dark:bg-marigold dark:text-ink shadow-soft"
                  : "bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100"
              }`}
            >
              <User className="h-3.5 w-3.5" />
              Member {idx + 1}
              {m.imageUrl && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setActiveTab(fields.memberCount)}
            className={`focus-ring flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === fields.memberCount
                ? "bg-hibiscus text-sand shadow-soft"
                : "bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100"
            }`}
          >
            Team Pass Info
          </button>
        </div>
      </div>

      {/* 3. Active Tab Content */}
      {activeTab < fields.memberCount && activeMember && (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">
              Teammate {activeTab + 1} Details
            </h3>
          </div>

          {/* Photo Upload / Ready State */}
          {activeMember.imageUrl ? (
            <div className="flex items-center justify-between rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 p-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-marigold">
                  {/* eslint-disable-next-html-element-suppress */}
                  <img
                    src={activeMember.imageUrl}
                    alt={activeMember.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="flex items-center gap-1 font-body text-sm font-semibold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Teammate {activeTab + 1} Photo Ready
                  </p>
                  <p className="text-[11px] opacity-70">Cropped & framed perfectly</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => updateMember(activeTab, { imageUrl: null })}
                className="text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Change Photo
              </Button>
            </div>
          ) : (
            <UploadZone
              onFile={(file) => onUploadMemberPhoto(activeTab, file)}
              error={error}
              isProcessing={isProcessing}
            />
          )}

          {/* Image Adjuster */}
          {activeMember.imageUrl && (
            <ImageAdjuster
              transform={activeMember.transform}
              onChange={(t) => updateMember(activeTab, { transform: t })}
            />
          )}

          {/* Teammate Form Inputs */}
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] opacity-60">
              Name
            </label>
            <input
              value={activeMember.name}
              maxLength={30}
              onChange={(e) => updateMember(activeTab, { name: e.target.value })}
              placeholder={`Teammate ${activeTab + 1}`}
              className="focus-ring w-full rounded-xl border-2 border-black/10 bg-transparent px-4 py-2.5 font-body outline-none dark:border-white/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                Role
              </label>
              <input
                value={activeMember.role}
                maxLength={20}
                onChange={(e) => updateMember(activeTab, { role: e.target.value })}
                placeholder="Builder"
                className="focus-ring w-full rounded-xl border-2 border-black/10 bg-transparent px-4 py-2.5 font-body outline-none dark:border-white/15"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                Stack
              </label>
              <input
                value={activeMember.stack}
                maxLength={20}
                onChange={(e) => updateMember(activeTab, { stack: e.target.value })}
                placeholder="Solana / Rust"
                className="focus-ring w-full rounded-xl border-2 border-black/10 bg-transparent px-4 py-2.5 font-body outline-none dark:border-white/15"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-hibiscus/10 px-4 py-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">Builder Title</p>
              <p className="font-display text-lg text-hibiscus">{activeMember.title}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                updateMember(activeTab, {
                  title: rerollBuilderTitle(activeMember.name || activeMember.role)
                })
              }
            >
              <Shuffle className="h-4 w-4" /> Reroll
            </Button>
          </div>
        </motion.div>
      )}

      {/* 4. Team Details Tab */}
      {activeTab === fields.memberCount && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="font-display text-lg font-bold">Official Team Pass Details</h3>

          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] opacity-60">
              Team Name
            </label>
            <input
              value={fields.teamName}
              maxLength={28}
              onChange={(e) => onChange({ ...fields, teamName: e.target.value })}
              placeholder="TEAM ALPHA"
              className="focus-ring w-full rounded-xl border-2 border-black/10 bg-transparent px-4 py-2.5 font-display text-lg font-bold text-marigold outline-none dark:border-white/15"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] opacity-60">
              Team Tagline
            </label>
            <input
              value={fields.tagline}
              maxLength={40}
              onChange={(e) => onChange({ ...fields, tagline: e.target.value })}
              placeholder="Official Goa Expedition Team"
              className="focus-ring w-full rounded-xl border-2 border-black/10 bg-transparent px-4 py-2.5 font-body outline-none dark:border-white/15"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
