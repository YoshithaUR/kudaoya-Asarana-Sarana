import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Membership from './components/Membership';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HistoryPage from './components/HistoryPage';
import AdminDashboard from './admin/AdminDashboard';
import { DataProvider } from './context/DataContext';
import './styles/App.css';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminView, setIsAdminView] = useState(false);

  const checkRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('/admin') || path.includes('/admion') || hash === '#admin' || hash === '#admion') {
      setIsAdminView(true);
    } else if (hash === '#history') {
      setIsAdminView(false);
      setCurrentPage('history');
    } else {
      setIsAdminView(false);
      setCurrentPage('home');
    }
  };

  useEffect(() => {
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  const handleNavigate = (page, href) => {
    if (page === 'admin' || href === '#admin') {
      window.history.pushState({}, '', '/admin');
      setIsAdminView(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'history' || href === '#history') {
      window.history.pushState({}, '', '/#history');
      window.location.hash = '#history';
      setIsAdminView(false);
      setCurrentPage('history');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', href || '/');
      window.location.hash = href || '#home';
      setIsAdminView(false);
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

  if (isAdminView) {
    return (
      <AdminDashboard onNavigateToSite={() => handleNavigate('home', '#home')} />
    );
  }

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
  );
}

function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}

export default App;
