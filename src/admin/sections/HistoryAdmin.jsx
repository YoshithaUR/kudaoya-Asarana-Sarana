import React, { useState } from 'react';
import { History, Save, Plus, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

const HistoryAdmin = ({ showToast }) => {
    const { siteData, updateHistory } = useData();
    const [formData, setFormData] = useState(siteData.history || {});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleMilestoneChange = (index, field, value) => {
        const updated = [...(formData.milestones || [])];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, milestones: updated });
    };

    const addMilestone = () => {
        setFormData({
            ...formData,
            milestones: [
                ...(formData.milestones || []),
                { year: new Date().getFullYear().toString(), title: 'නව සංවත්සරය', desc: 'විස්තරය මෙහි ඇතුළත් කරන්න.' }
            ]
        });
    };

    const removeMilestone = (index) => {
        setFormData({
            ...formData,
            milestones: (formData.milestones || []).filter((_, i) => i !== index)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHistory(formData);
        showToast('Village History section updated successfully!');
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <History size={20} color="#818CF8" />
                    Village History & Timeline Milestones (ඉතිහාසය කළමනාකරණය)
                </h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="admin-form-group">
                    <label>ඉතිහාස පිටුවේ ප්‍රධාන මාතෘකාව (Title)</label>
                    <input
                        type="text"
                        name="title"
                        className="admin-input"
                        value={formData.title || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="admin-form-group">
                    <label>උප මාතෘකාව (Subtitle)</label>
                    <textarea
                        name="subtitle"
                        className="admin-textarea"
                        rows={2}
                        value={formData.subtitle || ''}
                        onChange={handleChange}
                    />
                </div>

                <h4 style={{ color: '#818CF8', margin: '1.5rem 0 1rem' }}>
                    ඓතිහාසික සන්ධිස්ථාන (Timeline Milestones)
                </h4>

                {(formData.milestones || []).map((m, idx) => (
                    <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.25rem', borderRadius: '10px', marginBottom: '1rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>වසර (Year)</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={m.year}
                                    onChange={(e) => handleMilestoneChange(idx, 'year', e.target.value)}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>සිදුවීමේ මාතෘකාව (Milestone Title)</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={m.title}
                                    onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label>විස්තරය (Description)</label>
                            <textarea
                                className="admin-textarea"
                                rows={2}
                                value={m.desc}
                                onChange={(e) => handleMilestoneChange(idx, 'desc', e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn-admin-secondary"
                            style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                            onClick={() => removeMilestone(idx)}
                        >
                            <Trash2 size={14} /> Remove Milestone
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="btn-admin-secondary"
                    style={{ marginTop: '0.5rem' }}
                    onClick={addMilestone}
                >
                    <Plus size={16} /> Add New Milestone
                </button>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-admin-primary">
                        <Save size={16} /> Save History Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HistoryAdmin;
