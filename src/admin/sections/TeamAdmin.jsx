import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';

const TeamAdmin = ({ showToast }) => {
    const { siteData, addArrayItem, updateArrayItem, deleteArrayItem } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        quote: '',
        phone: '',
        img: ''
    });

    const handleOpenAdd = () => {
        setEditingMember(null);
        setFormData({
            name: '',
            role: 'කමිටු සාමාජික',
            quote: '',
            phone: '',
            img: 'https://ui-avatars.com/api/?name=Member&background=1e293b&color=cbd5e1&size=256'
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name || '',
            role: member.role || '',
            quote: member.quote || '',
            phone: member.phone || '',
            img: member.img || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            deleteArrayItem('team', id);
            showToast(`${name} deleted from team!`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMember) {
            updateArrayItem('team', editingMember.id, formData);
            showToast(`${formData.name} updated successfully!`);
        } else {
            addArrayItem('team', formData);
            showToast(`New team member ${formData.name} added!`);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <Users size={20} color="#818CF8" />
                    Community Members & Leadership (කණ්ඩායම කළමනාකරණය)
                </h3>
                <button className="btn-admin-primary" onClick={handleOpenAdd}>
                    <Plus size={16} /> Add New Member
                </button>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ඡායාරූපය (Photo)</th>
                            <th>නම (Name)</th>
                            <th>තනතුර (Role)</th>
                            <th>ප්‍රකාශය / Quote</th>
                            <th>දුරකථන (Phone)</th>
                            <th style={{ textAlign: 'right' }}>ක්‍රියාමාර්ග (Actions)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siteData.team?.map(member => (
                            <tr key={member.id}>
                                <td>
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="user-avatar-small"
                                        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Member'; }}
                                    />
                                </td>
                                <td><strong>{member.name}</strong></td>
                                <td><span style={{ color: '#818CF8', fontWeight: 600 }}>{member.role}</span></td>
                                <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {member.quote}
                                </td>
                                <td>{member.phone || 'N/A'}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                        <button className="btn-action-icon edit" onClick={() => handleOpenEdit(member)} title="Edit Member">
                                            <Edit2 size={15} />
                                        </button>
                                        <button className="btn-action-icon delete" onClick={() => handleDelete(member.id, member.name)} title="Delete Member">
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
                            <h3>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</h3>
                            <button className="btn-action-icon" onClick={() => setIsModalOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label>සම්පූර්ණ නම (Member Full Name)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="උදා: සුනිල් විජයානන්ද"
                                    />
                                </div>

                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>තනතුර (Role / Position)</label>
                                        <input
                                            type="text"
                                            className="admin-input"
                                            required
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            placeholder="උදා: සභාපති / ලේකම් / කමිටු සාමාජික"
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>දුරකථන අංකය (Phone)</label>
                                        <input
                                            type="text"
                                            className="admin-input"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+94 77 123 4567"
                                        />
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label>පින්තූර URL (Photo Image URL or asset path)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.img}
                                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>ප්‍රකාශය (Quote / Description)</label>
                                    <textarea
                                        className="admin-textarea"
                                        rows={3}
                                        value={formData.quote}
                                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                        placeholder="සමාජ සේවය පිළිබඳ කෙටි ප්‍රකාශය..."
                                    />
                                </div>
                            </div>

                            <div className="admin-modal-footer">
                                <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-admin-primary">
                                    <Save size={16} /> Save Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamAdmin;
