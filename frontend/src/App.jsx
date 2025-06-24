import { useState, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Deals from './pages/Deals';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import { DealsProvider } from './contexts/DealsContext';

const pages = {
  home: Home,
  flights: Flights,
  hotels: Hotels,
  deals: Deals,
  blog: Blog,
  contact: Contact,
};

function PageRenderer({ page }) {
  const Component = pages[page] || Home;
  return <Component />;
}

export default function App() {
  const [page, setPage] = useState('home');
  return (
    <LanguageProvider>
      <DealsProvider>
        <InnerApp page={page} setPage={setPage} />
      </DealsProvider>
    </LanguageProvider>
  );
}

function InnerApp({ page, setPage }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="flex flex-col min-h-screen" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <Header onNavigate={setPage} />
      <main className="flex-1 p-4">
        <PageRenderer page={page} />
      </main>
      <Footer />
    </div>
  );
}
