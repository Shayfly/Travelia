# Travelia / \u05d8\u05e8\u05d5\u05d5\u05dc\u05d9\u05d4

Travelia is a demo project for searching flights, hotels and package deals using the Travelpayouts API.
\u05d8\u05e8\u05d5\u05d5\u05dc\u05d9\u05d4 \u05d4\u05d9\u05d0 \u05de\u05d9\u05d6\u05dd \u05dc\u05d7\u05d9\u05e4\u05d5\u05e9 \u05d8\u05d9\u05e1\u05d5\u05ea \u05d5\u05de\u05dc\u05d5\u05e0\u05d5\u05ea \u05d1\u05e2\u05d6\u05e8\u05d4 \u05dcAPI \u05e9\u05dc Travelpayouts.

## Project Structure

```
frontend/   # React + Vite + Tailwind application
backend/    # Node.js + Express API server
.github/    # CI/CD workflow
```

## Placeholder Assets

Images such as `logo.svg`, `demo-image.jpg`, and `favicon.ico` are simple placeholders. Replace them with your own assets in `frontend/public` or `frontend/src/assets`.

## Environment Variables

Create `.env` files in the root and backend folders based on `.env.example`. Include your Travelpayouts API key and any other secrets.

## Installation

```
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

## Development

Run the frontend and backend separately:

```
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm run dev
```

## Deployment

The backend is configured for Vercel using `vercel.json`. The frontend can be deployed to GitHub Pages by running `npm run build` in the `frontend` folder and pushing the contents of `frontend/dist` to the `gh-pages` branch.

## Installation / \u05d4\u05ea\u05e7\u05e0\u05d4

```bash
# frontend
cd frontend
npm install

# backend
cd ../backend
npm install
```

## Development / \u05e4\u05d9\u05ea\u05d5\u05d7

```bash
# frontend
cd frontend
npm run dev

# backend
cd ../backend
npm run dev
```

## Deployment / \u05e4\u05e8\u05d9\u05e1\u05d4

Backend is configured for Vercel. Frontend can be deployed to GitHub Pages with `npm run build` and uploading `frontend/dist`.
\u05d4\u05d2\u05d1 \u05d0\u05d9\u05e4\u05e9\u05d5\u05e8 \u05de\u05d5\u05db\u05df \u05dcVercel. \u05d4\u05e4\u05e8\u05d5\u05e0\u05d8 \u05e0\u05d9\u05ea\u05df \u05dc\u05e4\u05e8\u05d9\u05e1\u05d4 \u05e2\u05dc GitHub Pages \u05d1\u05e2\u05d6\u05e8\u05ea `npm run build`.
