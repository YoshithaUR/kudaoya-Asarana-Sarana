import React, { useState } from 'react';
import { Save, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AboutAdmin = ({ showToast }) => {
    const { siteData, updateAbout } = useData();
    const [formData, setFormData] = useState(siteData.about || {});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePointChange = (index, value) => {
        const updatedPoints = [...(formData.points || [])];
        updatedPoints[index] = value;
        setFormData({ ...formData, points: updatedPoints });
    };

    const addPoint = () => {
        setFormData({ ...formData, points: [...(formData.points || []), ''] });
    };

    const removePoint = (index) => {
        setFormData({
            ...formData,
            points: (formData.points || []).filter((_, i) => i !== index)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAbout(formData);
        showToast('About section updated successfully!');
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <Info size={20} color="#818CF8" />
                    Edit About Us Section & Organization Story
                </h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Eyebrow Badge Text</label>
                        <input
                            type="text"
                            name="eyebrow"
                            className="admin-input"
                            value={formData.eyebrow || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Title Line 1</label>
                        <input
                            type="text"
                            name="titleLine1"
                            className="admin-input"
                            value={formData.titleLine1 || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="admin-form-group">
                    <label>Title Accent Text</label>
                    <input
                        type="text"
                        name="titleAccent"
                        className="admin-input"
                        value={formData.titleAccent || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="admin-form-group">
                    <label>Paragraph 1 (පළමු ඡේදය)</label>
                    <textarea
                        name="desc1"
                        className="admin-textarea"
                        value={formData.desc1 || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="admin-form-group">
                    <label>Paragraph 2 (දෙවන ඡේදය)</label>
                    <textarea
                        name="desc2"
                        className="admin-textarea"
                        value={formData.desc2 || ''}
                        onChange={handleChange}
                    />
                </div>

                <h4 style={{ color: '#818CF8', margin: '1.5rem 0 0.8rem' }}>Key Highlights / Points List</h4>
                {(formData.points || []).map((pt, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
                        <input
                            type="text"
                            className="admin-input"
                            value={pt}
                            onChange={(e) => handlePointChange(idx, e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn-action-icon delete"
                            onClick={() => removePoint(idx)}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="btn-admin-secondary"
                    style={{ marginTop: '0.5rem' }}
                    onClick={addPoint}
                >
                    + Add Highlight Point
                </button>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-admin-primary">
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AboutAdmin;
