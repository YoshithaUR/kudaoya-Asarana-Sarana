import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Team from './components/Team'
import Membership from './components/Membership'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import HistoryPage from './components/HistoryPage'
import './styles/App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#history') {
        setCurrentPage('history');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page, href) => {
    if (page === 'history' || href === '#history') {
      window.location.hash = '#history';
      setCurrentPage('history');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = href || '#home';
      setCurrentPage('home');
      if (href) {
        setTimeout(() => {
          const targetId = href.startsWith('#') ? href.substring(1) : href;
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app">
      <Loader />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {currentPage === 'history' ? (
          <HistoryPage onNavigate={handleNavigate} />
        ) : (
          <>
            <Hero />
            <About />
            <Team />
            <Membership />
            <Services />
            <Projects />
            <Contact />
          </>
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App
