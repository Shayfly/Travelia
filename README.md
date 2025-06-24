# Travelia

Travelia is a demo monorepo project for searching flights, hotels and combined deals. It consists of a React frontend and an Express backend. The project is ready to be deployed to Vercel (backend) and GitHub Pages (frontend).

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
