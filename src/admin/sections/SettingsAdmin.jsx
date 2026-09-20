import React, { useState } from 'react';
import { Settings, Download, Upload, RotateCcw, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

const SettingsAdmin = ({ showToast }) => {
    const { siteData, resetToDefaults } = useData();
    const [jsonInput, setJsonInput] = useState('');

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `kudaoya_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast('Site data backup downloaded!');
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all site data to default initial state? All custom edits will be reverted.")) {
            resetToDefaults();
            showToast('Site data reset to default initial state!');
        }
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                    <Settings size={20} color="#818CF8" />
                    System Configuration & Data Backup (පද්ධති සැකසුම්)
                </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                {/* Export Backup Card */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h4 style={{ color: '#fff', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} color="#10B981" /> Data Export Backup
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                        ඔබ විසින් සිදුකරන ලද සියලුම දත්ත (ව්‍යාපෘති, සාමාජිකයින්, පණිවිඩ) JSON ගොනුවක් ලෙස බාගත කරගන්න.
                    </p>
                    <button className="btn-admin-primary" onClick={handleExport}>
                        <Download size={16} /> Export JSON Backup
                    </button>
                </div>

                {/* Reset Defaults Card */}
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <h4 style={{ color: '#ef4444', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShieldAlert size={18} /> Reset to Default Data
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                        සියලුම දත්ත මුල් පැවති ආරම්භක තත්ත්වයට (Default initial state) නැවත සකස් කිරීමට මෙය භාවිතා කරන්න.
                    </p>
                    <button
                        className="btn-admin-secondary"
                        style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                        onClick={handleReset}
                    >
                        <RotateCcw size={16} /> Reset All Data
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsAdmin;
