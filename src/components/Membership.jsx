import React, { useState } from 'react';
import { Download, FileText, UserPlus, CheckCircle, Send, Check } from 'lucide-react';
import { joinsection } from '../assets/image';
import { useData } from '../context/DataContext';
import '../styles/Membership.css';

const Membership = () => {
    const { addArrayItem } = useData();
    const [formData, setFormData] = useState({ name: '', nic: '', phone: '', address: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addArrayItem('memberships', {
            ...formData,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
        });
        setSubmitted(true);
        setFormData({ name: '', nic: '', phone: '', address: '' });
    };

    return (
        <section className="membership" id="membership">
            {/* ── Background Image & Black Overlay ── */}
            <div className="membership-bg-image" style={{ backgroundImage: `url(${joinsection})` }} aria-hidden="true">
                <div className="membership-bg-overlay" />
            </div>

            <div className="membership-container container">
                <div className="membership-header">
                    <div className="membership-badge">
                        <span className="membership-badge-dot"></span>
                        <span className="en-text">Join Our Community</span>
                    </div>
                    <h2 className="membership-title si-text">අප සමඟ <span className="membership-title-accent">එක්වන්න</span></h2>
                    <p className="membership-desc si-text">
                        අපගේ සමිතියේ සාමාජිකත්වය ලබා ගැනීම මගින් ඔබටත් ප්‍රජා සංවර්ධන කටයුතු සඳහා දායක විය හැකිය.
                    </p>
                </div>

                <div className="membership-content">
                    <div className="membership-steps">
                        <div className="step-item">
                            <div className="step-icon-box">
                                <Download size={24} />
                            </div>
                            <div className="step-text">
                                <h3 className="si-text">01. අයදුම්පත බාගත කරන්න</h3>
                                <p className="si-text">පහත බොත්තම මගින් සාමාජික අයදුම්පත (PDF) බාගත කරගන්න.</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-icon-box">
                                <FileText size={24} />
                            </div>
                            <div className="step-text">
                                <h3 className="si-text">02. තොරතුරු සම්පූර්ණ කරන්න</h3>
                                <p className="si-text">අයදුම්පතේ ඇති සියලුම තොරතුරු නිවැරදිව සම්පූර්ණ කරන්න.</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-icon-box">
                                <UserPlus size={24} />
                            </div>
                            <div className="step-text">
                                <h3 className="si-text">03. අපට භාර දෙන්න</h3>
                                <p className="si-text">සම්පූර්ණ කරන ලද අයදුම්පත අපගේ කාර්යාලයට හෝ ලේකම් වෙත භාර දෙන්න.</p>
                            </div>
                        </div>
                    </div>

                    <div className="membership-action-card">
                        <div className="action-card-glow"></div>

                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                    <Check size={28} />
                                </div>
                                <h4 className="si-text" style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>අයදුම්පත සාර්ථකව යොමු කරන ලදී!</h4>
                                <p className="si-text" style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem' }}>ඔබගේ සාමාජික අයදුම්පත අපගේ පරිපාලක මණ්ඩලය වෙත ලැබී ඇත.</p>
                                <button className="btn-download" style={{ border: 'none', cursor: 'pointer' }} onClick={() => setSubmitted(false)}>
                                    තවත් අයදුම්පතක් යොමු කරන්න
                                </button>
                            </div>
                        ) : (
                            <>
                                <h4 className="si-text" style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.2rem' }}>ඔන්ලයින් සාමාජික අයදුම්පත</h4>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', textAlign: 'left' }}>
                                    <input
                                        type="text"
                                        placeholder="ඔබගේ සම්පූර්ණ නම"
                                        required
                                        className="membership-input"
                                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.88rem' }}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            placeholder="ජා.හැ. අංකය (NIC)"
                                            required
                                            style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.88rem' }}
                                            value={formData.nic}
                                            onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="දුරකථන අංකය"
                                            required
                                            style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.88rem' }}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="ලිපිනය"
                                        required
                                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.88rem' }}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                    <button type="submit" className="btn-download" style={{ border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
                                        <Send size={18} />
                                        <span className="si-text">අයදුම්පත යොමු කරන්න</span>
                                    </button>
                                </form>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <a href="/Membership_Application.pdf" download="Membership_Application.pdf" style={{ color: '#818CF8', fontSize: '0.82rem', textDecoration: 'underline' }}>
                                        හෝ PDF අයදුම්පත බාගත කරන්න
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Membership;
