import React from 'react';
import { Users, Briefcase, HeartHandshake, FileCheck, Mail, ArrowUpRight, Plus, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

const OverviewAdmin = ({ setActiveTab, showToast }) => {
    const { siteData } = useData();

    const pendingMemberships = siteData.memberships?.filter(m => m.status === 'Pending').length || 0;
    const unreadInquiries = siteData.inquiries?.filter(i => i.status === 'Unread').length || 0;

    return (
        <div className="admin-overview">

            {/* Quick Banner */}
            <div className="admin-card" style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(217, 70, 239, 0.15))',
                borderColor: 'rgba(129, 140, 248, 0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ color: '#fff', margin: '0 0 0.5rem', fontSize: '1.4rem' }}>
                            සාදරයෙන් පිළිගනිමු! (Welcome to Admin Dashboard)
                        </h2>
                        <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.9rem', maxWidth: '650px' }}>
                            කුඩාඔය අසරණ සරණ සමිතියේ වෙබ් අඩවියේ සියලුම තොරතුරු, ව්‍යාපෘති, සාමාජිකයින්, සහ අයදුම්පත් පාලනය කිරීමට මෙහි ඇති මෙවලම් භාවිතා කරන්න.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="btn-admin-primary" onClick={() => setActiveTab('projects')}>
                            <Plus size={16} /> නව ව්‍යාපෘතියක් එක් කරන්න
                        </button>
                        <button className="btn-admin-secondary" onClick={() => setActiveTab('team')}>
                            <Users size={16} /> කණ්ඩායම කළමනාකරණය
                        </button>
                    </div>
                </div>
            </div>

            {/* Metric Widgets */}
            <div className="stats-grid">
                <div className="stat-widget" onClick={() => setActiveTab('team')} style={{ cursor: 'pointer' }}>
                    <div className="stat-widget-icon" style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}>
                        <Users size={24} />
                    </div>
                    <div className="stat-widget-info">
                        <h3>{siteData.team?.length || 0}</h3>
                        <p>කණ්ඩායම් සාමාජිකයින්</p>
                    </div>
                </div>

                <div className="stat-widget" onClick={() => setActiveTab('projects')} style={{ cursor: 'pointer' }}>
                    <div className="stat-widget-icon" style={{ background: 'linear-gradient(135deg, #10B981, #047857)' }}>
                        <Briefcase size={24} />
                    </div>
                    <div className="stat-widget-info">
                        <h3>{siteData.projects?.length || 0}</h3>
                        <p>ව්‍යාපෘති ගණන</p>
                    </div>
                </div>

                <div className="stat-widget" onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
                    <div className="stat-widget-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                        <HeartHandshake size={24} />
                    </div>
                    <div className="stat-widget-info">
                        <h3>{siteData.services?.length || 0}</h3>
                        <p>සේවාවන් ගණන</p>
                    </div>
                </div>

                <div className="stat-widget" onClick={() => setActiveTab('memberships')} style={{ cursor: 'pointer' }}>
                    <div className="stat-widget-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #B45309)' }}>
                        <FileCheck size={24} />
                    </div>
                    <div className="stat-widget-info">
                        <h3>{pendingMemberships}</h3>
                        <p>බලාපොරොත්තු වන අයදුම්පත්</p>
                    </div>
                </div>

                <div className="stat-widget" onClick={() => setActiveTab('contact')} style={{ cursor: 'pointer' }}>
                    <div className="stat-widget-icon" style={{ background: 'linear-gradient(135deg, #EC4899, #BE185D)' }}>
                        <Mail size={24} />
                    </div>
                    <div className="stat-widget-info">
                        <h3>{unreadInquiries}</h3>
                        <p>නොකියවූ පණිවිඩ</p>
                    </div>
                </div>
            </div>

            {/* Grid of Recent Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                {/* Pending Memberships Card */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">
                            <FileCheck size={18} color="#F59E0B" />
                            නව සාමාජික අයදුම්පත් (Recent Membership Requests)
                        </h3>
                        <button className="btn-admin-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }} onClick={() => setActiveTab('memberships')}>
                            View All <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>නම (Name)</th>
                                    <th>දුරකථන (Phone)</th>
                                    <th>තත්ත්වය (Status)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siteData.memberships?.slice(0, 4).map(m => (
                                    <tr key={m.id}>
                                        <td>{m.name}</td>
                                        <td>{m.phone}</td>
                                        <td>
                                            <span className={`badge-status ${m.status.toLowerCase()}`}>
                                                {m.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Inquiries Card */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">
                            <Mail size={18} color="#EC4899" />
                            මෑත පණිවිඩ (Recent Messages)
                        </h3>
                        <button className="btn-admin-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }} onClick={() => setActiveTab('contact')}>
                            View All <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>එවූ තැනැත්තා</th>
                                    <th>පණිවිඩය</th>
                                    <th>දිනය</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siteData.inquiries?.slice(0, 4).map(i => (
                                    <tr key={i.id}>
                                        <td><strong>{i.name}</strong></td>
                                        <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {i.message}
                                        </td>
                                        <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{i.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OverviewAdmin;
