import React from 'react';
import {
    LayoutDashboard, Image, Info, Users, Briefcase,
    HeartHandshake, FileCheck, Mail, History, Settings, ExternalLink, ShieldCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';

const AdminSidebar = ({ activeTab, setActiveTab, onNavigateToSite }) => {
    const { siteData } = useData();

    const pendingMemberships = siteData.memberships?.filter(m => m.status === 'Pending').length || 0;
    const unreadInquiries = siteData.inquiries?.filter(i => i.status === 'Unread').length || 0;

    const navItems = [
        { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'hero', label: 'Hero Banner Section', icon: Image },
        { id: 'about', label: 'About Us Section', icon: Info },
        { id: 'team', label: 'Community Members', icon: Users, count: siteData.team?.length },
        { id: 'projects', label: 'Projects & Portfolio', icon: Briefcase, count: siteData.projects?.length },
        { id: 'services', label: 'Services & Welfare', icon: HeartHandshake, count: siteData.services?.length },
        { id: 'memberships', label: 'Membership Requests', icon: FileCheck, badge: pendingMemberships },
        { id: 'contact', label: 'Inquiries & Messages', icon: Mail, badge: unreadInquiries },
        { id: 'history', label: 'Village History Timeline', icon: History },
        { id: 'settings', label: 'System & Data Settings', icon: Settings }
    ];

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <div className="admin-logo-icon">
                    <ShieldCheck size={24} />
                </div>
                <div className="admin-brand-info">
                    <h2>කුඩාඔය Admin</h2>
                    <span>Management Console</span>
                </div>
            </div>

            <div className="admin-sidebar-menu">
                <div className="admin-menu-label">Main Navigation</div>
                {navItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>

                            {item.badge > 0 && (
                                <span className="admin-nav-badge">{item.badge}</span>
                            )}
                            {item.count !== undefined && !item.badge && (
                                <span className="admin-nav-count" style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.6 }}>{item.count}</span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="admin-sidebar-footer">
                <button onClick={onNavigateToSite} className="btn-view-site">
                    <ExternalLink size={16} />
                    <span>View Live Website</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
