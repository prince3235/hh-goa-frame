import { ThemeDefinition, BuilderFields, TeamFields } from "@/types";

/**
 * Loads an image from a URL into an HTMLImageElement safely.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image for rendering"));
    img.src = src;
  });
}

/**
 * Helper to draw a rounded rectangle path.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Helper to draw a dotted border around a rectangular perimeter.
 */
function drawDottedBorder(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  dotRadius = 2.5,
  gap = 14
) {
  ctx.save();
  ctx.fillStyle = color;

  // Top & Bottom edges
  for (let curX = x + gap; curX <= x + w - gap; curX += gap) {
    ctx.beginPath();
    ctx.arc(curX, y, dotRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(curX, y + h, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Left & Right edges
  for (let curY = y + gap; curY <= y + h - gap; curY += gap) {
    ctx.beginPath();
    ctx.arc(x, curY, dotRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + w, curY, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draws palm fronds using vector paths.
 */
function drawPalm(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  color: string,
  flip = false,
  alpha = 0.9
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flip ? -scale : scale, scale);
  ctx.globalAlpha = alpha;

  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  // Stem
  ctx.beginPath();
  ctx.moveTo(50, 140);
  ctx.lineTo(50, 70);
  ctx.stroke();

  // Fronds
  const drawFrond = (
    c1x: number,
    c1y: number,
    c2x: number,
    c2y: number,
    ex: number,
    ey: number,
    frondAlpha: number
  ) => {
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha * frondAlpha;
    ctx.beginPath();
    ctx.moveTo(50, 75);
    ctx.bezierCurveTo(c1x, c1y, c2x, c2y, ex, ey);
    ctx.bezierCurveTo(c2x + 10, c2y, 50, 65, 50, 60);
    ctx.fill();
  };

  drawFrond(20, 60, 8, 30, 8, 30, 0.9);
  drawFrond(80, 60, 92, 30, 92, 30, 0.9);
  drawFrond(25, 45, 22, 18, 22, 18, 0.7);
  drawFrond(75, 45, 78, 18, 78, 18, 0.7);
  drawFrond(44, 30, 30, 8, 30, 8, 0.55);
  drawFrond(56, 30, 70, 8, 70, 8, 0.55);

  ctx.restore();
}

/**
 * Renders the circular profile frame (X Profile Picture) directly to Canvas.
 */
export async function renderFrameToCanvas(
  imageUrl: string | null,
  theme: ThemeDefinition,
  size = 1080
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not get 2D canvas context");

  // 1. Base card container with rounded corners
  const radius = size * 0.058; // ~63px for 1080
  ctx.save();
  roundRect(ctx, 0, 0, size, size, radius);
  ctx.clip();

  // Background color
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, size, size);

  // Radial ambient gradient
  const grad = ctx.createRadialGradient(
    size / 2,
    size * 0.3,
    10,
    size / 2,
    size * 0.3,
    size * 0.6
  );
  grad.addColorStop(0, `${theme.ring}33`);
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // 2. Dotted border
  const borderInset = size * 0.032;
  drawDottedBorder(
    ctx,
    borderInset,
    borderInset,
    size - borderInset * 2,
    size - borderInset * 2,
    theme.ring,
    size * 0.0035,
    size * 0.02
  );

  // 3. Inner card fill (for clean layered look)
  const innerInset = size * 0.045;
  roundRect(
    ctx,
    innerInset,
    innerInset,
    size - innerInset * 2,
    size - innerInset * 2,
    radius * 0.8
  );
  ctx.fillStyle = theme.bg;
  ctx.fill();

  // 4. Palms (if applicable theme)
  const showPalms =
    theme.id === "tropical" || theme.id === "beach" || theme.id === "classic";
  if (showPalms) {
    const palmScale = size * 0.0016;
    drawPalm(ctx, size * 0.04, size * 0.06, palmScale, theme.ring, true, 0.9);
    drawPalm(ctx, size * 0.8, size * 0.06, palmScale, theme.ring, false, 0.9);
  }

  // 5. User Photo in center circle
  const photoDiameter = size * 0.58;
  const photoRadius = photoDiameter / 2;
  const photoCenterX = size / 2;
  const photoCenterY = size * 0.45;

  // Shadow for photo
  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + 6, 0, Math.PI * 2);
  ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
  ctx.shadowBlur = size * 0.04;
  ctx.shadowOffsetY = size * 0.02;
  ctx.fillStyle = theme.bg;
  ctx.fill();
  ctx.restore();

  // Outer ring border
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + size * 0.022, 0, Math.PI * 2);
  ctx.fillStyle = theme.ring;
  ctx.fill();

  // Inner ring gap
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + size * 0.011, 0, Math.PI * 2);
  ctx.fillStyle = theme.bg;
  ctx.fill();

  // Clipped photo
  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius, 0, Math.PI * 2);
  ctx.clip();

  if (imageUrl) {
    try {
      const img = await loadImage(imageUrl);
      // Center-crop image calculation
      const scale = Math.max(photoDiameter / img.width, photoDiameter / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const drawX = photoCenterX - drawWidth / 2;
      const drawY = photoCenterY - drawHeight / 2;
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    } catch {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(
        photoCenterX - photoRadius,
        photoCenterY - photoRadius,
        photoDiameter,
        photoDiameter
      );
    }
  } else {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(
      photoCenterX - photoRadius,
      photoCenterY - photoRadius,
      photoDiameter,
      photoDiameter
    );
  }
  ctx.restore();

  // 6. Bottom Ribbon Badge
  const ribbonText = "HACKER HOUSE GOA · 2026";
  const ribbonFontSize = Math.round(size * 0.038);
  ctx.font = `700 ${ribbonFontSize}px var(--font-display), "Fraunces", "Georgia", serif`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  const textMetrics = ctx.measureText(ribbonText);
  const ribbonPaddingX = size * 0.045;
  const ribbonHeight = ribbonFontSize * 2.2;
  const ribbonWidth = textMetrics.width + ribbonPaddingX * 2;
  const ribbonX = size / 2 - ribbonWidth / 2;
  const ribbonY = size * 0.88 - ribbonHeight / 2;

  // Ribbon pill shape
  roundRect(ctx, ribbonX, ribbonY, ribbonWidth, ribbonHeight, ribbonHeight / 2);
  ctx.fillStyle = theme.accent;
  ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  ctx.fill();
  ctx.shadowColor = "transparent";

  // Ribbon text
  ctx.fillStyle = "#FBF6E9";
  ctx.fillText(ribbonText, size / 2, ribbonY + ribbonHeight / 2 + 1);

  ctx.restore();
  return canvas.toDataURL("image/png");
}

/**
 * Renders the Builder ID card directly to Canvas.
 */
export async function renderCardToCanvas(
  imageUrl: string | null,
  theme: ThemeDefinition,
  fields: BuilderFields,
  width = 1200
): Promise<string> {
  const height = Math.round(width / 1.586);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not get 2D canvas context");

  const radius = width * 0.038;

  ctx.save();
  roundRect(ctx, 0, 0, width, height, radius);
  ctx.clip();

  // 1. Background
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, width, height);

  // Radial highlight
  const grad = ctx.createRadialGradient(
    width * 0.85,
    0,
    10,
    width * 0.85,
    0,
    width * 0.65
  );
  grad.addColorStop(0, `${theme.accent}33`);
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Palm Frond Watermark in corner
  drawPalm(ctx, width * 0.82, height * 0.45, width * 0.0028, theme.ring, false, 0.18);

  // 3. Dotted border
  const borderInset = width * 0.016;
  drawDottedBorder(
    ctx,
    borderInset,
    borderInset,
    width - borderInset * 2,
    height - borderInset * 2,
    theme.ring,
    width * 0.0025,
    width * 0.018
  );

  // 4. Header row
  const marginX = width * 0.06;
  const marginTop = height * 0.09;

  // "BUILDER ID"
  ctx.font = `600 ${Math.round(width * 0.018)}px var(--font-mono), "IBM Plex Mono", monospace`;
  ctx.fillStyle = theme.ring;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("BUILDER ID", marginX, marginTop);

  // "Hacker House Goa"
  const titleFontSize = Math.round(width * 0.036);
  ctx.font = `700 ${titleFontSize}px var(--font-display), "Fraunces", "Georgia", serif`;
  ctx.fillStyle = "#FBF6E9";
  const hhText = "Hacker House ";
  ctx.fillText(hhText, marginX, marginTop + width * 0.024);

  const hhWidth = ctx.measureText(hhText).width;
  ctx.fillStyle = theme.accent;
  ctx.fillText("Goa", marginX + hhWidth, marginTop + width * 0.024);

  // Date Tag pill
  const dateText = "28–31 OCT 2026";
  const dateFontSize = Math.round(width * 0.016);
  ctx.font = `500 ${dateFontSize}px var(--font-mono), "IBM Plex Mono", monospace`;
  const dateMetrics = ctx.measureText(dateText);
  const datePillW = dateMetrics.width + width * 0.03;
  const datePillH = dateFontSize * 2.2;
  const datePillX = width - marginX - datePillW;
  const datePillY = marginTop + width * 0.005;

  roundRect(ctx, datePillX, datePillY, datePillW, datePillH, datePillH / 2);
  ctx.strokeStyle = theme.ring;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = theme.ring;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(dateText, datePillX + datePillW / 2, datePillY + datePillH / 2 + 1);

  // 5. Body section: Photo & Info
  const photoSize = height * 0.44;
  const photoX = marginX;
  const photoY = height * 0.4;
  const photoRadius = width * 0.024;

  // Photo border & container
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, photoX, photoY, photoSize, photoSize, photoRadius);
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = theme.bg;
  ctx.fill();
  ctx.shadowColor = "transparent";

  // Outer border ring
  ctx.strokeStyle = theme.ring;
  ctx.lineWidth = width * 0.009;
  roundRect(
    ctx,
    photoX - ctx.lineWidth / 2,
    photoY - ctx.lineWidth / 2,
    photoSize + ctx.lineWidth,
    photoSize + ctx.lineWidth,
    photoRadius + 2
  );
  ctx.stroke();

  // Photo image clipping
  roundRect(ctx, photoX, photoY, photoSize, photoSize, photoRadius);
  ctx.clip();

  if (imageUrl) {
    try {
      const img = await loadImage(imageUrl);
      const scale = Math.max(photoSize / img.width, photoSize / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const drawX = photoX + (photoSize - drawWidth) / 2;
      const drawY = photoY + (photoSize - drawHeight) / 2;
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    } catch {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(photoX, photoY, photoSize, photoSize);
    }
  } else {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(photoX, photoY, photoSize, photoSize);
  }
  ctx.restore();

  // Info Column
  const infoX = photoX + photoSize + width * 0.045;
  const infoY = photoY + height * 0.02;

  // Name
  const nameFontSize = Math.round(width * 0.05);
  ctx.font = `700 ${nameFontSize}px var(--font-display), "Fraunces", "Georgia", serif`;
  ctx.fillStyle = "#FBF6E9";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const displayName = fields.name || "Your Name";
  ctx.fillText(displayName, infoX, infoY);

  // Role & Stack
  const roleFontSize = Math.round(width * 0.022);
  ctx.font = `500 ${roleFontSize}px var(--font-mono), "IBM Plex Mono", monospace`;
  ctx.fillStyle = theme.ring;
  const roleText = `${fields.role || "Builder"}${fields.stack ? ` · ${fields.stack}` : ""}`;
  ctx.fillText(roleText, infoX, infoY + nameFontSize * 1.2);

  // Title Badge Pill
  const titleText = fields.title || "Prompt Wizard";
  const badgeFontSize = Math.round(width * 0.02);
  ctx.font = `600 ${badgeFontSize}px var(--font-body), "Space Grotesk", sans-serif`;
  const badgeMetrics = ctx.measureText(titleText);
  const badgePaddingX = width * 0.024;
  const badgeHeight = badgeFontSize * 2.1;
  const badgeWidth = badgeMetrics.width + badgePaddingX * 2;
  const badgeY = infoY + nameFontSize * 1.2 + roleFontSize * 1.7;

  roundRect(ctx, infoX, badgeY, badgeWidth, badgeHeight, badgeHeight / 2);
  ctx.fillStyle = theme.accent;
  ctx.fill();

  ctx.fillStyle = "#FBF6E9";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(titleText, infoX + badgeWidth / 2, badgeY + badgeHeight / 2 + 1);

  // 6. Footer row
  const footerY = height - marginTop * 0.8;
  const footerFontSize = Math.round(width * 0.016);
  ctx.font = `500 ${footerFontSize}px var(--font-mono), "IBM Plex Mono", monospace`;
  ctx.fillStyle = `${theme.ring}B3`;

  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("#FrameInGoa", marginX, footerY);

  ctx.textAlign = "right";
  ctx.fillText("GOA, INDIA", width - marginX, footerY);

  ctx.restore();
  return canvas.toDataURL("image/png");
}

/**
 * Renders the official Team Pass card directly to Canvas.
 */
export async function renderTeamFrameToCanvas(
  fields: TeamFields,
  size = 1080
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not get 2D canvas context");

  const radius = size * 0.045;

  ctx.save();
  roundRect(ctx, 0, 0, size, size, radius);
  ctx.clip();

  // 1. Background
  ctx.fillStyle = "#FBF6E9"; // Sand
  ctx.fillRect(0, 0, size, size);

  // Border frame
  ctx.strokeStyle = "#0F4C33";
  ctx.lineWidth = 10;
  roundRect(ctx, 5, 5, size - 10, size - 10, radius);
  ctx.stroke();

  // Palm frond watermark in top right
  drawPalm(ctx, size * 0.88, size * 0.12, size * 0.0022, "#0F4C33", false, 0.25);

  // 2. Top Header
  const marginX = size * 0.06;
  const marginTop = size * 0.08;

  // Title: "HACKER HOUSE GOA"
  ctx.font = `800 ${Math.round(size * 0.038)}px var(--font-display), "Fraunces", serif`;
  ctx.fillStyle = "#0F4C33";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("HACKER HOUSE GOA", marginX, marginTop);

  // Subtitle: "OFFICIAL TEAM PASS · 2026"
  ctx.font = `600 ${Math.round(size * 0.018)}px var(--font-mono), "IBM Plex Mono", monospace`;
  ctx.fillStyle = "rgba(15, 76, 51, 0.7)";
  ctx.fillText("OFFICIAL TEAM PASS · 2026", marginX, marginTop + size * 0.048);

  // Live pill tag top right
  const liveX = size - marginX - size * 0.12;
  const liveY = marginTop;
  const liveW = size * 0.12;
  const liveH = size * 0.04;
  roundRect(ctx, liveX, liveY, liveW, liveH, liveH / 2);
  ctx.fillStyle = "#0F4C33";
  ctx.fill();

  ctx.fillStyle = "#F6C90E"; // Marigold dot
  ctx.beginPath();
  ctx.arc(liveX + liveW * 0.25, liveY + liveH / 2, size * 0.007, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = `700 ${Math.round(size * 0.016)}px var(--font-mono), monospace`;
  ctx.fillStyle = "#FBF6E9";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("LIVE", liveX + liveW * 0.62, liveY + liveH / 2 + 1);

  // 3. Middle Team Members (2 or 3)
  const count = fields.memberCount;
  const members = fields.members.slice(0, count);

  const cardContainerWidth = size - marginX * 2;
  const cardGap = size * 0.04;
  const cardW = (cardContainerWidth - cardGap * (count - 1)) / count;
  const cardH = size * 0.38;
  const cardY = size * 0.28;

  for (let i = 0; i < count; i++) {
    const m = members[i];
    const cardX = marginX + i * (cardW + cardGap);

    // Arched Top Container
    ctx.save();
    const archRadius = cardW * 0.35;
    ctx.beginPath();
    ctx.moveTo(cardX, cardY + cardH);
    ctx.lineTo(cardX, cardY + archRadius);
    ctx.quadraticCurveTo(cardX, cardY, cardX + archRadius, cardY);
    ctx.lineTo(cardX + cardW - archRadius, cardY);
    ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + archRadius);
    ctx.lineTo(cardX + cardW, cardY + cardH);
    ctx.closePath();

    ctx.fillStyle = "#0A3A27";
    ctx.fill();

    ctx.strokeStyle = "#0F4C33";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.clip();

    // Draw Teammate Photo with transforms
    if (m.imageUrl) {
      try {
        const img = await loadImage(m.imageUrl);
        const userZoom = m.transform?.zoom || 1.0;
        const offsetX = (m.transform?.offsetX || 0) * 0.01 * cardW;
        const offsetY = (m.transform?.offsetY || 0) * 0.01 * cardH;

        const baseScale = Math.max(cardW / img.width, cardH / img.height);
        const finalScale = baseScale * userZoom;

        const drawWidth = img.width * finalScale;
        const drawHeight = img.height * finalScale;
        const drawX = cardX + (cardW - drawWidth) / 2 + offsetX;
        const drawY = cardY + (cardH - drawHeight) / 2 + offsetY;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      } catch {
        ctx.fillStyle = "#0A3A27";
        ctx.fillRect(cardX, cardY, cardW, cardH);
      }
    } else {
      ctx.fillStyle = "#0F4C33";
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.font = `800 ${Math.round(cardW * 0.28)}px var(--font-display), serif`;
      ctx.fillStyle = "#F6C90E";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`T${i + 1}`, cardX + cardW / 2, cardY + cardH / 2);
    }

    // Bottom "BUILDER" badge on photo
    const bBadgeH = size * 0.03;
    const bBadgeY = cardY + cardH - bBadgeH;
    ctx.fillStyle = "rgba(15, 76, 51, 0.95)";
    ctx.fillRect(cardX, bBadgeY, cardW, bBadgeH);

    ctx.font = `700 ${Math.round(size * 0.014)}px var(--font-mono), monospace`;
    ctx.fillStyle = "#F6C90E";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("BUILDER", cardX + cardW / 2, bBadgeY + bBadgeH / 2 + 1);

    ctx.restore();

    // Teammate Name & Role below card
    const textY = cardY + cardH + size * 0.025;
    const nameFontSize = Math.round(size * 0.024);
    ctx.font = `800 ${nameFontSize}px var(--font-display), "Fraunces", serif`;
    ctx.fillStyle = "#0F4C33";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(m.name || `Teammate ${i + 1}`, cardX + cardW / 2, textY);

    const roleFontSize = Math.round(size * 0.016);
    ctx.font = `600 ${roleFontSize}px var(--font-mono), "IBM Plex Mono", monospace`;
    ctx.fillStyle = "#E8177D";
    ctx.fillText(`⚡ ${m.role || "Builder"}`, cardX + cardW / 2, textY + nameFontSize * 1.3);
  }

  // 4. Footer Section
  const footerY = size * 0.78;

  // Horizontal divider line
  ctx.strokeStyle = "rgba(15, 76, 51, 0.15)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(marginX, footerY);
  ctx.lineTo(size - marginX, footerY);
  ctx.stroke();

  // Tagline & Team Pill
  const taglineY = footerY + size * 0.02;
  const pillW = size * 0.22;
  const pillH = size * 0.035;
  roundRect(ctx, marginX, taglineY, pillW, pillH, pillH / 2);
  ctx.fillStyle = "#F6C90E";
  ctx.fill();

  ctx.font = `800 ${Math.round(size * 0.014)}px var(--font-mono), monospace`;
  ctx.fillStyle = "#0B2118";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${count} BUILDERS TEAM`, marginX + pillW / 2, taglineY + pillH / 2 + 1);

  ctx.font = `600 ${Math.round(size * 0.018)}px var(--font-mono), monospace`;
  ctx.fillStyle = "rgba(15, 76, 51, 0.75)";
  ctx.textAlign = "left";
  ctx.fillText(
    fields.tagline || "Official Goa Expedition Team",
    marginX + pillW + size * 0.02,
    taglineY + pillH / 2 + 1
  );

  // Big Team Name
  const teamTitleY = taglineY + pillH + size * 0.02;
  const teamTitleSize = Math.round(size * 0.052);
  ctx.font = `900 ${teamTitleSize}px var(--font-display), "Fraunces", serif`;
  ctx.fillStyle = "#0F4C33";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`TEAM ${fields.teamName || "ALPHA"}`, marginX, teamTitleY);

  // #FrameInGoa Hashtag Pill
  const hashText = "#FrameInGoa";
  ctx.font = `700 ${Math.round(size * 0.018)}px var(--font-mono), monospace`;
  const hashW = ctx.measureText(hashText).width + size * 0.04;
  const hashH = size * 0.04;
  const hashX = size - marginX - hashW;
  const hashY = teamTitleY + size * 0.01;

  roundRect(ctx, hashX, hashY, hashW, hashH, hashH / 2);
  ctx.fillStyle = "#E8177D";
  ctx.fill();

  ctx.fillStyle = "#FBF6E9";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(hashText, hashX + hashW / 2, hashY + hashH / 2 + 1);

  // Bottom Footer Meta
  const metaY = size - size * 0.04;
  ctx.font = `600 ${Math.round(size * 0.015)}px var(--font-mono), monospace`;
  ctx.fillStyle = "rgba(15, 76, 51, 0.6)";

  ctx.textAlign = "left";
  ctx.fillText("1080 × 1080 RETINA EXPORT", marginX, metaY);

  ctx.textAlign = "right";
  ctx.fillText("GOA, INDIA", size - marginX, metaY);

  ctx.restore();
  return canvas.toDataURL("image/png");
}

