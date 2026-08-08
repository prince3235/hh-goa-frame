# HH Goa 2026 — Frame & Builder ID Generator

Upload a photo → get a Hacker House Goa 2026 branded profile frame or Builder ID
card in seconds. No login, no manual cropping, one-click download, one-click
share to X with `#FrameInGoa` pre-filled.

Built for the HH Goa 2026 shortlisting task.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion ·
`html-to-image` for client-side, high-resolution PNG export · Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables needed.
4. Deploy — you'll get a live `https://your-project.vercel.app` URL.

Or from the CLI:

```bash
npm i -g vercel
vercel --prod
```

## How it works

- `components/FramePreview.tsx` — Format A, circular PFP frame with 5 swappable
  themes defined in `lib/constants.ts`.
- `components/BuilderCard.tsx` — Format B, event-badge style ID card with name /
  stack / role and an auto-generated "builder title" (`lib/builder-title.ts`).
- `lib/export-image.ts` — renders the on-screen preview node to a real,
  high-resolution PNG (`html-to-image`), so download/share always produce an
  actual downloadable file, never a screen-only render.
- `components/ResultActions.tsx` — Download button, and Share to X which uses
  the Web Share API (attaches the image directly on supporting mobile
  browsers) with a fallback that downloads the PNG and opens a pre-filled
  tweet composer with the `#FrameInGoa` hashtag.
- Photos are auto-centered with `object-fit: cover` inside the frame shape, so
  portrait, landscape, and off-center photos all work without manual cropping.

## Submitting the task

Don't forget: post your generated result on X with `#FrameInGoa`, then submit
the live link + the X post at the official form linked in the site footer.
