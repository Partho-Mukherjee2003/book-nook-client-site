<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook — Agent Notes

## Stack & structure

- Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4. Use npm (`package-lock.json`).
- Entry points: `src/app/layout.tsx` renders `Navbar`, the page, then `Footer`; `src/app/page.tsx` is the only route.
- Custom components live in `src/components`; shadcn primitives in `src/components/ui`; hooks in `src/hooks`; helpers in `src/lib`. Path alias: `@/*` → `src/*`.
- This is currently UI-only: no API routes, data layer, or tests. Navbar destinations such as `/books`, `/books/add`, `/my-books`, and `/my-borrows` are placeholders.

## Commands

- `npm run dev` — start the dev server. If Next reports another server is already running, use that existing server instead of launching a duplicate.
- `npm run lint` — full lint currently fails on two pre-existing generated files: `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`). Use `npx eslint <changed-files>` for focused verification; don’t “fix” those generated files unless the task requires it.
- `npx tsc --noEmit` — typecheck; currently passes.
- `npm run build` — production build.
- No test runner or test script is configured; don’t invent one.

## Styling

- Tailwind v4 has no JS config and no `tailwind.config.*`; theme tokens live in `src/app/globals.css` under `@theme inline`.
- Brand palette: forest `#166534`, amber `#D97706`, off-white `#FDFBF7`, charcoal `#1F2937`; secondary footer text is `text-gray-200`.
- shadcn is configured for Base UI (`@base-ui/react`), not Radix. Prefer existing `src/components/ui` primitives over hand-rolling standard controls.
- `src/lib/utils.ts` re-exports `cn`; generated UI files import `cn` from the `cn` package directly.

## Framework quirks

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and React Compiler. `partialPrefetching` requires `cacheComponents`; keep them together.
- `Navbar` is a client component because of its mobile menu. `Banner` is a client component using Swiper 14 (`swiper/react`, `swiper/modules`, `swiper/css`). `Footer` is presentational/server.
- A separate shadcn/Embla carousel exists; keep Swiper for the banner unless intentionally migrating.
- `next-env.d.ts` and `.next/**` types are generated. Don’t edit them; `LayoutProps<"/">` is a Next-generated global type.
