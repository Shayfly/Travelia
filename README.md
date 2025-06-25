# Travelia

Travelia is a demo monorepo for searching flights, hotels and custom travel deals. It contains a React frontend built with Vite and Tailwind alongside an Express backend. The repository includes workflows for deploying the frontend to **GitHub Pages** and the backend to **Vercel**.

## Project Structure

```
frontend/   React + Vite + Tailwind application
backend/    Node.js + Express API server
.github/    CI/CD workflow for GitHub Pages
```

## Installation and Local Development

codex/write-bilingual-readme.md-for-travelia-project
1. Clone the repository and create `.env` files in both the project root and in `backend` based on `.env.example`.
2. Install dependencies for each part:
=======
Create `.env` files in the root and backend folders based on `.env.example`. Include your Travelpayouts API key and any other secrets.
For the frontend, you can set `VITE_BASE_URL` to control the base path used by
Vite when building for production. This is useful when deploying to GitHub
Pages.
 main

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Start the development servers in separate terminals:

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm run dev
```

The frontend runs on Vite's dev server and the backend runs on Express.

## Building for Production

Generate a production build of the frontend with:

```bash
cd frontend
npm run build
```

The built files appear in `frontend/dist` and can be served statically or deployed.

## Deployment

### GitHub Pages

A GitHub Actions workflow in `.github/workflows/deploy.yml` automatically builds the frontend and publishes `frontend/dist` to GitHub Pages whenever changes are pushed to the `main` branch.

### Vercel

The Express backend includes `vercel.json` so it can be deployed to Vercel. Create a new Vercel project using the `backend` folder as the root and set the build command to `npm start`.

You may also deploy the static frontend to Vercel using the `frontend` folder, build command `npm run build` and output directory `dist`.

## Custom API Keys and Images

Add your Travelpayouts API key to the `.env` files you created earlier. Replace the placeholder images (`logo.svg`, `demo-image.jpg`, `favicon.ico`) located in `frontend/public` or `frontend/src/assets` with your own assets.

---

# טרווליה

פרויקט דמו לחיפוש טיסות, מלונות ודילים מותאמים. המאגר כולל פרונטאנד React (Vite + Tailwind) ושרת Express. התצורה מאפשרת פריסה של הפרונטאנד ל־GitHub Pages ושל השרת ל־Vercel.

## מבנה הקבצים

```
frontend/   אפליקציית React
backend/    שרת Express
.github/    תהליך CI/CD ל־GitHub Pages
```

## התקנה והרצה מקומית

1. שחפלו את המאגר וצרו קבצי `.env` בתיקיית השורש וב־`backend` לפי `.env.example`.
2. התקינו את התלויות בכל חלק:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. הפעילו את שרתי הפיתוח בשני טרמינלים נפרדים:

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm run dev
```

## בנייה לפרודקשן

```bash
cd frontend
npm run build
```

התוצרים יופיעו בתיקייה `frontend/dist`.

## פריסה

### GitHub Pages

 codex/write-bilingual-readme.md-for-travelia-project
קובץ העבודה שבנתיב `.github/workflows/deploy.yml` בונה אוטומטית את הפרונטאנד ומעלה את `frontend/dist` ל־GitHub Pages בעת דחיפה ל־`main`.

### Vercel

ב־`backend` קיים הקובץ `vercel.json` המאפשר פריסה פשוטה ל־Vercel. צרו פרויקט חדש כשהשורש הוא התיקייה `backend` והפקודת build היא `npm start`.
=======
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
main

ניתן גם לפרוס את הפרונטאנד הסטטי ל־Vercel עם התיקייה `frontend`, פקודת build `npm run build` ותיקיית פלט `dist`.

## הוספת מפתחות API ותמונות

הכניסו את מפתח ה־API של Travelpayouts לקבצי ה־`.env` שיצרתם. החליפו את הקבצים `logo.svg`, `demo-image.jpg` ו־`favicon.ico` בתיקיות `frontend/public` או `frontend/src/assets` בקבצים משלכם.

