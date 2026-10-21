import React from 'react';
import { Download, FileText, UserPlus, Eye } from 'lucide-react';
import { joinsection } from '../assets/image';
import { membershipFormPdf } from '../assets/image';
import '../styles/Membership.css';

const Membership = () => {

    const handleGetForm = () => {
        // Open for viewing in a new tab
        window.open(membershipFormPdf, '_blank', 'noopener,noreferrer');

        // Trigger download
        const link = document.createElement('a');
        link.href = membershipFormPdf;
        link.download = 'kudaoyaAsaranaSarana.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

                        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                            {/* PDF icon */}
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: 'rgba(99, 102, 241, 0.18)',
                                color: '#818CF8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.25rem'
                            }}>
                                <FileText size={30} />
                            </div>

                            <h4 className="si-text" style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                                ඔන්ලයින් සාමාජික අයදුම්පත
                            </h4>
                            <p className="si-text" style={{ color: '#cbd5e1', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                සාමාජික අයදුම්පත PDF ලෙස බාගත කර,<br />
                                නිවැරදිව සම්පූර්ණ කර අපව භාර දෙන්න.
                            </p>

                            <button
                                id="get-membership-form-btn"
                                className="btn-download"
                                onClick={handleGetForm}
                                style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <Eye size={18} />
                                <span className="si-text">අයදුම්පත ලබාගන්න</span>
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Membership;
