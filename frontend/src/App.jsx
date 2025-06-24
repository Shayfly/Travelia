import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Deals from './pages/Deals';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import { useContext } from 'react';
import './index.css';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { language } = useContext(LanguageContext);
  return (
    <div dir={language === 'he' ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

