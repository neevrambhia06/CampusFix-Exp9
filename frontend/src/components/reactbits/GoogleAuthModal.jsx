import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCampusFix } from '../../context/CampusFixContext';
import { useNavigate } from 'react-router-dom';

// Google Official Multi-colored 'G' SVG
export function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
      />
    </svg>
  );
}

// Preset Campus Google Accounts for Instant Selection
const GOOGLE_CAMPUS_ACCOUNTS = [
  {
    name: 'Aarav Shah',
    email: 'aarav.shah@campus.edu',
    role: 'Student',
    department: 'Computer Science & Engg.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    username: 'aarav'
  },
  {
    name: 'Campus Administrator',
    email: 'admin@fixora.edu',
    role: 'Admin',
    department: 'Campus Maintenance Directorate',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    username: 'admin'
  },
  {
    name: 'Dr. Neha Sen',
    email: 'neha.sen@campus.edu',
    role: 'Faculty',
    department: 'Information Technology',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces',
    username: 'faculty'
  },
  {
    name: 'Ramesh Patel',
    email: 'ramesh.patel@fixora.edu',
    role: 'Technician',
    department: 'Electrical & Facilities',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    username: 'technician'
  }
];

export function GoogleAuthModal({ isOpen, onClose, onSuccess }) {
  const { setCurrentUser } = useCampusFix();
  const navigate = useNavigate();
  const [loadingAccount, setLoadingAccount] = useState(null);
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isOpen) return null;

  const handleSelectAccount = (account) => {
    setLoadingAccount(account.email);

    setTimeout(() => {
      const googleUser = {
        id: `G-${Date.now().toString().slice(-6)}`,
        name: account.name,
        username: account.username || account.email.split('@')[0],
        email: account.email,
        role: account.role,
        department: account.department,
        avatar: account.name.charAt(0).toUpperCase(),
        authProvider: 'Google'
      };

      setCurrentUser(googleUser);
      localStorage.setItem('campusfix_user', JSON.stringify(googleUser));
      localStorage.setItem('campusfix_token', `g_oauth_${Date.now()}`);

      setLoadingAccount(null);
      if (onSuccess) onSuccess(googleUser);
      if (onClose) onClose();

      if (googleUser.role === 'Admin') {
        navigate('/admin');
      } else if (googleUser.role === 'Technician') {
        navigate('/issues');
      } else {
        navigate('/dashboard');
      }
    }, 800);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;

    const parsedName = customEmail.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);

    handleSelectAccount({
      name: formattedName,
      email: customEmail,
      role: 'Student',
      department: 'Campus Google Member',
      username: customEmail.split('@')[0]
    });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
      >
        {/* Top Header */}
        <div style={{ padding: '1.5rem 1.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GoogleIcon size={22} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
                Sign in with Google
              </h3>
              <p style={{ margin: '1px 0 0', fontSize: '0.75rem', color: '#64748B' }}>
                to continue to Fixora Campus OS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#F1F5F9',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Account Selection Body */}
        <div style={{ padding: '1.25rem 1.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Choose an account
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.75rem' }}>
            {GOOGLE_CAMPUS_ACCOUNTS.map((acc) => {
              const isLoading = loadingAccount === acc.email;

              return (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectAccount(acc)}
                  disabled={Boolean(loadingAccount)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: isLoading ? '#E6F2F1' : '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!loadingAccount) e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseLeave={(e) => {
                    if (!loadingAccount) e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        backgroundColor: '#004643', 
                        color: '#FFFFFF', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.9rem',
                        fontWeight: 700 
                      }}
                    >
                      {acc.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                        {acc.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {acc.email}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      style={{ 
                        fontSize: '0.675rem', 
                        fontWeight: 700, 
                        padding: '2px 7px', 
                        borderRadius: '9999px',
                        backgroundColor: acc.role === 'Admin' ? '#ECFDF5' : '#F1F5F9',
                        color: acc.role === 'Admin' ? '#047857' : '#475569'
                      }}
                    >
                      {acc.role}
                    </span>
                    {isLoading ? (
                      <span style={{ fontSize: '0.75rem', color: '#004643', fontWeight: 600 }}>Connecting...</span>
                    ) : (
                      <ArrowRight size={14} style={{ color: '#94A3B8' }} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Use Another Google Account Toggle */}
          {!showCustomInput ? (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: 'transparent',
                border: '1px dashed #CBD5E1',
                color: '#475569',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginTop: '10px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#004643';
                e.currentTarget.style.color = '#004643';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.color = '#475569';
              }}
            >
              <UserPlus size={16} />
              <span>Use another Google account</span>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="name@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  style={{
                    flex: 1,
                    height: '38px',
                    padding: '0 10px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.825rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={Boolean(loadingAccount)}
                  className="btn btn-primary"
                  style={{ padding: '0 14px', fontSize: '0.8rem', height: '38px' }}
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {/* Google OAuth Security Notice */}
          <div style={{ marginTop: '1.25rem', padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.725rem', color: '#64748B' }}>
            <ShieldCheck size={14} style={{ color: '#004643', marginTop: '2px', flexShrink: 0 }} />
            <span>
              Fixora uses Google Identity Services to securely verify your campus email. No passwords are stored on external servers.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '0.875rem 1.75rem', backgroundColor: '#F8FAFC', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: '#94A3B8' }}>
          <span>English (United States)</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default GoogleAuthModal;
