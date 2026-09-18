import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Heart } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import { slideImages } from '../assets/image';
import '../styles/Hero.css';

/* ── Simple animated counter hook ── */
function useCounter(target, duration = 1800) {
    const [count, setCount] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
            setCount(Math.floor(ease * target));
            if (progress < 1) rafRef.current = requestAnimationFrame(step);
        };
        const delay = setTimeout(() => {
            rafRef.current = requestAnimationFrame(step);
        }, 600);
        return () => {
            clearTimeout(delay);
            cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration]);

    return count;
}

const Hero = () => {
    const members = useCounter(189);
    const years = useCounter(35);
    const lives = useCounter(35);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!slideImages || slideImages.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    const scrollToNext = () => {
        const about = document.getElementById('about');
        if (about) about.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="home">
            {/* ── Background Slideshow ── */}
            <div className="hero-slideshow" aria-hidden="true">
                {slideImages && slideImages.map((imgSrc, index) => (
                    <div
                        key={index}
                        className={`hero-slide-bg ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${imgSrc})` }}
                    />
                ))}
                <div className="hero-slideshow-overlay" />
            </div>

            {/* ── Background Panels ── */}
            <div className="hero-panel-left" aria-hidden="true" />
            <div className="hero-panel-right" aria-hidden="true" />

            {/* ── Ambient Orbs ── */}
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />
            <div className="hero-orb hero-orb-3" aria-hidden="true" />

            {/* ── Grid Overlay ── */}
            <div className="hero-grid" aria-hidden="true" />

            {/* ── Floating Geometry ── */}
            <div className="hero-shapes" aria-hidden="true">
                <div className="hero-shape hero-shape-1" />
                <div className="hero-shape hero-shape-2" />
                <div className="hero-shape hero-shape-3" />
            </div>

            {/* ── Main Grid ── */}
            <div className="hero-inner">

                {/* ══ LEFT — Content ══ */}
                <div className="hero-content">

                    {/* Eyebrow */}
                    <div className="hero-eyebrow">
                        <span className="hero-eyebrow-dot" />
                        <span className="en-text">Empowering Communities Since 1991</span>
                    </div>

                    {/* Title */}
                    <h1 className="hero-title">
                        <span className="hero-title-line1">කුඩාඔය</span>
                        <span className="hero-title-main">
                            <span className="hero-title-accent">අසරණ සරණ</span>
                            {' '}
                            <span className="hero-title-plain">සමිතිය</span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle si-text">
                        නව ලොවක් කරා පියනගන අපගේ ගමනට ඔබත් එක්වන්න.
                        සහයෝගය සහ සංවර්ධනය තුළින් ශක්තිමත් හෙටක්.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-cta">
                        <button className="btn-hero-primary" onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}>
                            <Heart size={18} />
                            <span className="si-text">අප හා එක්වන්න</span>
                            <ArrowRight size={16} />
                        </button>
                        <button className="btn-hero-ghost" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                            <Play size={15} fill="currentColor" />
                            <span className="si-text">ව්‍යාපෘති බලන්න</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="hero-stat-item">
                            <span className="stat-number">{members}+</span>
                            <span className="stat-label si-text">සාමාජිකයින්</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="hero-stat-item">
                            <span className="stat-number">{years}+</span>
                            <span className="stat-label si-text">සේවා වසර</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="hero-stat-item">
                            <span className="stat-number">{lives}+</span>
                            <span className="stat-label si-text">ව්‍යාප්‍රති ගණන</span>
                        </div>
                    </div>
                </div>

                {/* ══ RIGHT — Visual ══ */}
                <div className="hero-visual">
                    {/* Glow behind */}
                    <div className="hero-img-glow" aria-hidden="true" />

                    {/* Main image only */}
                    <div className="hero-img-frame">
                        <img src={heroBg} alt="කුඩාඔය අසරණ සරණ සමිතිය" />
                        <div className="hero-img-overlay" />
                    </div>
                </div>

            </div>



        </section>
    );
};

export default Hero;
