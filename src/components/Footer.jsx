import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { homeImages, logoImg } from '../assets/image';
import '../styles/Footer.css';

const Footer = ({ onNavigate }) => {
    const currentYear = new Date().getFullYear();

    const handleFooterNav = (e, href) => {
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
    };

    return (
        <footer className="footer">
            <div
                className="section-bg-image"
                style={{ backgroundImage: `url(${homeImages.img3})` }}
                aria-hidden="true"
            />
            <div className="footer-bg-glow" />

            <div className="footer-content container">
                <div className="footer-grid">

                    <div className="footer-section">
                        <div className="footer-brand-box">
                            <img src={logoImg} alt="Kudaoya Asarana Sarana Logo" className="footer-logo-img" />
                            <div className="footer-brand-text">
                                <h3 className="footer-title si-text">කුඩාඔය අසරණ සරණ <span className="footer-title-accent">සමිතිය</span></h3>
                                <span className="footer-slogan si-text">සතහට සෙත...</span>
                            </div>
                        </div>
                        <p className="footer-description si-text">
                            සමාජයේ අසරණ අයට සහන සැලසීම සහ ප්‍රජාව සංවර්ධනය කිරීම අපගේ ප්‍රධාන අරමුණයි.
                        </p>
                        <div className="footer-social">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading en-text">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home" className="si-text" onClick={(e) => handleFooterNav(e, '#home')}>මුල් පිටුව</a></li>
                            <li><a href="#about" className="si-text" onClick={(e) => handleFooterNav(e, '#about')}>අප ගැන</a></li>
                            <li><a href="#history" className="si-text" onClick={(e) => handleFooterNav(e, '#history')}>ඉතිහාසය</a></li>
                            <li><a href="#services" className="si-text" onClick={(e) => handleFooterNav(e, '#services')}>සේවා</a></li>
                            <li><a href="#contact" className="si-text" onClick={(e) => handleFooterNav(e, '#contact')}>සම්බන්ධ වන්න</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading en-text">Services</h4>
                        <ul className="footer-links">
                            <li><a href="#projects" className="si-text">ව්‍යාපෘති</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading en-text">Contact</h4>
                        <ul className="footer-contact">
                            <li>
                                <div className="contact-icon-box"><MapPin size={18} /></div>
                                <span className="si-text">ආලෝක මාවත,<br />කුඩාඔය, ශ්‍රී ලංකාව</span>
                            </li>
                            <li>
                                <div className="contact-icon-box"><Phone size={18} /></div>
                                <span className="en-text">+94 77 123 4567<br />+94 34 223 4567</span>
                            </li>
                            <li>
                                <div className="contact-icon-box"><Mail size={18} /></div>
                                <span className="en-text">info@kudaoyaasarana.lk<br />support@kudaoya.org</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright si-text">
                        © {currentYear} කුඩාඔය අසරණ සරණ සමිතිය. සියලුම හිමිකම් ඇවිරිණි.
                    </p>
                    <p className="developer en-text">
                        Developed by <a href="https://yoshitharathnayake.netlify.app/" target="_blank" rel="noreferrer" className="developer-link">Yoshitha Udayanga</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
