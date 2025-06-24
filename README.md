# Travelia

Travelia is a demo monorepo project for searching flights, hotels and combined deals. It consists of a React frontend and an Express backend. The project is configured to deploy the frontend to GitHub Pages and the backend to Vercel.

## טרווליה

פרויקט לדוגמה המשלב פרונטאנד מבוסס React עם Tailwind ו־Vite לצד שרת Express. הקוד מותאם לפריסה ב־Vercel וב־GitHub Pages. ניתן לבצע חיפוש טיסות ומלונות ולשלב לדילים מותאמים אישית.

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
For the frontend, you can set `VITE_BASE_URL` to control the base path used by
Vite when building for production. This is useful when deploying to GitHub
Pages.

## Installation

```
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

To create a production build of the frontend run:

```
cd frontend
npm run build
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
Set `VITE_BASE_URL` in `frontend/.env` to `/your-repo-name/` so that asset
paths resolve correctly when served from a subfolder.

### Vercel

The Express backend contains a `vercel.json` file so it can be deployed to
Vercel. Create a Vercel project using the `backend` folder as the root and set
the build command to `npm start`.

If you wish to deploy the static frontend to Vercel instead, use the `frontend`
folder as the project root, keep the build command as `npm run build` and set
the output directory to `dist`. Ensure `VITE_BASE_URL` is `/` in `frontend/.env`
so the site works correctly at the domain root.

## Features

- Multilingual interface (Hebrew/English)
- Flight and hotel search using the Travelpayouts API
- Local deal builder combining flights and hotels
- Basic blog and contact form

## הפיצ'רים המרכזיים

- תמיכה בעברית ובאנגלית
- חיפוש טיסות ומלונות מול ממשק ה־API של Travelpayouts
- יצירת דילים מקומיים משילוב טיסה ומלון
- בלוג וטופס יצירת קשר בסיסיים
