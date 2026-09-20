import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import OverviewAdmin from './sections/OverviewAdmin';
import HeroAdmin from './sections/HeroAdmin';
import AboutAdmin from './sections/AboutAdmin';
import TeamAdmin from './sections/TeamAdmin';
import ProjectsAdmin from './sections/ProjectsAdmin';
import ServicesAdmin from './sections/ServicesAdmin';
import MembershipAdmin from './sections/MembershipAdmin';
import ContactAdmin from './sections/ContactAdmin';
import HistoryAdmin from './sections/HistoryAdmin';
import SettingsAdmin from './sections/SettingsAdmin';
import { CheckCircle2 } from 'lucide-react';
import './styles/Admin.css';

const AdminDashboard = ({ onNavigateToSite }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 3500);
    };

    const renderActiveSection = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewAdmin setActiveTab={setActiveTab} showToast={showToast} />;
            case 'hero':
                return <HeroAdmin showToast={showToast} />;
            case 'about':
                return <AboutAdmin showToast={showToast} />;
            case 'team':
                return <TeamAdmin showToast={showToast} />;
            case 'projects':
                return <ProjectsAdmin showToast={showToast} />;
            case 'services':
                return <ServicesAdmin showToast={showToast} />;
            case 'memberships':
                return <MembershipAdmin showToast={showToast} />;
            case 'contact':
                return <ContactAdmin showToast={showToast} />;
            case 'history':
                return <HistoryAdmin showToast={showToast} />;
            case 'settings':
                return <SettingsAdmin showToast={showToast} />;
            default:
                return <OverviewAdmin setActiveTab={setActiveTab} showToast={showToast} />;
        }
    };

    return (
        <div className="admin-wrapper">
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onNavigateToSite={onNavigateToSite}
            />

            <div className="admin-main">
                <AdminHeader
                    activeTab={activeTab}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onNavigateToSite={onNavigateToSite}
                />

                <div className="admin-body">
                    {renderActiveSection()}
                </div>
            </div>

            {toastMessage && (
                <div className="admin-toast">
                    <CheckCircle2 size={18} />
                    <span>{toastMessage}</span>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
