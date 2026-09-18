import React, { useState } from 'react';
import {
    Calendar, Award, Users, Heart, ShieldCheck, Milestone,
    ArrowLeft, ChevronRight, BookOpen, Sparkles, CheckCircle2, History as HistoryIcon
} from 'lucide-react';
import { homeImages, communityMemberImages, logoImg } from '../assets/image';
import '../styles/HistoryPage.css';

const milestones = [
    {
        year: '1991',
        title: 'සමිති අත්තිවාරම පිහිටුවීම',
        subtitle: 'Foundation of Kudaoya Asarana Sarana',
        description: 'කුඩාඔය ප්‍රදේශයේ ආපදාවට පත්, අසරණ වූ ගම්වාසීන්ට සහ අනාථ පවුල් සඳහා අත්වැලක් වීම උදෙසා ග්‍රාමීය ප්‍රධානීන්දෙපළකගේ මූලිකත්වයෙන් සමිතිය ආරම්භ කරන ලදී.',
        icon: Calendar,
        color: '#6366F1'
    },
    {
        year: '1998',
        title: 'නොමිලේ අවමංගල්‍යාධාර අරමුදල',
        subtitle: 'Free Funeral Aid & Relief Fund',
        description: 'දුෂ්කර අවස්ථාවලදී සාමාජික පවුල්වල සියලුම බර දැරීම සඳහා නිල අවමංගල්‍යාධාර සහ හදිසි සහන අරමුදල පිහිටුවන ලදී.',
        icon: Heart,
        color: '#EC4899'
    },
    {
        year: '2005',
        title: 'ප්‍රජා ශාලාව හා පුස්තකාලය',
        subtitle: 'Community Hall & Library Opening',
        description: 'ගම්මානයේ දූ දරුවන්ගේ අධ්‍යාපනික අවශ්‍යතා සඳහා නොමිලේ පොත්පත් කියවීමේ පුස්තකාලයක් සහ ප්‍රජා රැස්වීම් ශාලාවක් ඉදි කරන ලදී.',
        icon: BookOpen,
        color: '#10B981'
    },
    {
        year: '2012',
        title: 'වාර්ෂික ශිෂ්‍යත්ව වැඩසටහන',
        subtitle: 'Annual Educational Scholarship Project',
        description: 'අඩු ආදායම්ලාභී පවුල්වල දක්ෂ පාසල් දරුවන් සඳහා වාර්ෂිකව පොත්පත්, පාසල් උපකරණ සහ ශිෂ්‍යත්ව පිරිනැමීම ආරම්භ කරන ලදී.',
        icon: Award,
        color: '#F59E0B'
    },
    {
        year: '2018',
        title: 'ආපදා සහන සහ වෛද්‍ය අරමුදල',
        subtitle: 'Disaster Relief & Medical Assistance',
        description: 'ස්වාභාවික ආපදා සහ බරපතල රෝගාබාධවලදී පවුල් සඳහා හදිසි මූල්‍යාධාර සහ වෛද්‍ය ආධාර ලබාදීමේ විශේෂ වැඩසටහන පුළුල් කිරීම.',
        icon: ShieldCheck,
        color: '#3B82F6'
    },
    {
        year: '2026',
        title: 'ඩිජිටල්කරණය සහ වසර 35 ක අභිමානය',
        subtitle: 'Digital Transformation & 35th Anniversary',
        description: 'නවීන තාක්ෂණය ඔස්සේ සමිති සේවාවන් ඩිජිටල්කරණය කරමින් 189+ කට අධික සක්‍රීය සාමාජික පදනමකින් නව අනාගතයක් කරා ගමන් කිරීම.',
        icon: Sparkles,
        color: '#8B5CF6'
    }
];

const historicalStats = [
    { number: '1991', label: 'ආරම්භ කළ වර්ෂය', sublabel: 'Established Year' },
    { number: '35+', label: 'වසරක අඛණ්ඩ සේවය', sublabel: 'Years of Dedicated Service' },
    { number: '189+', label: 'සක්‍රීය සාමාජිකයින්', sublabel: 'Active Members' },
    { number: '500+', label: 'සෙත සැලසු පවුල් ගණන', sublabel: 'Families Empowered' }
];

const founders = [
    {
        name: 'සුනිල් රත්නායක මහතා',
        role: 'සභාපති (Sabahapathi)',
        period: '2010 - වර්තමානය',
        desc: 'සමිති ඉතිහාසයේ විප්ලවීය ප්‍රජා මෙහෙවරක් ඉටුකරමින් සාමාජිකයින් 180+ දක්වා වැඩි කිරීමට මූලිකත්වය දැක්වීය.',
        image: communityMemberImages.sunil
    },
    {
        name: 'අරුණ ශාන්ත මහතා',
        role: 'ලේකම් (Lekam)',
        period: '2015 - වර්තමානය',
        desc: 'ගම්මානයේ තරුණ ප්‍රජාව සවිබල ගැන්වීම සහ ශිෂ්‍යත්ව ව්‍යාපෘති සාර්ථකව මෙහෙයවීම.',
        image: communityMemberImages.aruna
    },
    {
        name: 'තිලකා ධර්මවර්ධන මහත්මිය',
        role: 'භාණ්ඩාගාරික (Bhandagarika)',
        period: '2018 - වර්තමානය',
        desc: 'සමිති මූල්‍ය විනිවිදභාවය සහ අරමුදල් කළමනාකරණය ඉහළම මට්ටමෙන් පවත්වාගෙන යාම.',
        image: communityMemberImages.thilaka
    }
];

const HistoryPage = ({ onNavigate }) => {
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    return (
        <div className="history-page">
            {/* ── Background Decorative Elements ── */}
            <div className="history-orb history-orb-1" aria-hidden="true" />
            <div className="history-orb history-orb-2" aria-hidden="true" />

            {/* ── Hero Banner Section ── */}
            <section className="history-hero">
                <div className="container">
                    <button
                        className="btn-back-home"
                        onClick={() => onNavigate ? onNavigate('home', '#home') : window.location.hash = '#home'}
                    >
                        <ArrowLeft size={16} />
                        <span className="si-text">මුල් පිටුවට ආපසු</span>
                    </button>

                    <div className="history-hero-content">
                        <div className="history-badge">
                            <HistoryIcon size={16} />
                            <span className="en-text">ESTABLISHED 1991 | REG NO: KAS/1991/08</span>
                        </div>

                        <h1 className="history-title si-text">
                            අපගේ <span className="title-gradient">ඓතිහාසික ගමන</span>
                        </h1>

                        <p className="history-subtitle si-text">
                            1991 වසරේ සිට කුඩාඔය ගම්මානයේ අසරණ වූවන් හට සෙත සලසමින්, එකමුතුකම සහ සමාජ මෙහෙවර තුළින් ගොඩනැගූ වසර 35 ක අභිමානවත් ඉතිහාසය.
                        </p>

                        {/* Quick Stats Grid */}
                        <div className="history-stats-grid">
                            {historicalStats.map((stat, idx) => (
                                <div className="history-stat-card" key={idx}>
                                    <span className="stat-value">{stat.number}</span>
                                    <span className="stat-title si-text">{stat.label}</span>
                                    <span className="stat-sub">{stat.sublabel}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Origin Narrative Section ── */}
            <section className="history-narrative section-padding">
                <div className="container">
                    <div className="narrative-grid">
                        <div className="narrative-image-block">
                            <div className="narrative-img-frame">
                                <img src={homeImages.img1} alt="Kudaoya Samithiya Early Days" />
                                <div className="narrative-img-badge">
                                    <span className="badge-year">1991</span>
                                    <span className="badge-txt si-text">ආරම්භක වර්ෂය</span>
                                </div>
                            </div>
                        </div>

                        <div className="narrative-text-block">
                            <div className="section-eyebrow">
                                <span className="eyebrow-dot" />
                                <span className="si-text">ආරම්භක පදනම</span>
                            </div>
                            <h2 className="narrative-heading si-text">
                                කුඩාඔය අසරණ සරණ සමිතිය <span className="text-highlight">ආරම්භ වූ ආකාරය</span>
                            </h2>
                            <p className="narrative-desc si-text">
                                1991 වර්ෂයේදී කුඩාඔය ගම්මානයේ පැවැති ආර්ථික හා සමාජයීය අභියෝග හමුවේ, දුෂ්කරතාවලට මුහුණ දුන් ගම්වාසීන්ට උපකාර කිරීම සඳහා ගමේ වැඩිහිටියන් හා ප්‍රජා නායකයින් එක්ව මෙම සමිතිය ආරම්භ කරන ලදී.
                            </p>
                            <p className="narrative-desc si-text">
                                ආරම්භයේදී සාමාජිකයින් 15 දෙනෙකුගෙන් පමණක් ඇරඹි මෙම සංවිධානය, අද වන විට සාමාජික පවුල් 189 කට වැඩි සංඛ්‍යාවකට නොමිලේ අවමංගල්‍යාධාර, සෞඛ්‍ය පහසුකම්, ශිෂ්‍යත්ව සහ හදිසි ආපදා සහන සලසන ප්‍රදේශයේ ප්‍රධානතම සමාජ සේවා සමිතිය බවට පත්ව ඇත.
                            </p>

                            <div className="narrative-highlights">
                                <div className="highlight-item">
                                    <CheckCircle2 size={20} className="check-icon" />
                                    <span className="si-text">විනිවිදභාවයෙන් යුතු මූල්‍ය කළමනාකරණය</span>
                                </div>
                                <div className="highlight-item">
                                    <CheckCircle2 size={20} className="check-icon" />
                                    <span className="si-text">සියලුම ගම්වාසීන් උදෙසා සමාන සැලකිල්ල</span>
                                </div>
                                <div className="highlight-item">
                                    <CheckCircle2 size={20} className="check-icon" />
                                    <span className="si-text">අඛණ්ඩව වසර 35 ක් පුරා පැවැති සේවාව</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Chronological Timeline Section ── */}
            <section className="history-timeline-section section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle-badge si-text">ඓතිහාසික සන්ධිස්ථාන</span>
                        <h2 className="section-main-title si-text">
                            වසර 35 ක <span className="title-gradient">අභිමානවත් කාලරාමුව</span>
                        </h2>
                        <p className="section-desc si-text">
                            1991 සිට වර්තමානය දක්වා කුඩාඔය අසරණ සරණ සමිතිය ලබාගත් සුවිශේෂී ජයග්‍රහණ සහ සංවර්ධන සන්ධිස්ථාන.
                        </p>
                    </div>

                    <div className="timeline-container">
                        <div className="timeline-line" />
                        {milestones.map((item, index) => {
                            const IconComp = item.icon;
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    className={`timeline-item ${isEven ? 'left' : 'right'}`}
                                    onClick={() => setSelectedMilestone(item)}
                                >
                                    <div className="timeline-dot" style={{ borderColor: item.color, backgroundColor: item.color }}>
                                        <IconComp size={16} color="#fff" />
                                    </div>

                                    <div className="timeline-card">
                                        <div className="timeline-year" style={{ color: item.color }}>{item.year}</div>
                                        <h3 className="timeline-title si-text">{item.title}</h3>
                                        <h4 className="timeline-subtitle en-text">{item.subtitle}</h4>
                                        <p className="timeline-desc si-text">{item.description}</p>
                                        <button className="timeline-btn-more si-text" onClick={() => setSelectedMilestone(item)}>
                                            <span>වැඩිදුර විස්තර</span>
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Leadership & Founders Section ── */}
            <section className="history-leaders section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle-badge si-text">අපගේ නායකත්වය</span>
                        <h2 className="section-main-title si-text">
                            සමිතිය මෙහෙයවූ <span className="title-gradient">ප්‍රජා නායකයින්</span>
                        </h2>
                        <p className="section-desc si-text">
                            කුඩාඔය සමිතියේ අභිවෘද්ධිය උදෙසා කැපවීමෙන් කටයුතු කළ සභාපතිවරුන් සහ නිලධාරී මණ්ඩලය.
                        </p>
                    </div>

                    <div className="founders-grid">
                        {founders.map((person, idx) => (
                            <div className="founder-card" key={idx}>
                                <div className="founder-img-wrapper">
                                    <img src={person.image} alt={person.name} />
                                    <span className="founder-period">{person.period}</span>
                                </div>
                                <div className="founder-info">
                                    <h3 className="founder-name si-text">{person.name}</h3>
                                    <span className="founder-role si-text">{person.role}</span>
                                    <p className="founder-desc si-text">{person.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Historical Photo Archives ── */}
            <section className="history-gallery section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle-badge si-text">ඓතිහාසික මතකයන්</span>
                        <h2 className="section-main-title si-text">
                            අපගේ <span className="title-gradient">ඡායාරූප එකතුව</span>
                        </h2>
                    </div>

                    <div className="history-gallery-grid">
                        <div className="gallery-card">
                            <img src={homeImages.img1} alt="Historic Assembly" />
                            <div className="gallery-overlay">
                                <span className="gallery-year">1991 - 2000</span>
                                <h4 className="si-text">ආරම්භක සමිති රැස්වීම්</h4>
                            </div>
                        </div>
                        <div className="gallery-card">
                            <img src={homeImages.img2} alt="Community Hall Opening" />
                            <div className="gallery-overlay">
                                <span className="gallery-year">2005</span>
                                <h4 className="si-text">ප්‍රජා ශාලාව විවෘත කිරීම</h4>
                            </div>
                        </div>
                        <div className="gallery-card">
                            <img src={homeImages.img3} alt="Scholarship Distribution" />
                            <div className="gallery-overlay">
                                <span className="gallery-year">2018</span>
                                <h4 className="si-text">ශිෂ්‍යත්ව ප්‍රදානෝත්සවය</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Bottom Call to Action ── */}
            <section className="history-cta-section">
                <div className="container text-center">
                    <div className="cta-box">
                        <img src={logoImg} alt="Logo" className="cta-logo" />
                        <h2 className="si-text">අපගේ ඉතිහාසයේ කොටස්කරුවෙකු වන්න</h2>
                        <p className="si-text">
                            ඔබත් කුඩාඔය අසරණ සරණ සමිතිය හා එක්වී ඉදිරි අනාගතය වෙනුවෙන් සමාජ මෙහෙවරට දායක වන්න.
                        </p>
                        <div className="cta-buttons">
                            <button
                                className="btn-cta-primary si-text"
                                onClick={() => onNavigate ? onNavigate('home', '#membership') : window.location.hash = '#membership'}
                            >
                                <Heart size={18} />
                                <span>සමිතියට එක්වන්න</span>
                            </button>
                            <button
                                className="btn-cta-secondary si-text"
                                onClick={() => onNavigate ? onNavigate('home', '#home') : window.location.hash = '#home'}
                            >
                                <span>මුල් පිටුවට යන්න</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Detail Modal ── */}
            {selectedMilestone && (
                <div className="milestone-modal-overlay" onClick={() => setSelectedMilestone(null)}>
                    <div className="milestone-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header" style={{ borderColor: selectedMilestone.color }}>
                            <span className="modal-year-badge" style={{ backgroundColor: selectedMilestone.color }}>
                                {selectedMilestone.year}
                            </span>
                            <h3 className="si-text">{selectedMilestone.title}</h3>
                            <p className="en-text">{selectedMilestone.subtitle}</p>
                        </div>
                        <div className="modal-body">
                            <p className="si-text">{selectedMilestone.description}</p>
                            <p className="modal-extra si-text">
                                මෙම සන්ධිස්ථානය කුඩාඔය ගම්මානයේ සංවර්ධනයට සහ සාමාජික පවුල්වල සුබසාධනයට විශාල ශක්තියක් වූ අතර, සමිතියේ ස්ථාවර භාවයට මූලික අඩිතාලම විය.
                            </p>
                        </div>
                        <button className="modal-close-btn si-text" onClick={() => setSelectedMilestone(null)}>
                            වසා දමන්න
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
