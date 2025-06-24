import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const posts = [
  { id: 1, title: 'Welcome to Travelia', body: 'This is a demo post.' },
  { id: 2, title: 'Top destinations', body: 'Another demo post.' },
];

export default function Blog() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Blog</h2>
      {posts.map((p) => (
        <article key={p.id} className="border p-2">
          <h3 className="font-semibold">{p.title}</h3>
          <p>{p.body}</p>
        </article>
      ))}
    </div>
  );
}


