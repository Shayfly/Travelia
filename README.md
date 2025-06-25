# Travelia

Travelia is a demo monorepo for searching flights, hotels and custom travel deals. It contains a React frontend built with Vite and Tailwind alongside an Express backend. Workflows are provided for deploying the frontend to **GitHub Pages** and the backend to **Vercel**.

## Project Structure

```
frontend/   React + Vite + Tailwind application
backend/    Node.js + Express API server
.github/    CI/CD workflow for GitHub Pages
```

## Installation and Local Development

1. Clone the repository and create `.env` files in both the project root and `backend` based on `.env.example`.
2. Install dependencies:

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

## Building for Production

```bash
cd frontend
npm run build
```

The built files will appear in `frontend/dist` and can be served statically or deployed.

## Deployment

### GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the frontend and publishes `frontend/dist` to GitHub Pages whenever changes are pushed to the `main` branch.

### Vercel

The Express backend includes `vercel.json` so it can be deployed to Vercel. You can also deploy the static frontend using the `frontend` folder with build command `npm run build` and output directory `dist`.

## Environment Variables

Copy `.env.example` to `.env` in the project root **and** in `backend` and fill in these variables:
- `TRAVELPAYOUTS_API_KEY` – your Travelpayouts token
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` – SMTP credentials for the contact form
- `CONTACT_TO` – address to receive contact form messages
- `VITE_BASE_URL` – base path for the frontend (e.g. `/Travelia/` when deploying to GitHub Pages)
- `VITE_GA_ID` – Google Analytics ID


## Custom API Keys and Images

Add your Travelpayouts API key and other secrets to the `.env` files. Replace the placeholder images in `frontend/public` or `frontend/src/assets` with your own assets.

---

# טרווליה

פרויקט דמו לחיפוש טיסות, מלונות ודילים מותאמים אישית. המאגר כולל פרונטאנד React (Vite + Tailwind) ושרת Express. קיימים תהליכי פריסה ל־GitHub Pages ול־Vercel.

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
cd frontend && npm install
cd ../backend && npm install
```

3. הפעילו את שרתי הפיתוח בשני טרמינלים נפרדים:

```bash
cd frontend && npm run dev
cd ../backend && npm run dev
```

## בנייה לפרודקשן

```bash
cd frontend && npm run build
```

התוצרים יופיעו בתיקייה `frontend/dist`.

## פריסה

קובץ `.github/workflows/deploy.yml` בונה אוטומטית את הפרונטאנד ומעלה את `frontend/dist` ל־GitHub Pages בעת דחיפה ל־`main`. ניתן גם לפרוס את השרת ל־Vercel באמצעות הקובץ `vercel.json`.

## משתני סביבה

העתיקו את `.env.example` ל־`.env` בתיקיית השורש וב־`backend`.
מלאו את הערכים הבאים:
- `TRAVELPAYOUTS_API_KEY` – מפתח Travelpayouts
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` – פרטי SMTP לטופס יצירת קשר
- `CONTACT_TO` – הכתובת שאליה יישלחו ההודעות
- `VITE_BASE_URL` – בסיס הנתיב של הפרונטאנד (למשל `/Travelia/` ב־GitHub Pages)
- `VITE_GA_ID` – מזהה Google Analytics

## הוספת מפתחות API ותמונות

הכניסו את מפתח ה־API של Travelpayouts ושאר הסודות לקבצי ה־`.env`. החליפו את התמונות המובנות בתיקיות `frontend/public` או `frontend/src/assets` בתמונות משלכם.
