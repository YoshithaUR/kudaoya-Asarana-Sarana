import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Headset } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const phoneNumber = "94776844558"; // The WhatsApp number with country code
        const message = `*Kudaoya Asarana Sarana Samithiya - New Contact*\n\n` +
            `*නම (Name):* ${formData.name}\n` +
            `*විද්‍යුත් තැපෑල (Email):* ${formData.email}\n` +
            `*දුරකථන (Phone):* ${formData.phone || 'Not provided'}\n\n` +
            `*පණිවිඩය (Message):*\n${formData.message}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');

        // Reset form after sending
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
        });
    };

    return (
        <section className="contact" id="contact">

            {/* ── Background ── */}
            <div className="contact-grid-bg" aria-hidden="true" />
            <div className="contact-orb contact-orb-1" aria-hidden="true" />
            <div className="contact-orb contact-orb-2" aria-hidden="true" />

            <div className="contact-container">

                {/* ── Header ── */}
                <div className="contact-header">
                    <div className="contact-badge">
                        <span className="contact-badge-dot" />
                        <span className="en-text">Get In Touch</span>
                    </div>
                    <h2 className="contact-title">
                        අප හා <span className="contact-title-accent">සම්බන්ධ වන්න</span>
                    </h2>
                    <p className="contact-desc si-text">
                        ඔබට අප හා සම්බන්ධ වීමට අවශ්‍ය නම් හෝ සමාජ සත්කාර සඳහා දායක වීමට කැමති නම්, කරුණාකර පහත තොරතුරු භාවිතා කර අප වෙත පණිවිඩයක් එවන්න.
                    </p>
                </div>

                <div className="contact-content">

                    {/* ── Left Side: Contact Information Cards ── */}
                    <div className="contact-info">

                        <div className="info-card">
                            <div className="info-icon-box">
                                <MapPin size={24} />
                            </div>
                            <div className="info-text">
                                <h3 className="si-text">ප්‍රධාන කාර්යාලය / ලිපිනය</h3>
                                <p className="si-text">ආලෝක මාවත, කුඩාඔය, ශ්‍රී ලංකාව</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon-box">
                                <Headset size={24} />
                            </div>
                            <div className="info-text">
                                <h3 className="si-text">දුරකථන අංක</h3>
                                <p className="en-text">+94 77 123 4567</p>
                                <p className="en-text">+94 34 223 4567</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon-box">
                                <Mail size={24} />
                            </div>
                            <div className="info-text">
                                <h3 className="si-text">විද්‍යුත් තැපෑල</h3>
                                <p className="en-text">info@kudaoyaasarana.lk</p>
                                <p className="en-text">support@kudaoya.org</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <h3 className="si-text">සමාජ මාධ්‍ය හරහා අප හා එක්වන්න</h3>
                            <div className="social-icons-wrapper">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* ── Right Side: Glassmorphism Contact Form ── */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="name" className="form-label si-text">ඔබගේ නම</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="සම්පූර්ණ නම ඇතුළත් කරන්න"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label si-text">විද්‍යුත් තැපෑල</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label si-text">දුරකථන අංකය</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+94 7X XXX XXXX"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label si-text">පණිවිඩය</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-input"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="ඔබගේ අවශ්‍යතාවය හෝ පණිවිඩය මෙහි ලියන්න..."
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-submit">
                                <span className="si-text">පණිවිඩය යවන්න (Send)</span>
                                <Send size={20} />
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
