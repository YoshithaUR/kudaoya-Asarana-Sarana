import React, { useState } from 'react';
import { Mail, Check, Trash2, MessageSquare, Send, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ContactAdmin = ({ showToast }) => {
    const { siteData, updateArrayItem, deleteArrayItem } = useData();
    const [activeReply, setActiveReply] = useState(null);
    const [replyText, setReplyText] = useState('');

    const handleToggleRead = (id, currentStatus) => {
        const newStatus = currentStatus === 'Unread' ? 'Read' : 'Unread';
        updateArrayItem('inquiries', id, { status: newStatus });
        showToast(`Marked inquiry as ${newStatus}`);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete message from ${name}?`)) {
            deleteArrayItem('inquiries', id);
            showToast(`Message from ${name} deleted.`);
        }
    };

    const handleSendReply = (e) => {
        e.preventDefault();
        if (activeReply) {
            updateArrayItem('inquiries', activeReply.id, { status: 'Read' });
            showToast(`Reply sent to ${activeReply.name} via WhatsApp/Email!`);
            setActiveReply(null);
            setReplyText('');
        }
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <Mail size={20} color="#EC4899" />
                    Inquiries & Contact Messages (පණිවිඩ සහ විමසීම්)
                </h3>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>එවූ තැනැත්තා (Sender)</th>
                            <th>විද්‍යුත් තැපෑල (Email)</th>
                            <th>දුරකථන (Phone)</th>
                            <th>පණිවිඩය (Message)</th>
                            <th>දිනය (Date)</th>
                            <th>තත්ත්වය</th>
                            <th style={{ textAlign: 'right' }}>ක්‍රියාමාර්ග (Actions)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siteData.inquiries?.map(inq => (
                            <tr key={inq.id} style={{ background: inq.status === 'Unread' ? 'rgba(99, 102, 241, 0.05)' : 'transparent' }}>
                                <td><strong>{inq.name}</strong></td>
                                <td style={{ fontSize: '0.85rem' }}>{inq.email}</td>
                                <td style={{ fontSize: '0.85rem' }}>{inq.phone}</td>
                                <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {inq.message}
                                </td>
                                <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{inq.date}</td>
                                <td>
                                    <span className={`badge-status ${inq.status.toLowerCase()}`}>
                                        {inq.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                        <button
                                            className="btn-action-icon edit"
                                            onClick={() => setActiveReply(inq)}
                                            title="Reply to message"
                                        >
                                            <MessageSquare size={15} />
                                        </button>
                                        <button
                                            className="btn-action-icon"
                                            onClick={() => handleToggleRead(inq.id, inq.status)}
                                            title="Toggle Read/Unread"
                                        >
                                            <Check size={15} />
                                        </button>
                                        <button
                                            className="btn-action-icon delete"
                                            onClick={() => handleDelete(inq.id, inq.name)}
                                            title="Delete Message"
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

            {/* REPLY MODAL SIMULATOR */}
            {activeReply && (
                <div className="admin-modal-overlay" onClick={() => setActiveReply(null)}>
                    <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>Reply to {activeReply.name}</h3>
                            <button className="btn-action-icon" onClick={() => setActiveReply(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSendReply}>
                            <div className="admin-modal-body">
                                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                                    <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem', color: '#94a3b8' }}>Original Message:</p>
                                    <p style={{ margin: 0, fontSize: '0.92rem', color: '#fff', fontStyle: 'italic' }}>"{activeReply.message}"</p>
                                </div>

                                <div className="admin-form-group">
                                    <label>ඔබගේ පිළිතුර (Your Reply Message)</label>
                                    <textarea
                                        className="admin-textarea"
                                        rows={4}
                                        required
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="ස්තුතියි, ඔබගේ විමසීමට අදාළ විස්තර මෙසේය..."
                                    />
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="btn-admin-secondary" onClick={() => setActiveReply(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-admin-primary">
                                    <Send size={16} /> Send Reply
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactAdmin;
