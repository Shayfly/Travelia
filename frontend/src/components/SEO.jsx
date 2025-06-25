import { Helmet } from 'react-helmet';

export default function SEO({ title, description }) {
  return (
    <Helmet>
      {title && <title>{title} - Travelia</title>}
      {description && <meta name="description" content={description} />}
      {import.meta.env.VITE_GA_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`}></script>
          <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GA_ID}');
          `}</script>
        </>
      )}
    </Helmet>
  );
}
