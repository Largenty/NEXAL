## NEXAL

NEXAL is a modern stock market dashboard built with Next.js (App Router), featuring authentication, a watchlist, TradingView charts, market heatmaps, technical analysis, news timeline, and a polished emerald-themed UI.

### Features

-   Authentication with Better Auth (email/password)
-   Watchlist with alerts and company details
-   TradingView widgets: market overview, heatmap, advanced charts, technical analysis, symbol info, financials
-   Search command palette (Cmd/Ctrl + K)
-   Contact form with Nodemailer
-   MongoDB persistence (Mongoose)

## Prerequisites

-   Node.js 18+
-   MongoDB database (Atlas or local)

## Environment Variables

Create a `.env.local` at the project root with:

```env
# Next.js base URL for Better Auth
BETTER_AUTH_BASE_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-long-secret

# Database
MONGO_URI=mongodb+srv://user:pass@cluster/dbname

# Market data (Finnhub)
NEXT_PUBLIC_FINNHUB_API_KEY=your-public-or-test-key
FINNHUB_API_KEY=your-server-key

# Inngest (optional AI features)
GEMINI_API_KEY=your-gemini-api-key

# Email (contact form)
NODEMAILER_EMAIL=you@example.com
NODEMAILER_PASSWORD=app-password-or-token
```

## Install

```bash
pnpm install
# or
npm install
```

## Run Dev

```bash
pnpm dev
# or
npm run dev
```

Open http://localhost:3000

If you use Inngest locally (optional):

```bash
npx inngest-cli@latest dev
```

## Scripts

-   `dev` – start Next.js dev server
-   `build` – build for production
-   `start` – run production server

## Tech Stack

-   Next.js App Router, TypeScript, Tailwind
-   Better Auth + MongoDB (mongodbAdapter)
-   Mongoose models for app data (e.g., watchlist)
-   TradingView widgets
-   Nodemailer for contact emails

## Notes

-   Configure CORS/base URL correctly for Better Auth in `.env.local`.
-   Ensure `MONGO_URI` points to a reachable MongoDB instance.
