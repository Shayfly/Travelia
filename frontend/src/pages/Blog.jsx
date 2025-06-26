import useTranslation from '../hooks/useTranslation';
import SEO from '../components/SEO';

const posts = [
  { title: 'Post 1', body: 'Lorem ipsum dolor sit amet.', date: '2025-06-01' },
  { title: 'Post 2', body: 'Consectetur adipiscing elit.', date: '2025-05-20' },
  { title: 'Post 3', body: 'Sed do eiusmod tempor.', date: '2025-05-10' },
];

export default function Blog() {
  const t = useTranslation();
  return (
    <>
      <SEO title="Blog" description="Travelia blog" />
      <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('blog_title')}</h2>
      {posts.map((p, i) => (
        <article key={i} className="border p-4 rounded space-y-2">
          <h3 className="font-semibold text-lg">{p.title}</h3>
          <p className="text-sm text-gray-600">{new Date(p.date).toLocaleDateString()}</p>
          <p>{p.body}</p>
          <button className="text-blue-600 hover:underline">{t('read_more') || 'Read more'}</button>
        </article>
      ))}
      </div>
    </>
  );
}
