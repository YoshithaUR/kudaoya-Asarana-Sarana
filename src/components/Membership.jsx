import React from 'react';
import { Download, FileText, UserPlus, CheckCircle } from 'lucide-react';
import '../styles/Membership.css';

const Membership = () => {
    return (
        <section className="membership" id="membership">
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
                        <FileText size={48} className="action-icon" />
                        <h4 className="si-text">සාමාජික අයදුම්පත</h4>
                        <p className="si-text">නව සාමාජිකත්වය සඳහා වන නිල අයදුම්පත මෙතැනින් ලබාගන්න.</p>
                        <a
                            href="/Membership_Application.pdf"
                            download="Membership_Application.pdf"
                            className="btn-download"
                        >
                            <Download size={20} />
                            <span className="si-text">අයදුම්පත බාගත කරන්න</span>
                        </a>
                        <div className="action-features">
                            <div className="feature-item">
                                <CheckCircle size={14} className="feature-icon" />
                                <span className="si-text">ඩිජිටල් පිටපත</span>
                            </div>
                            <div className="feature-item">
                                <CheckCircle size={14} className="feature-icon" />
                                <span className="si-text">නොමිලේ ලබාගත හැක</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Membership;
