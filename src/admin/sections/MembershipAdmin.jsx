import React, { useState } from 'react';
import { FileCheck, Check, X, Trash2, Plus, UserPlus, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const MembershipAdmin = ({ showToast }) => {
    const { siteData, updateArrayItem, deleteArrayItem, addArrayItem } = useData();
    const [filterStatus, setFilterStatus] = useState('All');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        nic: '',
        phone: '',
        address: '',
        status: 'Approved'
    });

    const filteredMemberships = (siteData.memberships || []).filter(m => {
        if (filterStatus === 'All') return true;
        return m.status === filterStatus;
    });

    const handleStatusChange = (id, newStatus, name) => {
        updateArrayItem('memberships', id, { status: newStatus });
        showToast(`Membership status for ${name} changed to ${newStatus}`);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete application for ${name}?`)) {
            deleteArrayItem('memberships', id);
            showToast(`Application for ${name} deleted.`);
        }
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addArrayItem('memberships', {
            ...newMember,
            date: new Date().toISOString().split('T')[0]
        });
        showToast(`New member ${newMember.name} recorded!`);
        setIsAddModalOpen(false);
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <FileCheck size={20} color="#F59E0B" />
                    Membership Applications (සාමාජික අයදුම්පත් කළමනාකරණය)
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <select
                        className="admin-select"
                        style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending Only</option>
                        <option value="Approved">Approved Only</option>
                        <option value="Rejected">Rejected Only</option>
                    </select>
                    <button className="btn-admin-primary" onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={16} /> Add Member Record
                    </button>
                </div>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>අයදුම්කරු (Applicant Name)</th>
                            <th>ජා.හැ.අංකය (NIC)</th>
                            <th>දුරකථන (Phone)</th>
                            <th>ලිපිනය (Address)</th>
                            <th>දිනය (Date)</th>
                            <th>තත්ත්වය (Status)</th>
                            <th style={{ textAlign: 'right' }}>තීරණය (Action)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMemberships.map(m => (
                            <tr key={m.id}>
                                <td><strong>{m.name}</strong></td>
                                <td style={{ fontSize: '0.85rem' }}>{m.nic}</td>
                                <td>{m.phone}</td>
                                <td style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{m.address}</td>
                                <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{m.date}</td>
                                <td>
                                    <span className={`badge-status ${m.status.toLowerCase()}`}>
                                        {m.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                        {m.status !== 'Approved' && (
                                            <button
                                                className="btn-action-icon"
                                                style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}
                                                onClick={() => handleStatusChange(m.id, 'Approved', m.name)}
                                                title="Approve Application"
                                            >
                                                <Check size={16} />
                                            </button>
                                        )}
                                        {m.status !== 'Rejected' && (
                                            <button
                                                className="btn-action-icon"
                                                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                                                onClick={() => handleStatusChange(m.id, 'Rejected', m.name)}
                                                title="Reject Application"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                        <button
                                            className="btn-action-icon delete"
                                            onClick={() => handleDelete(m.id, m.name)}
                                            title="Delete Record"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ADD MANUAL MEMBER MODAL */}
            {isAddModalOpen && (
                <div className="admin-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>Add Official Member Record</h3>
                            <button className="btn-action-icon" onClick={() => setIsAddModalOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label>සම්පූර්ණ නම (Name)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        required
                                        value={newMember.name}
                                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>ජාතික හැඳුනුම්පත් අංකය (NIC)</label>
                                        <input
                                            type="text"
                                            className="admin-input"
                                            required
                                            value={newMember.nic}
                                            onChange={(e) => setNewMember({ ...newMember, nic: e.target.value })}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>දුරකථන අංකය (Phone)</label>
                                        <input
                                            type="text"
                                            className="admin-input"
                                            required
                                            value={newMember.phone}
                                            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label>ලිපිනය (Address)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        required
                                        value={newMember.address}
                                        onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="btn-admin-secondary" onClick={() => setIsAddModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-admin-primary">
                                    <Save size={16} /> Save Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MembershipAdmin;
