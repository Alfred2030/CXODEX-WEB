# CXODEX Consulting Website

High-end personal consulting website for a senior CEO advisor.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Responsive design
- Chinese pages with English routes reserved
- Vercel-ready configuration

## Pages

- `/` Home
- `/about` About
- `/services` Services
- `/methodology` Methodology
- `/cases` Cases
- `/insights` Insights
- `/contact` Contact

English routes are available under `/en`, for example `/en/about`.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, import the repository.
3. Set the project root to `Project` if the repository root contains this folder.
4. Use the default Next.js build settings.
5. Add `CXODEX.com` and `www.CXODEX.com` in Vercel Domains.
6. Update DNS at the domain registrar according to Vercel's instructions.

The project includes `vercel.json`, `sitemap.ts`, and `robots.ts` for production readiness.
