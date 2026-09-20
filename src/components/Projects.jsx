import { useState, useEffect } from 'react';
import { ArrowRight, X, Calendar, MapPin, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { homeImages } from '../assets/image';
import { useData } from '../context/DataContext';
import '../styles/Projects.css';

const Projects = () => {
    const { siteData } = useData();
    const projectData = siteData?.projects || [];
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
        if (activeProject || projectData.length === 0) return; // pause if modal open
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % Math.max(1, projectData.length - cardsToShow + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [activeProject, cardsToShow, projectData]);

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
