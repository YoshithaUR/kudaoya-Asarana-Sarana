/**
 * AUTH SECURITY UTILITY
 * Frontend-only security layer for admin dashboard.
 *
 * Security features:
 *  1. SHA-256 password hashing via Web Crypto API (no plain text stored)
 *  2. Rate limiting — 5 failed attempts → 15-minute lockout
 *  3. Session tokens with 2-hour expiry (sessionStorage, cleared on tab close)
 *  4. Inactivity auto-logout (30 minutes)
 *  5. Input sanitization to prevent XSS
 */

// ─── CREDENTIALS (no plain-text password stored) ───────────────────────────
// ADMIN_EMAIL is not secret; it's the username identifier.
// ADMIN_PASSWORD_HASH is SHA-256 of the real password — cannot be reversed.
export const ADMIN_EMAIL = 'kudaoya.asaranasarana@gmail.com';
const ADMIN_PASSWORD_HASH = '83f6b3b7f4d0205781243172e18a3abad07ab4a34be46fdf33fd03befc727ac9';

// ─── SECURITY CONSTANTS ─────────────────────────────────────────────────────
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;   // 15 minutes
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours
const INACTIVITY_LIMIT_MS = 30 * 60 * 1000;   // 30 minutes

const LS_FAILED_KEY = '__asa_fa';   // failed-attempt count + timestamp
const SS_SESSION_KEY = '__asa_st';   // session token in sessionStorage
const SS_EXPIRY_KEY = '__asa_ex';   // session expiry timestamp
const SS_LAST_ACT_KEY = '__asa_la';   // last activity timestamp

// ─── HASHING ────────────────────────────────────────────────────────────────
/**
 * Hash a string with SHA-256 using Web Crypto API.
 * Returns a hex string. Works in all modern browsers.
 */
export async function hashPassword(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// ─── RATE LIMITING ──────────────────────────────────────────────────────────
function getFailedAttemptData() {
    try {
        const raw = localStorage.getItem(LS_FAILED_KEY);
        if (!raw) return { count: 0, until: 0 };
        return JSON.parse(raw);
    } catch {
        return { count: 0, until: 0 };
    }
}

function setFailedAttemptData(data) {
    localStorage.setItem(LS_FAILED_KEY, JSON.stringify(data));
}

export function isLockedOut() {
    const { until } = getFailedAttemptData();
    return Date.now() < until;
}

export function getLockoutRemainingSeconds() {
    const { until } = getFailedAttemptData();
    return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}

function recordFailedAttempt() {
    const data = getFailedAttemptData();
    const count = data.count + 1;

    if (count >= MAX_FAILED_ATTEMPTS) {
        setFailedAttemptData({ count, until: Date.now() + LOCKOUT_DURATION_MS });
    } else {
        setFailedAttemptData({ count, until: 0 });
    }
    return count;
}

function clearFailedAttempts() {
    localStorage.removeItem(LS_FAILED_KEY);
}

export function getFailedAttemptCount() {
    return getFailedAttemptData().count;
}

// ─── SESSION MANAGEMENT ─────────────────────────────────────────────────────
function generateToken() {
    const arr = new Uint8Array(24);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

function createSession() {
    const token = generateToken();
    const expiry = Date.now() + SESSION_DURATION_MS;
    sessionStorage.setItem(SS_SESSION_KEY, token);
    sessionStorage.setItem(SS_EXPIRY_KEY, String(expiry));
    sessionStorage.setItem(SS_LAST_ACT_KEY, String(Date.now()));
    return token;
}

export function getSession() {
    const token = sessionStorage.getItem(SS_SESSION_KEY);
    const expiry = Number(sessionStorage.getItem(SS_EXPIRY_KEY) || 0);
    const lastAct = Number(sessionStorage.getItem(SS_LAST_ACT_KEY) || 0);

    if (!token) return null;

    // Check session expiry
    if (Date.now() > expiry) {
        clearSession();
        return null;
    }

    // Check inactivity
    if (lastAct && (Date.now() - lastAct) > INACTIVITY_LIMIT_MS) {
        clearSession();
        return null;
    }

    return token;
}

export function refreshActivity() {
    if (sessionStorage.getItem(SS_SESSION_KEY)) {
        sessionStorage.setItem(SS_LAST_ACT_KEY, String(Date.now()));
    }
}

export function clearSession() {
    sessionStorage.removeItem(SS_SESSION_KEY);
    sessionStorage.removeItem(SS_EXPIRY_KEY);
    sessionStorage.removeItem(SS_LAST_ACT_KEY);
}

export function isAuthenticated() {
    return getSession() !== null;
}

// ─── INPUT SANITIZATION ─────────────────────────────────────────────────────
export function sanitizeInput(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .trim();
}

// ─── VALIDATION ─────────────────────────────────────────────────────────────
export function validateEmail(email) {
    if (!email || !email.trim()) return 'Email address is required.';
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) return 'Please enter a valid email address.';
    if (email.trim().length > 254) return 'Email address is too long.';
    return '';
}

export function validatePassword(password) {
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password.length > 128) return 'Password is too long.';
    return '';
}

// ─── MAIN AUTH FUNCTION ─────────────────────────────────────────────────────
/**
 * Attempt to authenticate with given credentials.
 * Returns { success: true, token } or { success: false, error, attemptsLeft?, locked?, lockoutSeconds? }
 */
export async function attemptLogin(emailInput, passwordInput) {
    // Check lockout first
    if (isLockedOut()) {
        return {
            success: false,
            locked: true,
            lockoutSeconds: getLockoutRemainingSeconds(),
            error: `Too many failed attempts. Try again in ${Math.ceil(getLockoutRemainingSeconds() / 60)} minute(s).`,
        };
    }

    // Sanitize
    const email = sanitizeInput(emailInput).toLowerCase();
    const password = passwordInput; // don't sanitize — we hash it

    // Hash the attempted password
    const attemptedHash = await hashPassword(password);

    // Compare credentials
    const emailMatch = email === ADMIN_EMAIL.toLowerCase();
    const passwordMatch = attemptedHash === ADMIN_PASSWORD_HASH;

    if (emailMatch && passwordMatch) {
        clearFailedAttempts();
        const token = createSession();
        return { success: true, token };
    }

    // Record failure
    const count = recordFailedAttempt();
    const remaining = MAX_FAILED_ATTEMPTS - count;

    if (isLockedOut()) {
        return {
            success: false,
            locked: true,
            lockoutSeconds: getLockoutRemainingSeconds(),
            error: `Account locked for 15 minutes due to too many failed attempts.`,
        };
    }

    return {
        success: false,
        error: `Invalid email or password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`,
        attemptsLeft: remaining,
    };
}

// ─── LOGOUT ─────────────────────────────────────────────────────────────────
export function logout() {
    clearSession();
}
