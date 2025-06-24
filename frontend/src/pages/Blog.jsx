import { useEffect } from 'react';
import useTranslation from '../hooks/useTranslation';

const posts = [
  { title: 'Post 1', body: 'Lorem ipsum dolor sit amet.' },
  { title: 'Post 2', body: 'Consectetur adipiscing elit.' },
  { title: 'Post 3', body: 'Sed do eiusmod tempor.' },
];

export default function Blog() {
  const t = useTranslation();
  useEffect(() => {
    document.title = 'Travelia - Blog';
  }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('blog_title')}</h2>
      {posts.map((p, i) => (
        <article key={i} className="border p-2">
          <h3 className="font-semibold">{p.title}</h3>
          <p>{p.body}</p>
        </article>
      ))}
    </div>
  );
}
