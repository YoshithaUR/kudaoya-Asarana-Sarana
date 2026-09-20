import React, { useState } from 'react';
import { Briefcase, Plus, Edit2, Trash2, X, Save, Eye, Calendar, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ProjectsAdmin = ({ showToast }) => {
    const { siteData, addArrayItem, updateArrayItem, deleteArrayItem } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Education',
        date: '',
        location: '',
        shortDesc: '',
        desc: '',
        mainImg: '',
        gallery: []
    });

    const handleOpenAdd = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            category: 'Community',
            date: new Date().toLocaleDateString('si-LK'),
            location: 'කුඩාඔය',
            shortDesc: '',
            desc: '',
            mainImg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
            features: [
                { h: 'ප්‍රතිලාභීන්', p: 'ගම්වාසීන් 100+' },
                { h: 'ආයෝජනය', p: 'ප්‍රජා ශ්‍රමදානය' }
            ],
            gallery: [
                'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=600&auto=format&fit=crop'
            ]
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (proj) => {
        setEditingProject(proj);
        setFormData({
            title: proj.title || '',
            category: proj.category || 'Education',
            date: proj.date || '',
            location: proj.location || '',
            shortDesc: proj.shortDesc || '',
            desc: proj.desc || '',
            mainImg: proj.mainImg || '',
            features: proj.features || [],
            gallery: proj.gallery || []
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteArrayItem('projects', id);
            showToast(`Project "${title}" deleted!`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProject) {
            updateArrayItem('projects', editingProject.id, formData);
            showToast(`Project updated successfully!`);
        } else {
            addArrayItem('projects', formData);
            showToast(`New project added successfully!`);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <Briefcase size={20} color="#10B981" />
                    Community Projects & Portfolio (ව්‍යාපෘති කළමනාකරණය)
                </h3>
                <button className="btn-admin-primary" onClick={handleOpenAdd}>
                    <Plus size={16} /> Add New Project
                </button>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>පින්තූරය (Cover)</th>
                            <th>මාතෘකාව (Title)</th>
                            <th>වර්ගය (Category)</th>
                            <th>දිනය (Date)</th>
                            <th>ස්ථානය (Location)</th>
                            <th style={{ textAlign: 'right' }}>ක්‍රියාමාර්ග (Actions)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siteData.projects?.map(proj => (
                            <tr key={proj.id}>
                                <td>
                                    <img
                                        src={proj.mainImg}
                                        alt={proj.title}
                                        style={{ width: '50px', height: '36px', objectFit: 'cover', borderRadius: '6px' }}
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800'; }}
                                    />
                                </td>
                                <td><strong>{proj.title}</strong></td>
                                <td><span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>{proj.category}</span></td>
                                <td style={{ fontSize: '0.85rem' }}>{proj.date}</td>
                                <td style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{proj.location}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                        <button className="btn-action-icon edit" onClick={() => handleOpenEdit(proj)} title="Edit Project">
                                            <Edit2 size={15} />
                                        </button>
                                        <button className="btn-action-icon delete" onClick={() => handleDelete(proj.id, proj.title)} title="Delete Project">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CREATE / EDIT MODAL */}
            {isModalOpen && (
                <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editingProject ? 'Edit Project' : 'Add New Community Project'}</h3>
                            <button className="btn-action-icon" onClick={() => setIsModalOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label>ව්‍යාපෘති මාතෘකාව (Project Title)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="උදා: වාර්ෂික ශිෂ්‍යත්ව ප්‍රදානය"
                                    />
                                </div>

                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>වර්ගීකරණය (Category)</label>
                                        <select
                                            className="admin-select"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="Education">Education (අධ්‍යාපන)</option>
                                            <option value="Health">Health (සෞඛ්‍ය)</option>
                                            <option value="Community">Community (ප්‍රජා සංවර්ධන)</option>
                                            <option value="Care">Care (වැඩිහිටි സත්කාර)</option>
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label>දිනය (Date)</label>
                                        <input
                                            type="text"
                                            className="admin-input"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            placeholder="2024 මාර්තු 15"
                                        />
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label>ස්ථානය (Location)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="කුඩාඔය ප්‍රජා ශාලාව"
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>ප්‍රධාන පින්තූර URL (Cover Image URL)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.mainImg}
                                        onChange={(e) => setFormData({ ...formData, mainImg: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>කෙටි විස්තරය (Short Summary for Card)</label>
                                    <textarea
                                        className="admin-textarea"
                                        rows={2}
                                        value={formData.shortDesc}
                                        onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                                        placeholder="කාඩ්පතේ දිස්වන කෙටි විස්තරය..."
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>සම්පූර්ණ විස්තරය (Full Details for Modal)</label>
                                    <textarea
                                        className="admin-textarea"
                                        rows={4}
                                        value={formData.desc}
                                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                        placeholder="ව්‍යාපෘතිය පිළිබඳ දීර්ඝ විස්තරය..."
                                    />
                                </div>
                            </div>

                            <div className="admin-modal-footer">
                                <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-admin-primary">
                                    <Save size={16} /> Save Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsAdmin;
