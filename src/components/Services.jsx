import { useState, useEffect } from 'react';
import {
    BookOpen, Stethoscope, Users, Briefcase, Sprout,
    HeartHandshake, ArrowRight, X, Info, ChevronLeft, ChevronRight
} from 'lucide-react';
import '../styles/Services.css';

const servicesData = [
    {
        id: 1,
        icon: <BookOpen size={30} strokeWidth={2.2} />,
        title: 'අධ්‍යාපන සහාය',
        shortDesc: 'දරුවන්ගේ අධ්‍යාපනය සඳහා ශිෂ්‍යත්ව සහ අධ්‍යාපන ද්‍රව්‍ය ලබා දීම',
        longDesc: 'ප්‍රදේශයේ ආර්ථික අපහසුතා ඇති දරුවන්ගේ අධ්‍යාපන කටයුතු සාර්ථක කරගැනීම සඳහා අවශ්‍ය පොත්පත්, පාසල් උපකරණ මෙන්ම විශේෂ ශිෂ්‍යත්ව ලබා දීමේ ව්‍යාපෘතියක් අප මෙහෙයවනු ලබයි.',
        details: [
            { h: "වාර්ෂික ශිෂ්‍යත්ව", p: "උසස් පෙළ සහ සාමාන්‍ය පෙළ සමත් දරුවන් සඳහා මූල්‍ය ආධාර." },
            { h: "පොත්පත් ලබාදීම", p: "නව වසර ආරම්භයේදී පාසල් උපකරණ බෙදාදීම." }
        ],
        bullets: [
            "අමතර පන්ති පැවැත්වීම",
            "වෘත්තීය මාර්ගෝපදේශන සම්මන්ත්‍රණ",
            "පුස්තකාල සඳහා පොත් පරිත්‍යාග කිරීම"
        ]
    },
    {
        id: 2,
        icon: <Stethoscope size={30} strokeWidth={2.2} />,
        title: 'සෞඛ්‍ය සේවා',
        shortDesc: 'නොමිලේ සෞඛ්‍ය පරීක්ෂණ සහ වෛද්‍ය උපදෙස් ලබා දීම',
        longDesc: 'රෝගී වූ හෝ සෞඛ්‍ය පහසුකම් අඩු වැඩිහිටියන් හා දරුවන් ඉලක්ක කරගෙන නිරන්තරයෙන් වෛද්‍ය කඳවුරු සහ අක්ෂි සායන පවත්වමින් සෞඛ්‍ය නංවාලීමට කටයුතු කරමු.',
        details: [
            { h: "වෛද්‍ය කඳවුරු", p: "විශේෂඥ වෛද්‍යවරුන්ගේ සහභාගීත්වයෙන් නොමිලේ පරීක්ෂණ." },
            { h: "ඖෂධ සැපයීම", p: "දිගුකාලීන රෝගීන් සඳහා අවශ්‍ය ඖෂධ ලබා දීම." }
        ],
        bullets: [
            "ලේ දන් දීමේ කඳවුරු සංවිධානය",
            "අක්ෂි කාච සහ ඇස් කණ්නාඩි ප්‍රදානය",
            "ළමා මන්දපෝෂණය පිටුදැකීමේ වැඩසටහන්"
        ]
    },
    {
        id: 3,
        icon: <Users size={30} strokeWidth={2.2} />,
        title: 'ප්‍රජා සංවර්ධනය',
        shortDesc: 'ප්‍රජාව සංවර්ධනය කිරීම සඳහා විවිධ ව්‍යාපෘති ක්‍රියාත්මක කිරීම',
        longDesc: 'අපගේ ගම්මානයේ යටිතල පහසුකම් නැංවීම සහ පිරිසිදු පරිසරයක් නිර්මාණය කිරීම සඳහා අපි ගමේ සියලු දෙනා එක්ව විවිධ ශ්‍රමදාන සහ සංවර්ධන කටයුතු සිදු කරමු.',
        details: [
            { h: "ශ්‍රමදාන ජංගම", p: "පොදු ස්ථාන පිරිසිදු කිරීම සහ මාර්ග ප්‍රතිසංස්කරණය." },
            { h: "පිරිසිදු ජලය", p: "පානීය ජල ව්‍යාපෘති ඇති කිරීම." }
        ],
        bullets: [
            "පන්සල, පාසල වැනි පොදු ස්ථාන අලුත්වැඩියාව",
            "පරිසර සුරැකීමේ සහ ගස් සිටුවීමේ වැඩසටහන්",
            "ග්‍රාමීය විදුලි හා ජල යටිතල පහසුකම් දියුණු කිරීම"
        ]
    },
    {
        id: 4,
        icon: <Briefcase size={30} strokeWidth={2.2} />,
        title: 'රැකියා අවස්ථා',
        shortDesc: 'තරුණ තරුණියන් සඳහා රැකියා පුහුණු වැඩසටහන් සහ අවස්ථා',
        longDesc: 'ගමේ විරැකියාවෙන් පෙළෙන තරුණ තරුණියන්ට වෘත්තීය පුහුණු අවස්ථා සඳහා යොමු කිරීමෙන් ඔවුන්ගේ අනාගතය සාර්ථක කර ගැනීමට අපි පියවර ගනිමු.',
        details: [
            { h: "පුහුණු කඳවුරු", p: "පරිගණක හා කාර්මික පුහුණු වැඩසටහන්." },
            { h: "ස්වයං රැකියා", p: "කාන්තාවන් සඳහා ස්වයං රැකියා උපදෙස්." }
        ],
        bullets: [
            "රැකියා බැංකුවක් පවත්වාගෙන යාම",
            "වෘත්තීය පුහුණු අධිකාරිය සමඟ සම්බන්ධ කිරීම",
            "ප්‍රාග්ධන ආධාර සැපයීම"
        ]
    },
    {
        id: 5,
        icon: <Sprout size={30} strokeWidth={2.2} />,
        title: 'කෘෂිකර්ම සහාය',
        shortDesc: 'ගොවීන්ට නවීන කෘෂිකර්ම තාක්ෂණය හඳුන්වා දීම',
        longDesc: 'අපේ ගමේ ප්‍රධාන ජීවනෝපාය වන කෘෂිකර්මාන්තය නඟා සිටුවීම වෙනුවෙන් ගොවි මහතුන්ට අවශ්‍ය උපදෙස්, බීජ සහ පොහොර ලබා දීම සිදු කරමු.',
        details: [
            { h: "නවීන ක්‍රම", p: "කාබනික ගොවිතැන පිළිබඳ දැනුවත් කිරීම්." },
            { h: "පොහොර සහ බීජ", p: "ගොවීන්ට සහන මිලට කෘෂි ද්‍රව්‍ය ලබා දීම." }
        ],
        bullets: [
            "දේශීය බීජ සංරක්ෂණය කිරීම",
            "කෘෂිකර්ම උපදේශකවරුන් සම්බන්ධ කිරීම",
            "ගෙවතු වගා තරඟ සහ දිරිගැන්වීම්"
        ]
    },
    {
        id: 6,
        icon: <HeartHandshake size={30} strokeWidth={2.2} />,
        title: 'වැඩිහිටි සත්කාර',
        shortDesc: 'වැඩිහිටියන් සඳහා විශේෂ සත්කාර වැඩසටහන්',
        longDesc: 'අසරණ සහ හුදෙකලා වූ වැඩිහිටියන් වෙනුවෙන් විශේෂ සත්කාර වැඩසටහන් ක්‍රියාත්මක කරමින් ඔවුන්ට මානසික සහ ශාරීරික සැනසිල්ලක් ලබා දීමට අපි කටයුතු කරමු.',
        details: [
            { h: "ශාරීරික සෞඛ්‍ය", p: "මාසිකව සෞඛ්‍ය පරීක්ෂණ සහ ඖෂධ ලබා දීම." },
            { h: "මානසික සහන", p: "වන්දනා ගමන් සහ ආගමික වැඩසටහන්." }
        ],
        bullets: [
            "වියළි ආහාර මලු බෙදා දීම",
            "වැඩිහිටි නිවාස වෙත ද්‍රව්‍ය පරිත්‍යාග",
            "ඇස් කණ්නාඩි සහ රෝද පුටු ලබා දීම"
        ]
    }
];

const Services = () => {
    const [activeService, setActiveService] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(3);

    /* Responsiveness for slider */
    useEffect(() => {
        const updateCards = () => {
            if (window.innerWidth < 768) setCardsToShow(1);
            else if (window.innerWidth < 1024) setCardsToShow(2);
            else setCardsToShow(3);
        };
        updateCards();
        window.addEventListener('resize', updateCards);
        return () => window.removeEventListener('resize', updateCards);
    }, []);

    /* Auto Play Slider */
    useEffect(() => {
        if (activeService) return; // pause if modal open
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % Math.max(1, servicesData.length - cardsToShow + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [activeService, cardsToShow]);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % Math.max(1, servicesData.length - cardsToShow + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 < 0 ? Math.max(0, servicesData.length - cardsToShow) : prev - 1));
    };

    /* Lock body scroll when modal is open */
    useEffect(() => {
        if (activeService) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [activeService]);

    return (
        <section className="services" id="services">

            {/* ── BG & Orbs ── */}
            <div className="services-grid-bg" aria-hidden="true" />
            <div className="services-orb" aria-hidden="true" />

            <div className="services-container">

                {/* ── Header ── */}
                <div className="services-header">
                    <div className="services-badge">
                        <span className="services-badge-dot" />
                        <span className="en-text">What We Do</span>
                    </div>
                    <h2 className="services-title">
                        අපගේ <span className="services-title-accent">සේවාවන්</span>
                    </h2>
                    <p className="services-desc si-text">
                        ප්‍රජාවේ උන්නතිය උදෙසා අප විසින් අඛණ්ඩව දියත් කරනු ලබන ප්‍රජා සත්කාරක ව්‍යාපෘති සහ සේවාවන්.
                    </p>
                </div>

                {/* ── Slider ── */}
                <div className="services-slider-wrapper">

                    <div className="services-slider-viewport">
                        <div
                            className="services-slider-track"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
                            }}
                        >
                            {servicesData.map((svc) => (
                                <div
                                    key={svc.id}
                                    className="service-slide"
                                    style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                                >
                                    <div className="service-card">
                                        <div className="service-icon-box">
                                            {svc.icon}
                                        </div>
                                        <h3 className="service-title si-text">{svc.title}</h3>
                                        <p className="service-description si-text">{svc.shortDesc}</p>

                                        <button
                                            className="btn-service-learn en-text"
                                            onClick={() => setActiveService(svc)}
                                        >
                                            Learn More
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="services-slider-controls">
                        <button className="slider-nav-btn prev" onClick={prevSlide} aria-label="Previous service">
                            <ChevronLeft size={28} />
                        </button>
                        <button className="slider-nav-btn next" onClick={nextSlide} aria-label="Next service">
                            <ChevronRight size={28} />
                        </button>
                    </div>

                </div>

            </div>

            {/* ── FULL SCREEN MODAL ACTING AS "PAGE" ── */}
            <div
                className={`service-modal-overlay ${activeService ? 'active' : ''}`}
                onClick={() => setActiveService(null)}
            >
                <div
                    className="service-modal-content"
                    onClick={(e) => e.stopPropagation()} /* Prevent closing on panel click */
                >
                    <button
                        className="btn-modal-close"
                        onClick={() => setActiveService(null)}
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>

                    {activeService && (
                        <>
                            {/* Modal Header */}
                            <div className="modal-header">
                                <div className="modal-icon-box">
                                    {activeService.icon}
                                </div>
                                <h2 className="modal-title si-text">{activeService.title}</h2>
                                <p className="modal-short-desc si-text">
                                    {activeService.longDesc}
                                </p>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body">
                                <h3 className="modal-section-title si-text">
                                    <Info size={18} color="#22d3ee" />
                                    ප්‍රධාන අංශ
                                </h3>

                                <div className="modal-details-grid">
                                    {activeService.details.map((detail, idx) => (
                                        <div key={idx} className="modal-info-card">
                                            <h4>{detail.h}</h4>
                                            <p>{detail.p}</p>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="modal-section-title si-text" style={{ marginTop: '1rem', color: '#cbd5e1' }}>
                                    වැඩසටහන් ඇතුළත් වන්නේ:
                                </h3>
                                <ul className="modal-bullet-list">
                                    {activeService.bullets.map((bullet, idx) => (
                                        <li key={idx} className="si-text">{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </section>
    );
};

export default Services;
