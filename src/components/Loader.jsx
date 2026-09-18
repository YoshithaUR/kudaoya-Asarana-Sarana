import React, { useState, useEffect } from 'react';
import { logoImg } from '../assets/image';
import '../styles/Loader.css';

const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setFadeOut(true), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    if (fadeOut && progress >= 100) return null;

    return (
        <div className={`loader-wrapper ${fadeOut ? 'fade-out' : ''}`}>
            <div className="loader-content">
                {/* Logo Animation */}
                <div className="loader-logo-container">
                    <div className="loader-glow"></div>
                    <div className="loader-circle-outer"></div>
                    <div className="loader-circle-inner"></div>
                    <img src={logoImg} alt="Loading..." className="loader-logo-img" />
                </div>

                {/* Text Branding */}
                <div className="loader-text">
                    <h2 className="si-text">කුඩාඔය අසරණ සරණ</h2>
                    <p className="si-text">සමාජ සේවා සමිතිය</p>
                </div>

                {/* Progress Bar */}
                <div className="loader-progress-container">
                    <div className="loader-progress-bar" style={{ width: `${progress}%` }}></div>
                    <div className="loader-progress-text">{progress}%</div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
