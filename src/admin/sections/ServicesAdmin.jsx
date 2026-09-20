import React, { useState } from 'react';
import { HeartHandshake, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ServicesAdmin = ({ showToast }) => {
    const { siteData, addArrayItem, updateArrayItem, deleteArrayItem } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        shortDesc: '',
        longDesc: '',
        details: [],
        bullets: []
    });

    const handleOpenAdd = () => {
        setEditingService(null);
        setFormData({
            title: '',
            shortDesc: '',
            longDesc: '',
            details: [
                { h: "ප්‍රධාන අංගය 01", p: "විස්තරය මෙහි ඇතුළත් කරන්න." }
            ],
            bullets: [
                "නොමිලේ සේවාවන් සැපයීම"
            ]
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (svc) => {
        setEditingService(svc);
        setFormData({
            title: svc.title || '',
            shortDesc: svc.shortDesc || '',
            longDesc: svc.longDesc || '',
            details: svc.details || [],
            bullets: svc.bullets || []
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete service "${title}"?`)) {
            deleteArrayItem('services', id);
            showToast(`Service "${title}" deleted!`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingService) {
            updateArrayItem('services', editingService.id, formData);
            showToast(`Service updated successfully!`);
        } else {
            addArrayItem('services', formData);
            showToast(`New service added successfully!`);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <HeartHandshake size={20} color="#8B5CF6" />
                    Services & Welfare Operations (සේවාවන් කළමනාකරණය)
                </h3>
                <button className="btn-admin-primary" onClick={handleOpenAdd}>
                    <Plus size={16} /> Add New Service
                </button>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>සේවා මාතෘකාව (Service Title)</th>
                            <th>කෙටි විස්තරය (Short Description)</th>
                            <th style={{ textAlign: 'right' }}>ක්‍රියාමාර්ග (Actions)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siteData.services?.map(svc => (
                            <tr key={svc.id}>
                                <td><strong>{svc.title}</strong></td>
                                <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {svc.shortDesc}
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                        <button className="btn-action-icon edit" onClick={() => handleOpenEdit(svc)} title="Edit Service">
                                            <Edit2 size={15} />
                                        </button>
                                        <button className="btn-action-icon delete" onClick={() => handleDelete(svc.id, svc.title)} title="Delete Service">
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
                            <h3>{editingService ? 'Edit Service' : 'Add New Community Service'}</h3>
                            <button className="btn-action-icon" onClick={() => setIsModalOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label>සේවා මාතෘකාව (Service Title)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="උදා: අධ්‍යාපන සහාය"
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>කෙටි විස්තරය (Short Description for Card)</label>
                                    <textarea
                                        className="admin-textarea"
                                        rows={2}
                                        required
                                        value={formData.shortDesc}
                                        onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>දීර්ඝ විස්තරය (Long Description for Detail Modal)</label>
                                    <textarea
                                        className="admin-textarea"
                                        rows={4}
                                        value={formData.longDesc}
                                        onChange={(e) => setFormData({ ...formData, longDesc: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="admin-modal-footer">
                                <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-admin-primary">
                                    <Save size={16} /> Save Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesAdmin;
