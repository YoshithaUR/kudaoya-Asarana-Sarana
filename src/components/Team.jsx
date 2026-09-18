import { useState, useEffect } from 'react';
import { Facebook, MessageCircle, Phone, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { homeImages, communityMemberImages } from '../assets/image';
import '../styles/Team.css';

// Placeholder images since specific ones aren't provided
const teamMembers = [
    {
        id: 1,
        name: 'සුනිල් විජයානන්ද',
        role: 'සභාපති',
        img: communityMemberImages.sunil,
        quote: <>"1991 දී මා ආරම්භ කළ මෙම අසරණ සරණ සමිතිය, "සතහට සෙත" තේමාව ඔස්සේ එදා සිට අද දක්වා විශාල සේවාවක් ඉටු කර ඇත. ඉදිරියටත් විවිධ ක්ෂේත්‍ර ඔස්සේ ප්‍රදේශවාසී ජනතාවට සෙත සැලසීම සහ එම සිහිනය සැබෑ කරගැනීම මාගේ එකම අරමුණයි."</>,
        icon: <Heart size={16} strokeWidth={2.5} />
    },
    {
        id: 2,
        name: 'අරුණ වික්‍රමරත්න',
        role: 'උප සභාපති',
        img: communityMemberImages.aruna,
        quote: <>"1991 දී මා ආරම්භ කළ මෙම අසරණ සරණ සමිතිය, "සතහට සෙත" තේමාව ඔස්සේ එදා සිට අද දක්වා විශාල සේවාවක් ඉටු කර ඇත. ඉදිරියටත් විවිධ ක්ෂේත්‍ර ඔස්සේ ප්‍රදේශවාසී ජනතාවට සෙත සැලසීම සහ එම සිහිනය සැබෑ කරගැනීම මාගේ එකම අරමුණයි."</>,
        icon: <Heart size={16} strokeWidth={2.5} />
    },

    {
        id: 3,
        name: 'තිලකා කුලසූරිය',
        role: 'ලේකම්',
        img: communityMemberImages.thilaka,
        quote: '"සෑම ජීවිතයකම වටිනාකම හඳුනාගෙන, අත්වැල් බැඳගෙන ගමන් කරමු."',
        icon: <MessageCircle size={16} strokeWidth={2.5} />
    },
    {
        id: 4,
        name: 'අජිත් ජයසූරිය',
        role: 'උප ලේකම්',
        img: communityMemberImages.sunil,
        quote: <>"1991 දී මා ආරම්භ කළ මෙම අසරණ සරණ සමිතිය, "සතහට සෙත" තේමාව ඔස්සේ එදා සිට අද දක්වා විශාල සේවාවක් ඉටු කර ඇත. ඉදිරියටත් විවිධ ක්ෂේත්‍ර ඔස්සේ ප්‍රදේශවාසී ජනතාවට සෙත සැලසීම සහ එම සිහිනය සැබෑ කරගැනීම මාගේ එකම අරමුණයි."</>,
        icon: <Heart size={16} strokeWidth={2.5} />
    },
    {
        id: 5,
        name: 'කරුනාතිලක හෙට්ටිආරච්චි',
        role: 'ගරු භාණ්ඩාගාරික',
        img: 'https://ui-avatars.com/api/?name=S+R&background=1e293b&color=cbd5e1&size=256',
        quote: '"විශ්වාසය හා විනිවිදභාවය අප පදනමේ ප්‍රධාන ශක්තියයි."',
        icon: <Phone size={16} strokeWidth={2.5} />
    },
    // {
    //     id: 4,
    //     name: 'අජිත් දිසානායක',
    //     role: 'ප්‍රධාන සංවිධායක',
    //     img: 'https://ui-avatars.com/api/?name=A+D&background=1e293b&color=cbd5e1&size=256',
    //     quote: '"යහපත් අරමුණු වෙනුවෙන් ජනතාව ඒකරාශී කිරීම අපගේ වගකීමකි."',
    //     icon: <Facebook size={16} strokeWidth={2.5} />
    // }
];

const Team = () => {
    const [activeMember, setActiveMember] = useState(null);
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
        if (activeMember) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % (teamMembers.length - cardsToShow + 1));
        }, 6500);
        return () => clearInterval(interval);
    }, [activeMember, cardsToShow]);

    /* Lock body scroll when modal is open */
    useEffect(() => {
        if (activeMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [activeMember]);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % (teamMembers.length - cardsToShow + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 < 0 ? Math.max(0, teamMembers.length - cardsToShow) : prev - 1));
    };

    return (
        <section className="team" id="team">
            <div
                className="section-bg-image"
                style={{ backgroundImage: `url(${homeImages.img1})` }}
                aria-hidden="true"
            />
            <div className="team-grid-bg" aria-hidden="true" />
            <div className="team-orb" aria-hidden="true" />

            <div className="team-container">
                <div className="team-header">
                    <div className="team-badge">
                        <span className="team-badge-dot" />
                        <span className="en-text">Community Members</span>
                    </div>
                    <h2 className="team-title">
                        අපගේ <span className="team-title-accent">කණ්ඩායම</span>
                    </h2>
                    <p className="team-desc si-text">
                        අපගේ සියලුම ව්‍යාපෘති පිටුපස සිටින ශක්තිය මේ කැපවූ නායකයින් හා සමාජිකයින් බව ආඩම්බරයෙන් සිහිපත් කරමු.
                    </p>
                </div>

                <div className="team-slider-wrapper">
                    <div className="team-slider-viewport">
                        <div
                            className="team-slider-track"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
                            }}
                        >
                            {teamMembers.map(member => (
                                <div
                                    key={member.id}
                                    className="team-slide"
                                    style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                                >
                                    <div className="team-card" onClick={() => setActiveMember(member)}>
                                        <div className="team-avatar-box">
                                            <div className="team-avatar-border" />
                                            <img
                                                src={member.img}
                                                alt={member.name}
                                                className="team-avatar"
                                                loading="lazy"
                                            />
                                            <div className="team-social-icon">
                                                {member.icon}
                                            </div>
                                        </div>
                                        <h3 className="team-name">{member.name}</h3>
                                        <span className="team-role">{member.role}</span>
                                        <p className="team-quote">{member.quote}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="team-slider-controls">
                        <button className="team-nav-btn prev" onClick={prevSlide} aria-label="Previous member">
                            <ChevronLeft size={28} />
                        </button>
                        <button className="team-nav-btn next" onClick={nextSlide} aria-label="Next member">
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── TEAM MEMBER POPUP MODAL ── */}
            <div
                className={`team-modal-overlay ${activeMember ? 'active' : ''}`}
                onClick={() => setActiveMember(null)}
            >
                <div
                    className="team-modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="team-modal-close"
                        onClick={() => setActiveMember(null)}
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>

                    {activeMember && (
                        <div className="team-modal-body">
                            <div className="team-modal-avatar-box">
                                <div className="team-modal-avatar-border" />
                                <img
                                    src={activeMember.img}
                                    alt={activeMember.name}
                                    className="team-modal-avatar"
                                />
                            </div>
                            <span className="team-modal-role">{activeMember.role}</span>
                            <h3 className="team-modal-name">{activeMember.name}</h3>
                            <div className="team-modal-divider" />
                            <p className="team-modal-quote">{activeMember.quote}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Team;
