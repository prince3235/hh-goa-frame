import { ThemeDefinition } from "@/types";

export const THEMES: ThemeDefinition[] = [
  {
    id: "classic",
    label: "Classic",
    bg: "#0F4C33",
    ring: "#F6C90E",
    accent: "#E8177D",
    description: "Jungle green + marigold seal, the OG HH Goa look."
  },
  {
    id: "tropical",
    label: "Tropical",
    bg: "#0A3A27",
    ring: "#F6C90E",
    accent: "#E8177D",
    description: "Palm fronds and hibiscus, straight off the veranda."
  },
  {
    id: "beach",
    label: "Beach",
    bg: "#0F4C33",
    ring: "#FBF6E9",
    accent: "#F6C90E",
    description: "Sunset over Goa beach, cream ring."
  },
  {
    id: "neon",
    label: "Neon",
    bg: "#0A3A27",
    ring: "#E8177D",
    accent: "#F6C90E",
    description: "High-contrast hibiscus ring for night-mode profiles."
  },
  {
    id: "builder",
    label: "Builder",
    bg: "#0B2118",
    ring: "#F6C90E",
    accent: "#E8177D",
    description: "The ID-card theme — used automatically for Builder ID."
  }
];

export const HASHTAG = "#FrameInGoa";

export const SHARE_CAPTIONS = [
  "Just generated my HH Goa 2026 frame in seconds \u{1F334} building something new for #FrameInGoa",
  "Got my Hacker House Goa 2026 identity locked in \u{1F3DD}\u{FE0F} #FrameInGoa",
  "Shipping my #FrameInGoa entry — see you in Goa, 28-31 Oct 2026 \u{1F30A}"
];

export const BUILDER_TITLE_ADJECTIVES = [
  "Prompt", "Bug", "AI", "Backend", "Frontend", "Cloud", "Full-Stack",
  "Pixel", "Ship-It", "Night-Owl", "Chaos", "Type-Safe", "Latency", "Edge"
];

export const BUILDER_TITLE_NOUNS = [
  "Wizard", "Hunter", "Alchemist", "Ninja", "Magician", "Captain",
  "Whisperer", "Gremlin", "Architect", "Ranger", "Sorcerer", "Pilot", "Smith"
];
