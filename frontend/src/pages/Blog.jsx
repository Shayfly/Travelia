import { useEffect, useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import ReactMarkdown from 'react-markdown';

const mdFiles = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' });

export default function Blog() {
  const t = useTranslation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = 'Travelia - Blog';
    const loaded = Object.entries(mdFiles).map(([path, raw]) => ({
      title: path.split('/').pop().replace('.md', ''),
      body: raw,
    }));
    setPosts(loaded);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('blog_title')}</h2>
      {posts.map((p, i) => (
        <article key={i} className="border p-2">
          <ReactMarkdown>{p.body}</ReactMarkdown>
        </article>
      ))}
    </div>
  );
}
