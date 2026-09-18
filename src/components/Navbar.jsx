import { useState, useEffect } from 'react';
import { Menu, X, HeartHandshake, ArrowRight, ChevronRight } from 'lucide-react';
import { logoImg } from '../assets/image';
import '../styles/Navbar.css';

const navLinks = [
  { name: 'Home', sinhala: 'ගෙදර', href: '#home' },
  { name: 'About', sinhala: 'අප ගැන', href: '#about' },
  { name: 'History', sinhala: 'ඉතිහාසය', href: '#history' },
  { name: 'Team', sinhala: 'අපේ කණ්ඩායම', href: '#team' },
  { name: 'Services', sinhala: 'සේවාවන්', href: '#services' },
  { name: 'Projects', sinhala: 'ව්‍යාපෘති', href: '#projects' },
  { name: 'Contact', sinhala: 'සම්බන්ධ වන්න', href: '#contact' },
];

const Navbar = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  /* ── Scroll behaviour ── */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 60);
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsHidden(true);
        setIsMobileMenuOpen(false);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  /* ── Active section tracking via IntersectionObserver ── */
  useEffect(() => {
    if (currentPage === 'history') {
      setActiveSection('#history');
      return;
    }
    const sections = navLinks.map(l => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, [currentPage]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (onNavigate) {
      if (href === '#history') {
        onNavigate('history', '#history');
      } else {
        onNavigate('home', href);
      }
    } else {
      window.location.hash = href;
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
        <div className="navbar-inner">

          {/* ── Logo ── */}
          <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
            <div className="logo-icon-wrapper">
              <img src={logoImg} alt="Kudaoya Asarana Sarana Logo" className="logo-img" />
            </div>
            <div className="logo-text-block">
              <span className="logo-name si-text">කුඩාඔය අසරණ සරණ <span className="logo-accent">සමිතිය</span></span>
              <span className="logo-tagline si-text">සතහට සෙත...</span>
            </div>
          </a>

          {/* ── Divider ── */}
          <div className="navbar-divider" aria-hidden="true" />

          {/* ── Desktop Menu ── */}
          <ul className="navbar-menu">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`navbar-link en-text ${activeSection === link.href || (currentPage === 'history' && link.href === '#history') ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="nav-link-dot" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA + Mobile Toggle ── */}
          <div className="navbar-actions">
            <button
              className="btn-nav-cta en-text"
              onClick={(e) => scrollToSection(e, '#membership')}
            >
              <span>Join Us</span>
              <ArrowRight size={15} />
            </button>

            {/* ── Mobile Hamburger ── */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile Full-Screen Drawer ── */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {/* Backdrop */}
        <div
          className="mobile-menu-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div className="mobile-menu-panel">
          {/* Header */}
          <div className="mobile-menu-header">
            <div className="mobile-menu-logo">
              <div className="mobile-menu-logo-icon">
                <img src={logoImg} alt="Kudaoya Asarana Sarana Logo" className="mobile-menu-logo-img" />
              </div>
              <div className="mobile-menu-logo-text-block">
                <span className="mobile-menu-logo-text si-text">කුඩාඔය අසරණ සරණ <span className="logo-accent">සමිතිය</span></span>
                <span className="mobile-menu-logo-slogan si-text">සතහට සෙත...</span>
              </div>
            </div>
            <button
              className="mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links */}
          <ul className="mobile-menu-list">
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`mobile-menu-link ${activeSection === link.href || (currentPage === 'history' && link.href === '#history') ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="mobile-link-num">0{i + 1}</span>
                  <span className="mobile-link-name en-text">{link.name}</span>
                  <span className="mobile-link-sinhala si-text">{link.sinhala}</span>
                  <ChevronRight size={14} className="mobile-link-chevron" />
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom CTA */}
          <div className="mobile-menu-cta">
            <button
              className="btn-mobile-cta si-text"
              onClick={(e) => handleNavClick(e, '#membership')}
            >
              <HeartHandshake size={18} />
              <span>අප හා එක්වන්න</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
