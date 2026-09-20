import React, { useState } from 'react';
import { Save, Image, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

const HeroAdmin = ({ showToast }) => {
    const { siteData, updateHero } = useData();
    const [formData, setFormData] = useState(siteData.hero || {});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHero({
            ...formData,
            membersCount: Number(formData.membersCount),
            yearsCount: Number(formData.yearsCount),
            projectsCount: Number(formData.projectsCount)
        });
        showToast('Hero section details updated successfully!');
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <Image size={20} color="#818CF8" />
                    Edit Hero Section Content & Counter Metrics
                </h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Eyebrow Tagline (English/Sinhala)</label>
                        <input
                            type="text"
                            name="eyebrow"
                            className="admin-input"
                            value={formData.eyebrow || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Main Title Line 1</label>
                        <input
                            type="text"
                            name="titleLine1"
                            className="admin-input"
                            value={formData.titleLine1 || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Title Accent Text (Gradient color text)</label>
                        <input
                            type="text"
                            name="titleAccent"
                            className="admin-input"
                            value={formData.titleAccent || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Title Plain Text</label>
                        <input
                            type="text"
                            name="titlePlain"
                            className="admin-input"
                            value={formData.titlePlain || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="admin-form-group">
                    <label>Hero Subtitle / Description</label>
                    <textarea
                        name="subtitle"
                        className="admin-textarea"
                        value={formData.subtitle || ''}
                        onChange={handleChange}
                    />
                </div>

                <h4 style={{ color: '#818CF8', margin: '1.5rem 0 1rem', fontSize: '1rem' }}>
                    Hero Counter Metrics (ලබාදී ඇති සංඛ්‍යාලේඛන)
                </h4>

                <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <div className="admin-form-group">
                        <label>සාමාජිකයින් ගණන (Members Counter)</label>
                        <input
                            type="number"
                            name="membersCount"
                            className="admin-input"
                            value={formData.membersCount || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>සේවා වසර ගණන (Years of Service)</label>
                        <input
                            type="number"
                            name="yearsCount"
                            className="admin-input"
                            value={formData.yearsCount || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>ව්‍යාපෘති ගණන (Projects Count)</label>
                        <input
                            type="number"
                            name="projectsCount"
                            className="admin-input"
                            value={formData.projectsCount || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-admin-primary">
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeroAdmin;
