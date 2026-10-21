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
import AdminLogin from './admin/AdminLogin';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/App.css';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoginView, setIsLoginView] = useState(false);
  const { authed, login, logout } = useAuth();

  const checkRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('/admin') || hash === '#admin') {
      setIsLoginView(false);
      setIsAdminView(true);
    } else if (path.includes('/login')) {
      setIsAdminView(false);
      setIsLoginView(true);
    } else if (hash === '#history') {
      setIsAdminView(false);
      setIsLoginView(false);
      setCurrentPage('history');
    } else {
      setIsAdminView(false);
      setIsLoginView(false);
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

  // If session expired while on admin view, redirect to login
  useEffect(() => {
    if (isAdminView && !authed) {
      window.history.pushState({}, '', '/login');
      setIsAdminView(false);
      setIsLoginView(true);
    }
  }, [authed, isAdminView]);

  const handleNavigate = (page, href) => {
    if (page === 'history' || href === '#history') {
      window.history.pushState({}, '', '/#history');
      window.location.hash = '#history';
      setIsAdminView(false);
      setIsLoginView(false);
      setCurrentPage('history');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', href || '/');
      window.location.hash = href || '#home';
      setIsAdminView(false);
      setIsLoginView(false);
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

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/login');
    setIsAdminView(false);
    setIsLoginView(true);
  };

  // ── ADMIN ROUTE (protected) ──────────────────────────────────────────────
  if (isAdminView) {
    if (!authed) {
      // Not authenticated → redirect to login
      window.history.replaceState({}, '', '/login');
      return (
        <AdminLogin
          onLoginSuccess={() => {
            login();
            window.history.pushState({}, '', '/admin');
            setIsLoginView(false);
            setIsAdminView(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
    return (
      <AdminDashboard
        onNavigateToSite={() => handleNavigate('home', '#home')}
        onLogout={handleLogout}
      />
    );
  }

  // ── LOGIN ROUTE ───────────────────────────────────────────────────────────
  if (isLoginView) {
    // If already logged in, skip login and go straight to admin
    if (authed) {
      window.history.replaceState({}, '', '/admin');
      setIsLoginView(false);
      setIsAdminView(true);
      return null;
    }
    return (
      <AdminLogin
        onLoginSuccess={() => {
          login();
          window.history.pushState({}, '', '/admin');
          setIsLoginView(false);
          setIsAdminView(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // ── PUBLIC SITE ───────────────────────────────────────────────────────────
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
    <AuthProvider>
      <DataProvider>
        <MainApp />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
