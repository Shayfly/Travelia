# Travelia

Travelia is a demo monorepo for searching flights, hotels and custom travel deals. It contains a React frontend built with Vite and Tailwind alongside an Express backend. The recommended deployment target is **Vercel**.

## Project Structure

```
frontend/   React + Vite + Tailwind application
backend/    Node.js + Express API server
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

### Vercel

The Express backend includes `vercel.json` so it can be deployed to Vercel. You can also deploy the static frontend using the `frontend` folder with build command `npm run build` and output directory `dist`.

## Custom API Keys and Images

Add your Travelpayouts API key and other secrets to the `.env` file. The backend reads `TRAVELPAYOUTS_API_KEY` and `TRAVELPAYOUTS_MARKER` to query the Travelpayouts API. The frontend calls the proxy endpoints under `/api` so the keys remain private. Binary images are not included in the repository. Place your images under `frontend/public/assets` before building or deploying.

---

# טרווליה

פרויקט דמו לחיפוש טיסות, מלונות ודילים מותאמים אישית. המאגר כולל פרונטאנד React (Vite + Tailwind) ושרת Express. ניתן לפרוס את הפרויקט ל־Vercel.

## מבנה הקבצים

```
frontend/   אפליקציית React
backend/    שרת Express
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

ניתן לפרוס את השרת ל־Vercel באמצעות הקובץ `vercel.json`.

## הוספת מפתחות API ותמונות

הכניסו את מפתח ה־API של Travelpayouts ושאר הסודות לקבצי ה־`.env`. החליפו את התמונות המובנות בתיקיות `frontend/public` או `frontend/src/assets` בתמונות משלכם.
