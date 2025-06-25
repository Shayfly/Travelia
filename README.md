# Travelia

Travelia is a demo travel search platform featuring a React front‑end and Node.js backend. It demonstrates best practices for a small full‑stack application including internationalization, SEO, and automated deployment.

## Project layout

```
frontend/   React + Vite + Tailwind UI
backend/    Express API server
```

## Getting started

1. Copy `.env.example` to `.env` in the project root and `backend/.env` in the backend folder. Fill in the API key and optional analytics or SMTP settings.
2. Install dependencies:

```bash
npm install --prefix frontend
npm install --prefix backend
```

3. Run in development mode in two terminals:

```bash
npm run dev --prefix frontend
npm run dev --prefix backend
```

The frontend is served on Vite's dev server while the API runs on port 3000.

## Testing

Unit tests use **Vitest**. Run them with:

```bash
npm test --prefix frontend
```

## Deployment

A GitHub Actions workflow builds the React app and publishes it to GitHub Pages. The backend can be deployed separately to services such as Vercel.

## Features

- Multilingual UI (English/Hebrew) with easy extension.
- Basic blog rendered from Markdown posts.
- Contact form handled via an Express endpoint and Nodemailer.
- Simple deals page with filtering.
- Google Analytics integration via `VITE_GA_ID`.

This project is intended for demonstration only and not for production use.
