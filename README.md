# Travelia / טרווליה

Demo travel site featuring a React + Vite + Tailwind frontend and an Express backend.
The repository is ready for deployment of the frontend to **GitHub Pages** and the
backend to **Vercel**.

---

## English

### Project structure

```
frontend/   # React application
backend/    # Node.js + Express API server
.github/    # CI/CD workflow
```

### Environment variables

1. Copy `.env.example` in the project root to `.env`.
2. Copy `backend/.env.example` to `backend/.env`.
3. Put your **Travelpayouts API key** in both files under `TRAVELPAYOUTS_API_KEY`.

### Running locally

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
npm install
npm run dev
```

The backend will start on port `3000` by default and the frontend development
server will proxy API requests to it.

### Building

```bash
cd frontend
npm run build
```

The production build is created in `frontend/dist`.

### Deployment

#### GitHub Pages

The workflow in `.github/workflows/deploy.yml` automatically builds the frontend
and publishes `frontend/dist` to GitHub Pages whenever changes are pushed to the
`main` branch.

#### Vercel

Deploy the Express backend by creating a Vercel project with the `backend` folder
as the root and the build command `npm start`. If you wish to deploy the static
frontend instead, use the `frontend` folder with `npm run build` and `dist` as the
output directory.

---

## עברית

### מבנה הפרויקט

```
frontend/   # אפליקציית React
backend/    # שרת API מבוסס Express
.github/    # הגדרות CI/CD
```

### משתני סביבה

1. העתיקו את הקובץ `.env.example` לשם `.env` בתיקייה הראשית.
2. העתיקו את `backend/.env.example` ל־`backend/.env`.
3. הזינו את מפתח ה־API של **Travelpayouts** במשתנה `TRAVELPAYOUTS_API_KEY` בשני הקבצים.

### הרצה מקומית

```bash
# פרונטאנד
cd frontend
npm install
npm run dev

# בקאנד
cd ../backend
npm install
npm run dev
```

השרת פועל כברירת מחדל על פורט `3000` והפרונטאנד מנתב אליו את הקריאות ל־API.

### בנייה

```bash
cd frontend
npm run build
```

תוצר הבנייה יופיע בתיקייה `frontend/dist`.

### פריסה

#### GitHub Pages

פעולת GitHub Actions המוגדרת ב־`.github/workflows/deploy.yml` בונה את הפרונטאנד
ומפרסמת את התיקייה `frontend/dist` ל־GitHub Pages בכל דחיפה לענף `main`.

#### Vercel

לפריסה של שרת ה־Express הגדירו את תיקיית `backend` כשורש הפרויקט ב־Vercel
והשתמשו בפקודת הבנייה `npm start`. לחלופין ניתן לפרוס את הפרונטאנד הסטטי על ידי
שימוש בתיקיית `frontend` עם פקודת `npm run build` והגדרת תיקיית הפלט כ־`dist`.
