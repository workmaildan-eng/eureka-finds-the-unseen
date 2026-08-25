# AGENTS.md

## Cursor Cloud specific instructions

This is a frontend-only Next.js 15 (App Router) marketing landing page — "Eureka Finds the Unseen". There is no backend, database, or environment variables required to run it.

### Services

There is a single service: the Next.js app. Standard scripts live in `package.json`:

- Dev server: `npm run dev` (serves on http://localhost:3000)
- Lint: `npm run lint`
- Production build: `npm run build`; production server: `npm run start`

Run the dev server in a background/tmux terminal since it is a long-running foreground process.

### Notes

- `npm install` reports a few high-severity audit warnings and an npm upgrade notice; these are informational and do not block install, lint, build, or dev.
- `next lint` prints a deprecation warning ("deprecated and will be removed in Next.js 16") but still runs and passes.
- All editable campaign copy (headlines, CTAs, product claims, KOL data, timeline, etc.) lives in `data/campaign.ts`. See `README.md` for the full content-editing guide and asset checklist.
- The site is scroll-driven (GSAP ScrollTrigger + Framer Motion). The EN / 繁中 language toggle is in the footer. Product images are placeholder paths until real assets are dropped into `/public`.
