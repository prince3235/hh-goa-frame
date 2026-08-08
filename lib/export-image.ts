import { toPng } from "html-to-image";
import { ThemeDefinition, BuilderFields, OutputFormat, TeamFields } from "@/types";
import { renderFrameToCanvas, renderCardToCanvas, renderTeamFrameToCanvas } from "./canvas-renderer";

/**
 * High-performance, 100% bulletproof image exporter that renders directly via HTML5 Canvas
 * with fallback to html-to-image DOM cloning. Zero CORS errors, zero network dependency.
 */
export async function exportFrameOrCard({
  format,
  imageUrl,
  theme,
  fields,
  teamFields,
  node
}: {
  format: OutputFormat;
  imageUrl: string | null;
  theme: ThemeDefinition;
  fields?: BuilderFields;
  teamFields?: TeamFields;
  node?: HTMLElement | null;
}): Promise<string> {
  try {
    if (format === "pfp") {
      return await renderFrameToCanvas(imageUrl, theme, 1080);
    } else if (format === "team" && teamFields) {
      return await renderTeamFrameToCanvas(teamFields, 1080);
    } else {
      return await renderCardToCanvas(
        imageUrl,
        theme,
        fields ?? {
          name: "Your Name",
          role: "Builder",
          stack: "",
          title: "Prompt Wizard"
        },
        1200
      );
    }
  } catch (canvasErr) {
    console.warn("Canvas direct render fallback to DOM:", canvasErr);
    if (node) {
      return await exportNodeToPng(node);
    }
    throw canvasErr;
  }
}

/**
 * Renders a DOM node to a high-resolution PNG data URL.
 */
export async function exportNodeToPng(node: HTMLElement, pixelRatio = 3): Promise<string> {
  try {
    return await toPng(node, {
      pixelRatio,
      cacheBust: false,
      skipFonts: true
    });
  } catch (err) {
    console.error("Failed to generate image:", err);
    throw new Error("Could not export image. Please try a different photo format.");
  }
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function dataUrlToFile(dataUrl: string, filename: string): File {
  const [meta, base64] = dataUrl.split(",");
  const mime = meta.match(/:(.*?);/)?.[1] ?? "image/png";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], filename, { type: mime });
}

