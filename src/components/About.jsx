import { useState, useEffect } from 'react';
import { Target, Heart, TrendingUp, ShieldCheck, HeartPulse, ChevronLeft, ChevronRight } from 'lucide-react';
import aboutImg from '../assets/about-img.png';
import '../styles/About.css';

const valuesData = [
    {
        icon: <Heart size={24} strokeWidth={2.5} />,
        title: 'සහයෝගය',
        text: 'එකිනෙකාට උදව් කිරීම'
    },
    {
        icon: <Target size={24} strokeWidth={2.5} />,
        title: 'සේවාව',
        text: 'ප්‍රජාවට කැප වීම'
    },
    {
        icon: <TrendingUp size={24} strokeWidth={2.5} />,
        title: 'සංවර්ධනය',
        text: 'අඛණ්ඩ තිරසාර වර්ධනය'
    },
    {
        icon: <ShieldCheck size={24} strokeWidth={2.5} />,
        title: 'විශ්වාසය',
        text: 'විනිවිදභාවයෙන් යුත් සේවය'
    }
];

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* Auto Play Slider for mobile values */
    useEffect(() => {
        if (!isMobile) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % valuesData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isMobile]);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % valuesData.length);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 < 0 ? valuesData.length - 1 : prev - 1));
    };

    return (
        <section className="about" id="about">

            {/* ── Background Elements ── */}
            <div className="about-grid-bg" aria-hidden="true" />
            <div className="about-orb about-orb-1" aria-hidden="true" />
            <div className="about-orb about-orb-2" aria-hidden="true" />

            <div className="about-container">

                {/* ── Section Header ── */}
                <div className="about-header">
                    <div className="about-badge">
                        <span className="about-badge-dot" />
                        <span className="en-text">Our Story</span>
                    </div>
                    <h2 className="about-title">
                        අපි <span className="about-title-accent">කවුද?</span>
                    </h2>
                    <p className="about-desc si-text">
                        කුඩාඔය අසරණ සරණ සමිතිය යනු හුදෙක් සංවිධානයක් පමණක් නොව, ජීවිත ආලෝකමත් කරන,
                        ප්‍රජාව වෙනුවෙන් දහඩිය හෙලන සැබෑ මානුෂීය බැඳීමකි.
                    </p>
                </div>

                {/* ── Content Grid ── */}
                <div className="about-content">

                    {/* Left: Text & Values */}
                    <div className="about-text-block">
                        <h3 className="si-text">අපගේ ප්‍රධාන <span style={{ color: '#a5b4fc' }}>මෙහෙවර</span></h3>

                        <p className="about-body-text si-text">
                            සමාජයේ අසරණ අයට සහන සැලසීම සහ ප්‍රජාව සංවර්ධනය කිරීම අපගේ ප්‍රධාන අරමුණයි.
                            අපි විශ්වාස කරන්නේ එක්ව වැඩ කිරීමෙන් අපට වඩා හොඳ, ශක්තිමත් අනාගතයක් ගොඩනගා ගත හැකි බවයි.
                        </p>
                        <p className="about-body-text si-text">
                            වසර ගණනාවක අත්දැකීම් සමඟින්, අධ්‍යාපනය, සෞඛ්‍ය සේවා සහ සමාජ සවිබල ගැන්වීම් ව්‍යාපෘති හරහා
                            දහස් ගණනකගේ ජීවිත වෙනස් කිරීමට අපට හැකි වී තිබේ. අපගේ සෑම පියවරක්ම ඔබ වෙනුවෙනි.
                        </p>

                        {/* Value Cards Slider / Grid */}
                        <div className={`about-values-container ${isMobile ? 'is-slider' : ''}`}>
                            <div
                                className="about-values-track"
                                style={isMobile ? { transform: `translateX(-${currentIndex * 100}%)` } : {}}
                            >
                                {valuesData.map((val, idx) => (
                                    <div key={idx} className="about-value-slide">
                                        <div className="about-value-card">
                                            <div className="value-icon-box">
                                                {val.icon}
                                            </div>
                                            <h4 className="value-title si-text">{val.title}</h4>
                                            <p className="value-text si-text">{val.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {isMobile && (
                                <div className="about-slider-controls">
                                    <button className="slider-nav-btn prev" onClick={prevSlide}>
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button className="slider-nav-btn next" onClick={nextSlide}>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Visual Layout */}
                    <div className="about-visual">
                        <div className="about-img-glow" aria-hidden="true" />

                        <div className="about-img-frame">
                            <img src={aboutImg} alt="Kudaoya Community Support" />
                            <div className="img-overlay" style={{ background: 'linear-gradient(to top, rgba(3,5,13,0.8), transparent)' }}></div>
                        </div>

                        {/* Floating Badge Overlay */}
                        <div className="about-float-badge">
                            <div className="float-badge-icon">
                                <HeartPulse size={22} color="#fff" strokeWidth={2.5} />
                            </div>
                            <div className="float-badge-info">
                                <h4 className="en-text">100%</h4>
                                <p className="si-text">ප්‍රජා කැපවීම</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
