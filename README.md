# HeritageVerse

AI-powered heritage tourism platform built with TanStack Start, React 19, Tailwind CSS v4, and Supabase.

## Features

- **Search & discovery** — curated UNESCO/heritage sites plus worldwide geocoded places
- **Destination guides** — history, architecture, 360° tours, weather, hotels, reviews
- **AI trip planner** — day-by-day itineraries with budget analytics
- **Travel concierge chatbot** — context-aware assistant on every page
- **Auth & favorites** — save places and itineraries via Supabase

## Local development

```bash
npm install
cp .env.example .env
# Fill in Supabase + at least one AI key
npm run dev
```

Apply Supabase migrations from `supabase/migrations/` to your project.

## Environment variables

| Variable                                 | Required    | Notes                                  |
| ---------------------------------------- | ----------- | -------------------------------------- |
| `VITE_SUPABASE_URL`                      | Yes         | Public Supabase URL                    |
| `VITE_SUPABASE_PUBLISHABLE_KEY`          | Yes         | Supabase anon/publishable key          |
| `SUPABASE_URL`                           | Yes         | Same URL for SSR                       |
| `SUPABASE_PUBLISHABLE_KEY`               | Yes         | Same key for SSR                       |
| `GEMINI_API_KEY` / `GROQ_API_KEY` / etc. | Recommended | At least one AI key for live responses |

See `.env.example` for the full list.

## Deploy to Vercel

1. Import the repo in [Vercel](https://vercel.com)
2. Add all environment variables from `.env.example`
3. Build command: `npm run build`
4. Output is handled automatically by the Nitro `vercel` preset

Enable Google OAuth in Supabase Auth → Providers and add your Vercel URL to redirect URLs.

## Deploy to Render

1. Create a **Web Service** from this repo
2. Build command: `npm install && NITRO_PRESET=node-server npm run build`
3. Start command: `npm start`
4. Add the same environment variables as Vercel

Alternatively use the included `render.yaml` blueprint.

## Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start dev server               |
| `npm run build`  | Production build               |
| `npm start`      | Run built Node server (Render) |
| `npm run lint`   | ESLint                         |
| `npm run format` | Prettier                       |

## Tech stack

- TanStack Start + Router + Query
- Vite 7 + Nitro
- Supabase (Postgres + Auth)
- shadcn/ui + Tailwind CSS v4
