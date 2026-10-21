import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, ShieldCheck, AlertCircle, CheckCircle2, Loader2, Clock } from 'lucide-react';
import {
    attemptLogin,
    validateEmail,
    validatePassword,
    isLockedOut,
    getLockoutRemainingSeconds,
    getFailedAttemptCount,
} from '../utils/authSecurity';
import '../styles/AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false });
    const [mounted, setMounted] = useState(false);
    const [locked, setLocked] = useState(false);
    const [lockoutSecs, setLockoutSecs] = useState(0);
    const [failedCount, setFailedCount] = useState(0);
    const lockoutTimer = useRef(null);

    useEffect(() => {
        setMounted(true);

        // Check if already locked out on mount
        if (isLockedOut()) {
            setLocked(true);
            setLockoutSecs(getLockoutRemainingSeconds());
            setFailedCount(getFailedAttemptCount());
        }

        return () => clearInterval(lockoutTimer.current);
    }, []);

    // Countdown timer when locked
    useEffect(() => {
        if (!locked) return;
        lockoutTimer.current = setInterval(() => {
            const remaining = getLockoutRemainingSeconds();
            if (remaining <= 0) {
                setLocked(false);
                setLockoutSecs(0);
                setLoginError('');
                clearInterval(lockoutTimer.current);
            } else {
                setLockoutSecs(remaining);
            }
        }, 1000);
        return () => clearInterval(lockoutTimer.current);
    }, [locked]);

    const formatCountdown = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const runValidate = () => {
        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
        };
        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        if (field === 'email')
            setErrors(prev => ({ ...prev, email: validateEmail(email) }));
        if (field === 'password')
            setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setLoginError('');
        if (touched.email)
            setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setLoginError('');
        if (touched.password)
            setErrors(prev => ({ ...prev, password: validatePassword(e.target.value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ email: true, password: true });
        if (!runValidate()) return;
        if (locked) return;

        setIsLoading(true);
        setLoginError('');

        // Small delay for UX (realistic feel + prevent brute-force timing)
        await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));

        const result = await attemptLogin(email, password);
        setIsLoading(false);

        if (result.success) {
            setLoginSuccess(true);
            setTimeout(() => onLoginSuccess(), 2200);
        } else if (result.locked) {
            setLocked(true);
            setLockoutSecs(result.lockoutSeconds);
            setLoginError(result.error);
            setFailedCount(getFailedAttemptCount());
        } else {
            setLoginError(result.error);
            setFailedCount(getFailedAttemptCount());
        }
    };

    return (
        <div className={`login-page ${mounted ? 'login-page--mounted' : ''}`}>
            {/* Animated background */}
            <div className="login-bg">
                <div className="login-orb login-orb--1"></div>
                <div className="login-orb login-orb--2"></div>
                <div className="login-orb login-orb--3"></div>
                <div className="login-grid-overlay"></div>
            </div>

            <div className="login-container">
                {/* Brand */}
                <div className="login-brand">
                    <div className="login-brand-icon">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h1 className="login-brand-name">කුඩාඔය අශාන-සරණ</h1>
                        <p className="login-brand-sub">Secure Admin Portal</p>
                    </div>
                </div>

                {/* Card */}
                <div className={`login-card ${loginSuccess ? 'login-card--success' : ''} ${locked ? 'login-card--locked' : ''}`}>

                    {loginSuccess ? (
                        /* ── SUCCESS STATE ── */
                        <div className="login-success-state">
                            <div className="login-success-icon">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="login-success-title">Login Successful!</h2>
                            <p className="login-success-desc">
                                Welcome back, Administrator.<br />
                                Redirecting to dashboard...
                            </p>
                            <div className="login-success-bar">
                                <div className="login-success-bar-fill"></div>
                            </div>
                        </div>
                    ) : (
                        /* ── FORM STATE ── */
                        <>
                            <div className="login-card-header">
                                <h2 className="login-card-title">Sign In</h2>
                                <p className="login-card-subtitle">Access your admin dashboard securely</p>
                            </div>

                            {/* Lockout Banner */}
                            {locked && (
                                <div className="login-alert login-alert--lockout">
                                    <Clock size={16} />
                                    <div>
                                        <strong>Account Locked</strong>
                                        <span className="login-lockout-detail">
                                            Too many failed attempts. Try again in{' '}
                                            <span className="login-lockout-timer">{formatCountdown(lockoutSecs)}</span>
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Error Banner */}
                            {!locked && loginError && (
                                <div className="login-alert login-alert--error" key={loginError}>
                                    <AlertCircle size={16} />
                                    <span>{loginError}</span>
                                </div>
                            )}

                            {/* Failed attempt warning bar */}
                            {!locked && failedCount > 0 && (
                                <div className="login-attempt-bar">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`login-attempt-pip ${i < failedCount ? 'filled' : ''}`}
                                        />
                                    ))}
                                    <span>{5 - failedCount} attempt{(5 - failedCount) !== 1 ? 's' : ''} left</span>
                                </div>
                            )}

                            <form className="login-form" onSubmit={handleSubmit} noValidate>
                                {/* Email */}
                                <div className={`login-field
                                    ${touched.email && errors.email ? 'login-field--error' : ''}
                                    ${touched.email && !errors.email && email ? 'login-field--valid' : ''}`}
                                >
                                    <label className="login-label" htmlFor="login-email">Email Address</label>
                                    <div className="login-input-wrapper">
                                        <span className="login-input-icon"><Mail size={17} /></span>
                                        <input
                                            id="login-email"
                                            type="email"
                                            className="login-input"
                                            placeholder="admin@example.com"
                                            value={email}
                                            onChange={handleEmailChange}
                                            onBlur={() => handleBlur('email')}
                                            autoComplete="email"
                                            disabled={isLoading || locked}
                                            maxLength={254}
                                        />
                                        {touched.email && !errors.email && email && (
                                            <span className="login-input-valid-icon"><CheckCircle2 size={16} /></span>
                                        )}
                                    </div>
                                    {touched.email && errors.email && (
                                        <p className="login-error-msg"><AlertCircle size={13} />{errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className={`login-field
                                    ${touched.password && errors.password ? 'login-field--error' : ''}
                                    ${touched.password && !errors.password && password ? 'login-field--valid' : ''}`}
                                >
                                    <label className="login-label" htmlFor="login-password">Password</label>
                                    <div className="login-input-wrapper">
                                        <span className="login-input-icon"><Lock size={17} /></span>
                                        <input
                                            id="login-password"
                                            type={showPassword ? 'text' : 'password'}
                                            className="login-input login-input--password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            onBlur={() => handleBlur('password')}
                                            autoComplete="current-password"
                                            disabled={isLoading || locked}
                                            maxLength={128}
                                        />
                                        <button
                                            type="button"
                                            className="login-toggle-pw"
                                            onClick={() => setShowPassword(v => !v)}
                                            tabIndex={-1}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            disabled={locked}
                                        >
                                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                        </button>
                                    </div>
                                    {touched.password && errors.password && (
                                        <p className="login-error-msg"><AlertCircle size={13} />{errors.password}</p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    id="login-submit-btn"
                                    type="submit"
                                    className={`login-btn-submit ${locked ? 'login-btn-submit--locked' : ''}`}
                                    disabled={isLoading || locked}
                                >
                                    {locked ? (
                                        <><Clock size={18} />Locked — {formatCountdown(lockoutSecs)}</>
                                    ) : isLoading ? (
                                        <><Loader2 size={18} className="login-spin" />Authenticating...</>
                                    ) : (
                                        <><ShieldCheck size={18} />Sign In to Dashboard</>
                                    )}
                                </button>
                            </form>

                            <div className="login-card-footer">
                                <div className="login-security-badges">
                                    <span className="login-sec-badge">🔒 SHA-256 Encrypted</span>
                                    <span className="login-sec-badge">🛡️ Rate Limited</span>
                                    <span className="login-sec-badge">⏱️ Session Expiry</span>
                                </div>
                                <p className="login-secure-note">
                                    Secure admin access · Kudaoya Ashrana Sarana
                                </p>
                            </div>
                        </>
                    )}
                </div>

                <p className="login-copyright">
                    © 2026 Kudaoya Ashrana Sarana. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
