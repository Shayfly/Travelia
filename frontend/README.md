# Travelia Frontend

React + Vite + Tailwind application for searching flights, hotels and deals.

## פרונטאנד טרווליה

אפליקציית דמו המבוססת על React עם Vite ו־Tailwind.

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run preview` - preview production build

Binary assets are not tracked in the repository. Place your images (e.g. `assets/icons/logo.png`, `demo-image.jpg`, `favicon.ico`) inside `public/assets` before building or deploying.

The entry `index.html` lives in the `frontend` folder so it can be served
correctly on GitHub Pages and Vercel.

## Deployment

### GitHub Pages

1. Create a `.env` file in this folder and set `VITE_BASE_URL` to your
   repository name, e.g. `/travelia/`.
2. Run `npm run build` to generate the `dist` folder.
3. Deploy the contents of `dist` to GitHub Pages or use the provided workflow.

### Vercel

1. Ensure `VITE_BASE_URL` is set to `/` (or leave it unset).
2. In Vercel, set the project root to `frontend`, the build command to
   `npm run build`, and the output directory to `dist`.
