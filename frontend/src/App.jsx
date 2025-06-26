import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Deals from './pages/Deals';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import { DealsProvider } from './contexts/DealsContext';

export default function App() {
  return (
    <LanguageProvider>
      <DealsProvider>
        <InnerApp />
      </DealsProvider>
    </LanguageProvider>
  );
}

function InnerApp() {
  const { language } = useContext(LanguageContext);
  return (
    <Router>
      <div className="flex flex-col min-h-screen" dir={language === 'he' ? 'rtl' : 'ltr'}>
        <Header />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
