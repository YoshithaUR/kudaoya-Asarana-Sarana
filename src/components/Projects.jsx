import { useState, useEffect } from 'react';
import { ArrowRight, X, Calendar, MapPin, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { homeImages } from '../assets/image';
import '../styles/Projects.css';

// Using placeholder images from Unsplash via source.unsplash or specific URLs
const projectData = [
    {
        id: 1,
        title: 'වාර්ෂික ශිෂ්‍යත්ව ප්‍රදානය - 2023',
        category: 'Education',
        date: '2023 දෙසැම්බර් 15',
        location: 'කුඩාඔය ප්‍රාථමික විද්‍යාලය',
        shortDesc: 'ප්‍රදේශයේ ආර්ථික අපහසුතා ඇති දරුවන් 150 කට අධ්‍යාපන ශිෂ්‍යත්ව සහ පාසල් උපකරණ ලබා දීම.',
        mainImg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
        desc: 'වාර්ෂිකව සංවිධානය කරනු ලබන මෙම ශිෂ්‍යත්ව ප්‍රදානෝත්සවය හරහා ප්‍රදේශයේ දරුවන්ට අවශ්‍ය අභ්‍යාස පොත්, පාසල් බෑග්, සහ මූල්‍ය ශිෂ්‍යත්ව ලබා දෙන ලදී. මෙමගින් දරුවන්ගේ අනාගත අධ්‍යාපනයට විශාල ශක්තියක් ලබා දීමට අපට හැකි විය.',
        features: [
            { h: 'ප්‍රතිලාභීන්', p: 'පාසල් දරුවන් 150 කට අධික පිරිසක්' },
            { h: 'ආයෝජනය', p: 'රුපියල් ලක්ෂ 5 කට අධික පාසල් උපකරණ' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
        ]
    },
    {
        id: 2,
        title: 'නිදහස් සෞඛ්‍ය කඳවුර',
        category: 'Health',
        date: '2023 අගෝස්තු 20',
        location: 'කුඩාඔය ග්‍රාම සේවා කාර්යාලය',
        shortDesc: 'ගම්වාසීන් 300 කට අධික පිරිසකට නොමිලේ වෛද්‍ය පරීක්ෂණ සහ ඖෂධ ලබා දීම.',
        mainImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        desc: 'විශේෂඥ වෛද්‍යවරුන්ගේ සහභාගීත්වයෙන් පැවැත්වූ මෙම කඳවුරේදී අක්ෂි පරීක්ෂණ, දන්ත වෛද්‍ය සායන සහ සාමාන්ර්ය රෝග සඳහා පරීක්ෂණ සිදු කරන ලදී. අවශ්‍ය රෝගීන්ට නොමිලයේ ඇස් කණ්නාඩි සහ ඖෂධ ද ලබා දෙන ලදී.',
        features: [
            { h: 'සහභාගීත්වය', p: 'ගම්වාසීන් 300 කට අධික පිරිසක්' },
            { h: 'විශේෂ සේවා', p: 'ඇස් කණ්නාඩි 50 ක් සහ ඖෂධ නොමිලයේ' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop',
        ]
    },
    {
        id: 3,
        title: 'ග්‍රාමීය මාර්ග ප්‍රතිසංස්කරණය',
        category: 'Community',
        date: '2023 ජනවාරි 10',
        location: 'කුඩාඔය මාවත',
        shortDesc: 'ප්‍රජා ශ්‍රමදානයෙන් කිලෝමීටර් 2 ක පමණ ග්‍රාමීය මාර්ගයක් පිළිසකර කිරීම.',
        mainImg: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop',
        desc: 'වර්ෂා කාලයේදී ගමනාගමනයට දැඩි ලෙස බාධා ඇති වූ ග්‍රාමීය මාර්ගය, ගම්වාසීන්ගේ ශ්‍රමදානයෙන් හා අප සංගමයේ මූල්‍ය දායකත්වයෙන් සම්පූර්ණයෙන්ම පිළිසකර කරන ලදී.',
        features: [
            { h: 'දුර ප්‍රමාණය', p: 'කිලෝමීටර් 2 ක මාර්ගයක්' },
            { h: 'ශ්‍රම දායකත්වය', p: 'ගම්වාසීන් 100 කට අධික පිරිසකගේ සහාය' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1541888086925-920f0bb33877?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621946398902-6e27c0f18bd3?q=80&w=600&auto=format&fit=crop',
        ]
    },
    {
        id: 4,
        title: 'වැඩිහිටි නිවාසයට දහවල් දානය',
        category: 'Care',
        date: '2023 මාර්තු 22',
        location: 'සුරක්ෂා වැඩිහිටි නිවාසය',
        shortDesc: 'වැඩිහිටියන් 40 දෙනෙකු සඳහා දහවල් ආහාරය සහ වියළි සලාක ලබා දීම.',
        mainImg: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop',
        desc: 'හුදෙකලා වූ වැඩිහිටියන් සමඟ දිනයක් ගත කරමින් ඔවුන්ට දහවල් ආහාරය, අවශ්‍ය බෙහෙත් වර්ග සහ එදිනෙදා ජීවිතයට අවශ්‍ය ඇඳුම් පැලඳුම් ලබා දීමේ උතුම් පුණ්‍යකර්මයක්.',
        features: [
            { h: 'ප්‍රතිලාභීන්', p: 'වැඩිහිටි මව්පියන් 40 ක්' },
            { h: 'ප්‍රදානයන්', p: 'තුන්වේල ආහාර, ඖෂධ සහ රෝද පුටු 2ක්' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1516082498426-11f8fd609756?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1469502759976-189f7831f456?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544027993-37dbdd434b9d?q=80&w=600&auto=format&fit=crop',
        ]
    }
];

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);
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
        if (activeProject) return; // pause if modal open
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % Math.max(1, projectData.length - cardsToShow + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [activeProject, cardsToShow]);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % Math.max(1, projectData.length - cardsToShow + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 < 0 ? Math.max(0, projectData.length - cardsToShow) : prev - 1));
    };

    /* Lock body scroll when modal is open */
    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [activeProject]);

    return (
        <section className="projects" id="projects">
            <div
                className="section-bg-image"
                style={{ backgroundImage: `url(${homeImages.img2})` }}
                aria-hidden="true"
            />
            {/* ── Background ── */}
            <div className="projects-grid-bg" aria-hidden="true" />
            <div className="projects-orb projects-orb-1" aria-hidden="true" />
            <div className="projects-orb projects-orb-2" aria-hidden="true" />

            <div className="projects-container">

                {/* ── Header ── */}
                <div className="projects-header">
                    <div className="projects-badge">
                        <span className="projects-badge-dot" />
                        <span className="en-text">Our Portfolio</span>
                    </div>
                    <h2 className="projects-title">
                        අපගේ <span className="projects-title-accent">ව්‍යාපෘති</span>
                    </h2>
                </div>

                {/* ── Projects Slider ── */}
                <div className="projects-slider-wrapper">

                    <div className="projects-slider-viewport">
                        <div
                            className="projects-slider-track"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
                            }}
                        >
                            {projectData.map((project) => (
                                <div
                                    key={project.id}
                                    className="project-slide"
                                    style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                                >
                                    <div className="project-card" onClick={() => setActiveProject(project)}>

                                        {/* Card Image */}
                                        <div className="project-image-box">
                                            <img src={project.mainImg} alt={project.title} loading="lazy" />
                                            <div className="project-overlay" />
                                        </div>

                                        {/* Card Info */}
                                        <div className="project-info">
                                            <h3 className="project-title si-text">{project.title}</h3>
                                            <div className="project-date">
                                                <Calendar size={14} />
                                                <span className="si-text">{project.date}</span>
                                            </div>
                                            <p className="project-short-desc si-text">
                                                {project.shortDesc}
                                            </p>

                                            <div className="project-view-btn en-text">
                                                <Eye size={16} /> View Gallery & Details
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons (Aligned Center Below) */}
                    <div className="projects-slider-controls">
                        <button className="slider-nav-btn prev" onClick={prevSlide} aria-label="Previous project">
                            <ChevronLeft size={28} />
                        </button>
                        <button className="slider-nav-btn next" onClick={nextSlide} aria-label="Next project">
                            <ChevronRight size={28} />
                        </button>
                    </div>

                </div>

            </div>

            {/* ── PROJECT DETAILS MODAL ── */}
            <div
                className={`project-modal-overlay ${activeProject ? 'active' : ''}`}
                onClick={() => setActiveProject(null)}
            >
                <div
                    className="project-modal-content"
                    onClick={(e) => e.stopPropagation()} /* Prevent close on inner click */
                >
                    <button
                        className="p-modal-close"
                        onClick={() => setActiveProject(null)}
                        aria-label="Close project modal"
                    >
                        <X size={24} />
                    </button>

                    {activeProject && (
                        <>
                            {/* Hero Header of Modal */}
                            <div className="p-modal-hero">
                                <img src={activeProject.mainImg} alt={activeProject.title} />
                                <div className="p-modal-hero-overlay" />
                            </div>

                            {/* Body of Modal */}
                            <div className="p-modal-body">
                                <h2 className="p-modal-title si-text">{activeProject.title}</h2>

                                <div className="p-modal-meta">
                                    <span><Calendar size={16} color="#818CF8" /> {activeProject.date}</span>
                                    <span><MapPin size={16} color="#818CF8" /> {activeProject.location}</span>
                                </div>

                                <p className="p-modal-desc si-text">
                                    {activeProject.desc}
                                </p>

                                <div className="p-modal-features">
                                    {activeProject.features.map((feat, idx) => (
                                        <div key={idx} className="p-feature-card">
                                            <h4>{feat.h}</h4>
                                            <p>{feat.p}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Gallery Section */}
                                <h3 className="p-modal-gallery-title si-text">ව්‍යාපෘති ගැලරිය (Gallery)</h3>
                                <div className="p-modal-gallery">
                                    {activeProject.gallery.map((imgUrl, i) => (
                                        <div key={i} className="p-gallery-img">
                                            <img src={imgUrl} alt="Gallery" loading="lazy" />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </>
                    )}

                </div>
            </div>

        </section>
    );
};

export default Projects;
