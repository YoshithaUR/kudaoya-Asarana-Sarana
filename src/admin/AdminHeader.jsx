import React from 'react';
import { Search, Bell, UserCheck, Sparkles, Globe } from 'lucide-react';

const tabTitles = {
    overview: 'Dashboard Overview & Analytics',
    hero: 'Hero Section Content Manager',
    about: 'About Us Content Manager',
    team: 'Community Members CRUD Manager',
    projects: 'Projects & Portfolio CRUD Manager',
    services: 'Services & Welfare CRUD Manager',
    memberships: 'Membership Applications Manager',
    contact: 'Inquiries & Messages Manager',
    history: 'Village History Manager',
    settings: 'System Configuration & Backup'
};

const AdminHeader = ({ activeTab, searchTerm, setSearchTerm, onNavigateToSite }) => {
    return (
        <header className="admin-header">
            <div className="admin-header-title">
                <h1>
                    <Sparkles size={20} color="#818CF8" />
                    {tabTitles[activeTab] || 'Admin Dashboard'}
                </h1>
            </div>

            <div className="admin-header-search">
                <Search size={16} />
                <input
                    type="text"
                    placeholder="Search records, members, projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="admin-header-right">
                <div className="admin-status-badge">
                    <span className="status-dot-pulse"></span>
                    <span>Live Local State</span>
                </div>

                <button
                    onClick={onNavigateToSite}
                    className="btn-admin-secondary"
                    title="Return to main site"
                >
                    <Globe size={16} />
                    <span>Go to Site</span>
                </button>

                <div className="admin-user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.85rem'
                    }}>
                        AD
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>Admin User</span>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Administrator</span>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default AdminHeader;
