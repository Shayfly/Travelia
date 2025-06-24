# Travelia

Travelia is a demo monorepo project for searching flights, hotels and combined deals. It consists of a React frontend and an Express backend. The project is configured to deploy the frontend to GitHub Pages and the backend to Vercel.

## טרווליה

פרויקט לדוגמה המשלב פרונטאנד מבוסס React עם Tailwind ו־Vite לצד שרת Express. הקוד מותאם לפריסה ב־Vercel וב־GitHub Pages.

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

### GitHub Pages

The workflow in `.github/workflows/deploy.yml` automatically builds the React
frontend and publishes the `frontend/dist` folder to **GitHub Pages** whenever
changes are pushed to the `main` branch. No manual steps are required.

### Vercel

The Express backend contains a `vercel.json` file so it can be deployed to
Vercel. Create a Vercel project using the `backend` folder as the root and set
the build command to `npm start`.

If you wish to deploy the static frontend to Vercel instead, use the `frontend`
folder as the project root, keep the build command as `npm run build` and set
the output directory to `dist`.
