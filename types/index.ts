export type FrameTheme = "classic" | "neon" | "beach" | "builder" | "tropical";

export type OutputFormat = "pfp" | "card" | "team";

export interface ThemeDefinition {
  id: FrameTheme;
  label: string;
  bg: string;
  ring: string;
  accent: string;
  description: string;
}

export interface BuilderFields {
  name: string;
  stack: string;
  role: string;
  title: string;
}

export interface ImageTransform {
  zoom: number; // 1.0 to 2.5
  offsetX: number; // -50 to 50 %
  offsetY: number; // -50 to 50 %
}

export interface Teammate {
  name: string;
  role: string;
  stack: string;
  title: string;
  imageUrl: string | null;
  transform: ImageTransform;
}

export interface TeamFields {
  teamName: string;
  tagline: string;
  memberCount: 2 | 3;
  members: Teammate[];
}

export interface UploadedImage {
  file: File;
  url: string;
  width: number;
  height: number;
}

