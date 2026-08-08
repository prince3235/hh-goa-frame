import { BUILDER_TITLE_ADJECTIVES, BUILDER_TITLE_NOUNS } from "@/lib/constants";

/**
 * Deterministically generates a fun "builder title" from a name + stack string
 * so the same inputs always produce the same title (feels intentional, not random-mash).
 */
export function generateBuilderTitle(seed: string): string {
  const clean = seed.trim().toLowerCase() || "builder";
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) >>> 0;
  }
  const adjective = BUILDER_TITLE_ADJECTIVES[hash % BUILDER_TITLE_ADJECTIVES.length];
  const noun = BUILDER_TITLE_NOUNS[Math.floor(hash / 7) % BUILDER_TITLE_NOUNS.length];
  return `${adjective} ${noun}`;
}

export function rerollBuilderTitle(seed: string): string {
  // add a time-based salt so the user can "shuffle" to a new title on demand
  return generateBuilderTitle(seed + Date.now().toString());
}
