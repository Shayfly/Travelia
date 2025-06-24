import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { LanguageContext } from '../contexts/LanguageContext';
import useTranslation from '../hooks/useTranslation';

const posts = [
  {
    id: 1,
    slug: 'exploring-tel-aviv',
    title: {
      en: 'Exploring Tel Aviv: Beaches, Markets and Nightlife',
      he: '\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1: \u05d7\u05d5\u05e4\u05d9\u05dd, \u05e9\u05d5\u05d5\u05e7\u05d9\u05dd \u05d5\u05d7\u05d9\u05d9 \u05dc\u05d9\u05dc\u05d4',
    },
    summary: {
      en: 'Tel Aviv is known for its vibrant beaches, bustling markets and world-class nightlife. Discover the must-see spots in Israel\'s nonstop city.',
      he: '\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1 \u05d9\u05d3\u05d5\u05e2\u05d4 \u05d1\u05d7\u05d5\u05e4\u05d9\u05d4 \u05d4\u05ea\u05d5\u05e1\u05e1\u05d9\u05dd, \u05d1\u05e9\u05d5\u05d5\u05e7\u05d9\u05dd \u05de\u05dc\u05d0\u05d9 \u05d4\u05d7\u05d9\u05d9\u05dd \u05d5\u05d1\u05d7\u05d9\u05d9 \u05dc\u05d9\u05dc\u05d4. \u05d2\u05dc\u05d5 \u05d0\u05ea \u05d4\u05de\u05e7\u05d5\u05de\u05d5\u05ea \u05e9\u05d0\u05e1\u05d5\u05e8 \u05dc\u05d1\u05e7\u05e8 \u05d1\u05e2\u05d9\u05e8 \u05dc\u05dc\u05d0 \u05e4\u05e1\u05e7\u05d4.',
    },
    content: {
      en: 'From the famous promenade and beautiful Mediterranean beaches to the colorful Carmel Market, Tel Aviv offers endless experiences. Don\'t miss a walk through the historic Neve Tzedek neighborhood and enjoy the vibrant nightlife along Rothschild Boulevard.',
      he: '\u05d4\u05d8\u05d9\u05d9\u05dc \u05d4\u05e2\u05d3\u05e8 \u05d5\u05d7\u05d5\u05e4\u05d9\u05d4 \u05d4\u05d9\u05e4\u05d4\u05d4 \u05e9\u05dc \u05d4\u05d8\u05d9\u05d9\u05dc \u05d4\u05ea\u05d9\u05db\u05d5\u05df \u05d5\u05d4\u05d7\u05d5\u05e3 \u05d1\u05d9\u05dd \u05d4\u05ea\u05d9\u05db\u05d5\u05df. \u05d4\u05e9\u05d5\u05e7 \u05d4\u05db\u05de\u05e8\u05d5\u05e8 \u05db\u05e8\u05de\u05dc \u05de\u05e6\u05d9\u05e2 \u05e6\u05d1\u05e2\u05d5\u05e0\u05d9\u05d5\u05ea \u05de\u05e9\u05db\u05d9\u05de\u05d5\u05ea \u05d5\u05d1\u05dc\u05d9 \u05dc\u05e4\u05e1\u05d5\u05e3 \u05d8\u05d9\u05d9\u05dc \u05d1\u05e9\u05db\u05d5\u05e0\u05ea \u05e0\u05d5\u05d5\u05d4 \u05e6\u05d3\u05e7. \u05e0\u05e1\u05d5 \u05d4\u05ea\u05d9\u05d9\u05dc \u05d1\u05e7\u05e8\u05da \u05dc\u05e1\u05d5\u05e3 \u05d4\u05d7\u05d9\u05d9 \u05dc\u05d9\u05dc\u05d4 \u05d1\u05e8\u05d7\u05d5\u05d1 \u05e8\u05d5\u05ea\u05e9\u05d9\u05dc\u05d3.',
    },
  },
  {
    id: 2,
    slug: 'budget-hotels-eilat',
    title: {
      en: 'Budget-Friendly Hotels in Eilat',
      he: '\u05de\u05dc\u05d5\u05e0\u05d5\u05ea \u05d7\u05e1\u05db\u05d5\u05e0\u05d9\u05d9\u05dd \u05d1\u05d0\u05d9\u05dc\u05ea',
    },
    summary: {
      en: 'Planning a getaway to Eilat without breaking the bank? Here are our top picks for comfortable and affordable hotels.',
      he: '\u05de\u05ea\u05db\u05e0\u05e0\u05d9\u05dd \u05d7\u05d5\u05e4\u05e9\u05d4 \u05dc\u05d0\u05d9\u05dc\u05ea \u05de\u05d1\u05dc\u05d9 \u05dc\u05e8\u05d5\u05e7\u05df \u05d0\u05ea \u05d4\u05db\u05d9\u05e1? \u05d4\u05e0\u05d4 \u05d4\u05de\u05dc\u05d5\u05e0\u05d5\u05ea \u05d4\u05de\u05d5\u05de\u05dc\u05e6\u05d5\u05ea \u05d5\u05d4\u05de\u05e9\u05ea\u05dc\u05de\u05d5\u05ea \u05e9\u05dc\u05e0\u05d5.',
    },
    content: {
      en: 'Eilat offers a variety of well-priced hotels close to the Red Sea beaches. Look for deals during the off-season and consider smaller boutique accommodations to save even more on your stay.',
      he: '\u05d0\u05d9\u05dc\u05ea \u05de\u05e6\u05d9\u05e2\u05d4 \u05de\u05d2\u05d5\u05d5\u05e0\u05d5\u05ea \u05d1\u05d4\u05d9\u05dc\u05d4 \u05e7\u05e8\u05d5\u05d1 \u05dc\u05d7\u05d5\u05e4\u05d9 \u05d9\u05dd \u05d4\u05d0\u05d3\u05d5\u05dd \u05d4\u05d0\u05d3\u05d5\u05dd. \u05d7\u05e4\u05e9\u05d5 \u05d4\u05d6\u05de\u05df \u05d1\u05e2\u05d5\u05e0\u05d5\u05ea \u05d0\u05d7\u05e8 \u05d4\u05e2\u05d5\u05e0\u05d4 \u05e9\u05dc \u05d4\u05e9\u05e0\u05d4 \u05d5\u05e9\u05e7\u05dc\u05d5 \u05dc\u05d1\u05d7\u05d5\u05e8 \u05de\u05dc\u05d5\u05e0\u05d5\u05ea \u05d1\u05d5\u05d8\u05d9\u05e7 \u05e7\u05d8\u05e0\u05d9\u05d5\u05ea \u05db\u05d3\u05d9 \u05dc\u05d7\u05e1\u05d5\u05da \u05e2\u05d5\u05d3 \u05d1\u05de\u05e9\u05d0\u05d4.',
    },
  },
  {
    id: 3,
    slug: 'jerusalem-historic-sites',
    title: {
      en: "Jerusalem's Top Historical Sites",
      he: "\u05d4\u05d0\u05ea\u05e8\u05d9\u05dd \u05d4\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d9\u05dd \u05e9\u05dc \u05d9\u05e8\u05d5\u05e9\u05dc\u05d9\u05dd",
    },
    summary: {
      en: "From the Western Wall to the ancient streets of the Old City, explore Jerusalem's most important landmarks.",
      he: "\u05de\u05d4\u05db\u05d5\u05ea\u05dc \u05d4\u05de\u05e2\u05e8\u05d1\u05d9 \u05e2\u05d3 \u05dc\u05e1\u05de\u05d8\u05d0\u05d5\u05ea \u05d4\u05e2\u05d9\u05e8 \u05d4\u05e2\u05ea\u05d9\u05e7\u05d4, \u05e6\u05d0\u05d5 \u05dc\u05d2\u05dc\u05d5\u05ea \u05d0\u05ea \u05d4\u05d0\u05ea\u05e8\u05d9\u05dd \u05d4\u05db\u05d9 \u05d7\u05e9\u05d5\u05d1\u05d9\u05dd \u05e9\u05dc \u05d9\u05e8\u05d5\u05e9\u05dc\u05d9\u05dd.",
    },
    content: {
      en: "Jerusalem is a city filled with history. Visit the Western Wall, walk through the Jewish, Christian and Muslim quarters and experience centuries of culture and tradition around every corner.",
      he: "\u05d9\u05e8\u05d5\u05e9\u05dc\u05d9\u05dd \u05d4\u05d9\u05d0 \u05e2\u05d9\u05e8 \u05de\u05dc\u05d0 \u05d1\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d4. \u05d1\u05e7\u05e8 \u05d0\u05ea \u05d4\u05db\u05d5\u05ea\u05dc \u05d4\u05de\u05e2\u05e8\u05d1\u05d9, \u05d4\u05ea\u05d4\u05dc\u05db \u05d1\u05e7\u05d5\u05d5\u05e8\u05d5\u05ea \u05d4\u05d9\u05d4\u05d5\u05d3\u05d9, \u05d4\u05e0\u05e6\u05e8\u05d5\u05ea \u05d5\u05d4\u05de\u05e1\u05dc\u05de\u05d9\u05dd \u05d5\u05d7\u05d5\u05d5\u05d4 \u05e2\u05d5\u05d3 \u05d1\u05db\u05dc \u05e4\u05e0\u05d9\u05d4 \u05ea\u05d7\u05d5\u05d5\u05d4 \u05d5\u05e7\u05d5\u05e8\u05ea \u05e2\u05ea \u05e9\u05e7\u05d9\u05dc\u05d5\u05ea \u05d5\u05de\u05e1\u05d5\u05e8\u05ea \u05dc\u05d0\u05d5\u05e8 \u05e8\u05d2\u05e2."
    },
  },
];

function FullPost({ post, onBack, lang }) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <Helmet>
        <title>{post.title[lang]} | Travelia</title>
        <meta name="description" content={post.summary[lang]} />
      </Helmet>
      <h2 className="text-2xl font-bold">{post.title[lang]}</h2>
      <p className="whitespace-pre-line">{post.content[lang]}</p>
      <button onClick={onBack} className="text-blue-600 underline">
        {lang === 'he' ? '\u05d7\u05d6\u05d5\u05e8' : 'Back'}
      </button>
    </div>
  );
}

export default function Blog() {
  const t = useTranslation();
  const { language } = useContext(LanguageContext);
  const [active, setActive] = useState(null);

  const pageTitle = active ? posts.find(p => p.id === active).title[language] + ' | Travelia' : 'Travelia - ' + t('blog_title');
  const pageDesc = active ? posts.find(p => p.id === active).summary[language] : t('blog_desc');

  return (
    <div className="space-y-4">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>
      {active ? (
        <FullPost post={posts.find(p => p.id === active)} onBack={() => setActive(null)} lang={language} />
      ) : (
        <>
          <h2 className="text-xl font-bold">{t('blog_title')}</h2>
          <ul className="space-y-4">
            {posts.map(p => (
              <li key={p.id} className="border p-4 rounded-lg hover:bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{p.title[language]}</h3>
                  <p className="text-sm text-gray-700 mt-1">{p.summary[language]}</p>
                </div>
                <button onClick={() => setActive(p.id)} className="text-blue-600 underline mt-2 md:mt-0 self-start md:self-auto">
                  {t('read_more')}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

