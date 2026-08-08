export type FrameTheme = "classic" | "neon" | "beach" | "builder" | "tropical";

export type OutputFormat = "pfp" | "card";

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

export interface UploadedImage {
  file: File;
  url: string;
  width: number;
  height: number;
}
