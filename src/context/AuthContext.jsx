import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { isAuthenticated, clearSession, refreshActivity, logout as doLogout } from '../utils/authSecurity';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authed, setAuthed] = useState(() => isAuthenticated());
    const inactivityTimer = useRef(null);

    // Refresh activity on any user interaction
    const handleActivity = useCallback(() => {
        refreshActivity();
        // Also re-check session is still valid
        if (!isAuthenticated()) {
            setAuthed(false);
        }
    }, []);

    useEffect(() => {
        if (!authed) return;

        // Attach activity listeners
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach(e => window.addEventListener(e, handleActivity, { passive: true }));

        // Periodic session validity check (every 60s)
        const checkInterval = setInterval(() => {
            if (!isAuthenticated()) {
                setAuthed(false);
            }
        }, 60_000);

        return () => {
            events.forEach(e => window.removeEventListener(e, handleActivity));
            clearInterval(checkInterval);
        };
    }, [authed, handleActivity]);

    const login = useCallback(() => {
        setAuthed(true);
    }, []);

    const logout = useCallback(() => {
        doLogout();
        setAuthed(false);
    }, []);

    return (
        <AuthContext.Provider value={{ authed, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
