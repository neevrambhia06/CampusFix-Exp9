import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Briefcase, 
  Wrench, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  ArrowLeft, 
  KeyRound, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  LogOut, 
  ChevronRight, 
  ChevronDown, 
  Mail, 
  UserPlus, 
  LogIn, 
  X 
} from 'lucide-react';
import { useCampusFix } from '../context/CampusFixContext';

// Official Google 'G' Logo SVG
function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

// Campus Engineering & Academic Departments
const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil & Environmental Engineering',
  'Electrical & Electronics',
  'Chemical Engineering',
  'Biotechnology Engineering',
  'MBA & School of Management',
  'Campus Facilities & Operations'
];

// Preset testing roles for professors/evaluators
const EVALUATION_ROLES = [
  {
    id: 'admin',
    name: 'Administrator',
    icon: ShieldCheck,
    badge: 'SUPER ADMIN',
    color: '#004643',
    bg: '#E6F2F1',
    border: '#B2D8D5',
    username: 'admin',
    password: 'admin',
    destination: '/admin',
    note: 'Access Admin Dashboard & resolve/delete tickets'
  },
  {
    id: 'faculty',
    name: 'Faculty Staff',
    icon: Briefcase,
    badge: 'FACULTY',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    username: 'faculty',
    password: 'faculty',
    destination: '/dashboard',
    note: 'Submit high-priority lab/lecture hall tickets'
  },
  {
    id: 'technician',
    name: 'Technician Crew',
    icon: Wrench,
    badge: 'ENGINEERING CREW',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    username: 'technician',
    password: 'tech',
    destination: '/issues',
    note: 'Inspect live work orders and update repair status'
  }
];

export function AdminLogin() {
  const { login, register, loginWithGoogle, logout, isAdmin, currentUser } = useCampusFix();
  const navigate = useNavigate();

  // Tab switch: 'signin' | 'register'
  const [authMode, setAuthMode] = useState('signin');

  // Sign In Form State
  const [signInId, setSignInId] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Student Registration Form State
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: 'Computer Science & Engineering',
    role: 'Student',
    password: '',
    confirmPassword: ''
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regErrors, setRegErrors] = useState({});

  // Google OAuth Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleStep, setGoogleStep] = useState('select'); // 'select' | 'custom' | 'loading'
  const [googleCustomName, setGoogleCustomName] = useState('');
  const [googleCustomEmail, setGoogleCustomEmail] = useState('');
  const [googleCustomRollNo, setGoogleCustomRollNo] = useState('');
  const [googleCustomDept, setGoogleCustomDept] = useState('Computer Science & Engineering');

  // General UI States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPresets, setShowPresets] = useState(false);
  const [isSwitchingAccount, setIsSwitchingAccount] = useState(false);

  // If already logged in and not switching, show user profile card
  const isCurrentlyAuthenticated = currentUser && !isSwitchingAccount;

  // ----------------------------------------------------
  // Handler: Standard Sign In
  // ----------------------------------------------------
  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!signInId.trim() || !signInPassword.trim()) {
      setErrorMessage('Please enter your email/roll number and password.');
      return;
    }

    setLoading(true);
    try {
      const user = await login(signInId.trim(), signInPassword.trim());
      setIsSwitchingAccount(false);
      if (user.role === 'Admin') {
        navigate('/admin');
      } else if (user.role === 'Technician') {
        navigate('/issues');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid credentials. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // Handler: Student Registration
  // ----------------------------------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const errors = {};

    if (!regForm.name.trim()) {
      errors.name = 'Full name is required.';
    } else if (regForm.name.trim().length < 3) {
      errors.name = 'Full name must be at least 3 characters.';
    }

    if (!regForm.email.trim()) {
      errors.email = 'Institutional email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email.trim())) {
      errors.email = 'Please provide a valid college email address.';
    }

    if (!regForm.rollNo.trim()) {
      errors.rollNo = 'Campus roll number / ID is required.';
    } else if (regForm.rollNo.trim().length < 3) {
      errors.rollNo = 'Enter a valid student roll number (e.g. 2024CS0142).';
    }

    if (!regForm.password) {
      errors.password = 'Password is required.';
    } else if (regForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (regForm.password !== regForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    setRegErrors({});
    setLoading(true);

    try {
      const newUser = await register({
        name: regForm.name,
        email: regForm.email,
        rollNo: regForm.rollNo,
        department: regForm.department,
        role: regForm.role,
        password: regForm.password,
        avatar: regForm.name.trim().charAt(0).toUpperCase()
      });

      setSuccessMessage(`Account created for ${newUser.name}! Entering Fixora...`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 900);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // Handler: Google Sign-In Execution
  // ----------------------------------------------------
  const executeGoogleLogin = async (account) => {
    setGoogleStep('loading');
    setErrorMessage('');

    setTimeout(async () => {
      try {
        const user = await loginWithGoogle({
          name: account.name,
          email: account.email,
          rollNo: account.rollNo,
          department: account.department || 'Computer Science & Engineering',
          role: 'Student',
          picture: account.avatar || account.name.charAt(0).toUpperCase()
        });

        setShowGoogleModal(false);
        setGoogleStep('select');
        navigate('/dashboard');
      } catch (err) {
        setGoogleStep('select');
        setErrorMessage('Google Authentication failed: ' + err.message);
      }
    }, 650);
  };

  // ----------------------------------------------------
  // Handler: Quick Demo Role Login
  // ----------------------------------------------------
  const handleQuickDemoRole = async (role) => {
    setErrorMessage('');
    setLoading(true);
    try {
      const authenticatedUser = await login(role.username, role.password);
      setIsSwitchingAccount(false);
      navigate(role.destination);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // Render: Already Logged In Active Profile View
  // ====================================================
  if (isCurrentlyAuthenticated && currentUser.name) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div 
          style={{ 
            maxWidth: '480px', 
            width: '100%', 
            backgroundColor: '#ffffff', 
            borderRadius: '20px', 
            border: '1px solid #E2E8F0',
            boxShadow: '0 12px 32px -4px rgba(15, 23, 42, 0.08)',
            padding: '2.5rem 2rem',
            textAlign: 'center'
          }}
        >
          {/* Avatar Icon */}
          <div 
            style={{ 
              width: '68px', 
              height: '68px', 
              borderRadius: '20px', 
              backgroundColor: isAdmin ? '#E6F2F1' : '#F1F5F9', 
              color: isAdmin ? '#004643' : '#334155', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '1.75rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
            }}
          >
            {currentUser.avatar && currentUser.avatar.length <= 2 ? currentUser.avatar : currentUser.name.charAt(0)}
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.725rem', fontWeight: 700, letterSpacing: '0.04em', backgroundColor: isAdmin ? '#ECFDF5' : '#EFF6FF', color: isAdmin ? '#047857' : '#2563EB', marginBottom: '0.75rem' }}>
            {currentUser.authProvider === 'google' && <GoogleIcon size={12} />}
            <span>{currentUser.role?.toUpperCase() || 'CAMPUS MEMBER'}</span>
            {currentUser.verified && <span>· VERIFIED</span>}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
            {currentUser.name}
          </h2>

          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.25rem' }}>
            {currentUser.email || `${currentUser.username || 'student'}@campus.edu`}
          </p>

          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.75rem' }}>
            {currentUser.rollNo ? `Roll No: ${currentUser.rollNo} · ` : ''}{currentUser.department || 'Campus Resident'}
          </p>

          {/* Action Navigation Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {isAdmin ? (
              <button 
                onClick={() => navigate('/admin')} 
                className="btn btn-primary"
                style={{ padding: '0.75rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                <ShieldCheck size={18} />
                <span>Open Admin Control Center</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                onClick={() => navigate('/dashboard')} 
                className="btn btn-primary"
                style={{ padding: '0.75rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                <span>Continue to Campus Dashboard</span>
                <ArrowRight size={16} />
              </button>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button 
                onClick={() => navigate('/issues')} 
                className="btn btn-secondary"
                style={{ padding: '0.625rem', fontSize: '0.825rem' }}
              >
                Browse Tickets
              </button>

              <button 
                onClick={() => navigate('/report')} 
                className="btn btn-secondary"
                style={{ padding: '0.625rem', fontSize: '0.825rem' }}
              >
                Report Problem
              </button>
            </div>

            <button
              onClick={() => {
                logout();
                setIsSwitchingAccount(true);
              }}
              style={{
                marginTop: '0.5rem',
                padding: '0.625rem',
                background: 'transparent',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                color: '#64748B',
                fontSize: '0.825rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFF1F2';
                e.currentTarget.style.color = '#BE123C';
                e.currentTarget.style.borderColor = '#FECDD3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#64748B';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <LogOut size={14} />
              <span>Sign Out / Switch Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================
  // Render: Main Portal Authentication Gateway
  // ====================================================
  return (
    <div style={{ minHeight: '84vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      
      {/* -------------------------------------------------- */}
      {/* Google OAuth Interactive Modal Dialog             */}
      {/* -------------------------------------------------- */}
      {showGoogleModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && googleStep !== 'loading') {
              setShowGoogleModal(false);
            }
          }}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
              overflow: 'hidden',
              border: '1px solid #E2E8F0',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 1.75rem 1rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GoogleIcon size={24} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    Sign in with Google
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0 0' }}>
                    to continue to Fixora (fixora.campus.edu)
                  </p>
                </div>
              </div>
              {googleStep !== 'loading' && (
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Modal Content */}
            <div style={{ padding: '1.5rem 1.75rem' }}>
              {googleStep === 'loading' ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      margin: '0 auto 1.25rem',
                      border: '3px solid #E2E8F0',
                      borderTopColor: '#4285F4',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}
                  />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
                    Authorizing Google Identity Token...
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>
                    Verifying student institutional credentials with Fixora SSO gateway
                  </p>
                </div>
              ) : googleStep === 'select' ? (
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1rem', fontWeight: 500 }}>
                    Choose an institutional Google account:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Account 1: Neev Rambhia */}
                    <button
                      type="button"
                      onClick={() => executeGoogleLogin({
                        name: 'Neev Rambhia',
                        email: 'neev.rambhia@campus.edu',
                        rollNo: '2024CS0042',
                        department: 'Computer Science & Engineering',
                        avatar: 'N'
                      })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#004643';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }}
                    >
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#004643', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                        N
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                          Neev Rambhia
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          neev.rambhia@campus.edu · Roll 2024CS0042
                        </div>
                      </div>
                      <ChevronRight size={16} color="#94A3B8" />
                    </button>

                    {/* Account 2: Aarav Sharma */}
                    <button
                      type="button"
                      onClick={() => executeGoogleLogin({
                        name: 'Aarav Sharma',
                        email: 'aarav.sharma@campus.edu',
                        rollNo: '2024IT0118',
                        department: 'Information Technology',
                        avatar: 'A'
                      })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#004643';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }}
                    >
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#2563EB', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                        A
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                          Aarav Sharma
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          aarav.sharma@campus.edu · Roll 2024IT0118
                        </div>
                      </div>
                      <ChevronRight size={16} color="#94A3B8" />
                    </button>

                    {/* Custom Account Option */}
                    <button
                      type="button"
                      onClick={() => setGoogleStep('custom')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: '1px dashed #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        cursor: 'pointer',
                        textAlign: 'left',
                        marginTop: '4px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFF6FF';
                        e.currentTarget.style.borderColor = '#2563EB';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }}
                    >
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#E2E8F0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserPlus size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
                          Use another Google account
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#64748B' }}>
                          Enter your personal or custom institutional details
                        </div>
                      </div>
                      <ChevronRight size={16} color="#94A3B8" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Google Step: Custom Account Details Form */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!googleCustomName.trim() || !googleCustomEmail.trim()) {
                      setErrorMessage('Please enter your Google name and email.');
                      return;
                    }
                    executeGoogleLogin({
                      name: googleCustomName.trim(),
                      email: googleCustomEmail.trim(),
                      rollNo: googleCustomRollNo.trim() || `STU-${Date.now().toString().slice(-4)}`,
                      department: googleCustomDept
                    });
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
                >
                  <div style={{ fontSize: '0.825rem', color: '#475569', marginBottom: '2px', fontWeight: 600 }}>
                    Enter your Google student credentials:
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Patel"
                      value={googleCustomName}
                      onChange={(e) => setGoogleCustomName(e.target.value)}
                      style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Google / College Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. diya.p@campus.edu or diya@gmail.com"
                      value={googleCustomEmail}
                      onChange={(e) => setGoogleCustomEmail(e.target.value)}
                      style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Roll Number / ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2024CS0301"
                        value={googleCustomRollNo}
                        onChange={(e) => setGoogleCustomRollNo(e.target.value)}
                        style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Department
                      </label>
                      <select
                        value={googleCustomDept}
                        onChange={(e) => setGoogleCustomDept(e.target.value)}
                        style={{ width: '100%', height: '38px', padding: '0 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem', backgroundColor: '#ffffff' }}
                      >
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setGoogleStep('select')}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.55rem', fontSize: '0.825rem' }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 2, padding: '0.55rem', fontSize: '0.825rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <GoogleIcon size={14} />
                      <span>Authenticate</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Privacy disclaimer */}
              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9', fontSize: '0.7rem', color: '#94A3B8', textAlign: 'center', lineHeight: 1.4 }}>
                Fixora uses Google OAuth 2.0 to securely verify campus community identity. Your institutional data is kept strictly confidential.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* Main Authentication Card                           */}
      {/* -------------------------------------------------- */}
      <div 
        style={{ 
          maxWidth: '520px', 
          width: '100%', 
          backgroundColor: '#ffffff', 
          borderRadius: '24px', 
          border: '1px solid #E2E8F0',
          boxShadow: '0 12px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
          overflow: 'hidden'
        }}
      >
        
        {/* Top Header */}
        <div style={{ padding: '2.25rem 2rem 1.25rem', textAlign: 'center', borderBottom: '1px solid #F1F5F9' }}>
          
          {/* Logo Badge */}
          <div 
            style={{ 
              width: '52px', 
              height: '52px', 
              borderRadius: '16px', 
              backgroundColor: '#E6F2F1', 
              color: '#004643', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '1rem',
              border: '1px solid #B2D8D5',
              boxShadow: '0 4px 12px rgba(0, 70, 67, 0.08)'
            }}
          >
            <ShieldCheck size={28} />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 0.35rem 0' }}>
            Fixora Campus Portal
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
            {authMode === 'signin' 
              ? 'Sign in to report maintenance, check live repairs, and manage tickets.'
              : 'Register your genuine student or staff profile to get campus access.'}
          </p>

          {/* Segmented Auth Mode Switcher */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '6px', 
              backgroundColor: '#F8FAFC', 
              padding: '5px', 
              borderRadius: '12px', 
              marginTop: '1.5rem',
              border: '1px solid #E2E8F0'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: authMode === 'signin' ? '#ffffff' : 'transparent',
                color: authMode === 'signin' ? '#004643' : '#64748B',
                boxShadow: authMode === 'signin' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                cursor: 'pointer',
                fontWeight: authMode === 'signin' ? 700 : 500,
                fontSize: '0.825rem',
                transition: 'all 0.15s ease'
              }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: authMode === 'register' ? '#ffffff' : 'transparent',
                color: authMode === 'register' ? '#004643' : '#64748B',
                boxShadow: authMode === 'register' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                cursor: 'pointer',
                fontWeight: authMode === 'register' ? 700 : 500,
                fontSize: '0.825rem',
                transition: 'all 0.15s ease'
              }}
            >
              <UserPlus size={15} />
              <span>Create Account</span>
            </button>
          </div>

        </div>

        {/* Form Body */}
        <div style={{ padding: '1.75rem 2rem' }}>
          
          {/* Feedback Messages */}
          {errorMessage && (
            <div 
              style={{
                backgroundColor: '#FFF1F2',
                color: '#BE123C',
                border: '1px solid #FECDD3',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                fontSize: '0.825rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div 
              style={{
                backgroundColor: '#ECFDF5',
                color: '#047857',
                border: '1px solid #A7F3D0',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                fontSize: '0.825rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* -------------------------------------------------- */}
          {/* TAB 1: SIGN IN                                     */}
          {/* -------------------------------------------------- */}
          {authMode === 'signin' && (
            <div>
              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={() => {
                  setGoogleStep('select');
                  setShowGoogleModal(true);
                }}
                style={{
                  width: '100%',
                  height: '44px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  color: '#1E293B',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.15s ease',
                  marginBottom: '1.25rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#94A3B8';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                }}
              >
                <GoogleIcon size={18} />
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '1.25rem 0',
                  gap: '12px'
                }}
              >
                <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
                <span style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  or sign in with campus ID
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
              </div>

              {/* Standard Sign In Form */}
              <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Institutional Email or Campus ID / Roll No
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      value={signInId}
                      onChange={(e) => setSignInId(e.target.value)}
                      placeholder="e.g. rollno@campus.edu or 2024CS0042"
                      style={{
                        width: '100%',
                        height: '42px',
                        paddingLeft: '2.25rem',
                        paddingRight: '0.875rem',
                        fontSize: '0.875rem',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        outline: 'none',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A',
                        transition: 'all 0.15s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.backgroundColor = '#ffffff';
                        e.target.style.borderColor = '#004643';
                      }}
                      onBlur={(e) => {
                        e.target.style.backgroundColor = '#F8FAFC';
                        e.target.style.borderColor = '#E2E8F0';
                      }}
                    />
                    <Mail size={15} style={{ position: 'absolute', left: '11px', top: '13px', color: '#94A3B8' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                      Password
                    </label>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showSignInPassword ? 'text' : 'password'}
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your account password"
                      style={{
                        width: '100%',
                        height: '42px',
                        paddingLeft: '2.25rem',
                        paddingRight: '2.5rem',
                        fontSize: '0.875rem',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        outline: 'none',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A',
                        transition: 'all 0.15s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.backgroundColor = '#ffffff';
                        e.target.style.borderColor = '#004643';
                      }}
                      onBlur={(e) => {
                        e.target.style.backgroundColor = '#F8FAFC';
                        e.target.style.borderColor = '#E2E8F0';
                      }}
                    />
                    <KeyRound size={15} style={{ position: 'absolute', left: '11px', top: '13px', color: '#94A3B8' }} />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '12px',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {showSignInPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    height: '44px',
                    marginTop: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <Lock size={15} />
                      <span>Sign In to Fixora</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Toggle to Register */}
              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: '#64748B' }}>
                <span>New student or campus resident? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMessage('');
                  }}
                  style={{ background: 'none', border: 'none', color: '#004643', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Create Student Account
                </button>
              </div>
            </div>
          )}

          {/* -------------------------------------------------- */}
          {/* TAB 2: CREATE ACCOUNT (STUDENT REGISTRATION)      */}
          {/* -------------------------------------------------- */}
          {authMode === 'register' && (
            <div>
              {/* Google Fast Registration */}
              <button
                type="button"
                onClick={() => {
                  setGoogleStep('select');
                  setShowGoogleModal(true);
                }}
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  color: '#1E293B',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.15s ease',
                  marginBottom: '1.25rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#94A3B8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                }}
              >
                <GoogleIcon size={17} />
                <span>Quick Sign Up with Google</span>
              </button>

              {/* Divider */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '1rem 0',
                  gap: '12px'
                }}
              >
                <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  or enter student details
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
              </div>

              {/* Registration Form */}
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neev Rambhia or Rohan Sharma"
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      height: '38px',
                      padding: '0 0.75rem',
                      fontSize: '0.85rem',
                      borderRadius: '8px',
                      border: `1px solid ${regErrors.name ? '#EF4444' : '#E2E8F0'}`,
                      outline: 'none',
                      backgroundColor: '#F8FAFC',
                      color: '#0F172A'
                    }}
                  />
                  {regErrors.name && (
                    <span style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '2px', display: 'block' }}>
                      {regErrors.name}
                    </span>
                  )}
                </div>

                {/* Institutional Email & Roll No Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      College Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@campus.edu"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      style={{
                        width: '100%',
                        height: '38px',
                        padding: '0 0.75rem',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        border: `1px solid ${regErrors.email ? '#EF4444' : '#E2E8F0'}`,
                        outline: 'none',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A'
                      }}
                    />
                    {regErrors.email && (
                      <span style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '2px', display: 'block' }}>
                        {regErrors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Roll No / ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2024CS0042"
                      value={regForm.rollNo}
                      onChange={(e) => setRegForm({ ...regForm, rollNo: e.target.value })}
                      style={{
                        width: '100%',
                        height: '38px',
                        padding: '0 0.75rem',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        border: `1px solid ${regErrors.rollNo ? '#EF4444' : '#E2E8F0'}`,
                        outline: 'none',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A'
                      }}
                    />
                    {regErrors.rollNo && (
                      <span style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '2px', display: 'block' }}>
                        {regErrors.rollNo}
                      </span>
                    )}
                  </div>
                </div>

                {/* Department & Role Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Department *
                    </label>
                    <select
                      value={regForm.department}
                      onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                      style={{
                        width: '100%',
                        height: '38px',
                        padding: '0 0.5rem',
                        fontSize: '0.775rem',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        outline: 'none',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A'
                      }}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Campus Role
                    </label>
                    <select
                      value={regForm.role}
                      onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                      style={{
                        width: '100%',
                        height: '38px',
                        padding: '0 0.5rem',
                        fontSize: '0.775rem',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        outline: 'none',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A'
                      }}
                    >
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Technician">Staff / Tech</option>
                    </select>
                  </div>
                </div>

                {/* Password & Confirm Password Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Password *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        placeholder="Min 6 chars"
                        value={regForm.password}
                        onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                        style={{
                          width: '100%',
                          height: '38px',
                          paddingLeft: '0.75rem',
                          paddingRight: '2rem',
                          fontSize: '0.85rem',
                          borderRadius: '8px',
                          border: `1px solid ${regErrors.password ? '#EF4444' : '#E2E8F0'}`,
                          outline: 'none',
                          backgroundColor: '#F8FAFC',
                          color: '#0F172A'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '11px',
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        {showRegPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {regErrors.password && (
                      <span style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '2px', display: 'block' }}>
                        {regErrors.password}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Confirm Password *
                    </label>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      placeholder="Repeat password"
                      value={regForm.confirmPassword}
                      onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                      style={{
                        width: '100%',
                        height: '38px',
                        padding: '0 0.75rem',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        border: `1px solid ${regErrors.confirmPassword ? '#EF4444' : '#E2E8F0'}`,
                        outline: 'none',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A'
                      }}
                    />
                    {regErrors.confirmPassword && (
                      <span style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '2px', display: 'block' }}>
                        {regErrors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Registration Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    height: '42px',
                    marginTop: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading ? (
                    <span>Registering Student Account...</span>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      <span>Complete Registration & Enter Fixora</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Toggle to Sign In */}
              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: '#64748B' }}>
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMessage('');
                  }}
                  style={{ background: 'none', border: 'none', color: '#004643', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Sign In to Account
                </button>
              </div>
            </div>
          )}

          {/* -------------------------------------------------- */}
          {/* Collapsible Testing & Evaluator Access Helper      */}
          {/* -------------------------------------------------- */}
          <div style={{ marginTop: '1.75rem', borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                color: '#64748B',
                fontSize: '0.775rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 0'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <KeyRound size={13} style={{ color: '#004643' }} />
                <span>Faculty & Admin Evaluation Accounts</span>
              </span>
              <ChevronDown 
                size={14} 
                style={{ 
                  transform: showPresets ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease'
                }} 
              />
            </button>

            {showPresets && (
              <div 
                style={{ 
                  marginTop: '0.75rem',
                  padding: '0.875rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ fontSize: '0.725rem', color: '#64748B', lineHeight: 1.4, marginBottom: '2px' }}>
                  Use these preset credentials for professor evaluation or grading:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {EVALUATION_ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      disabled={loading}
                      onClick={() => handleQuickDemoRole(role)}
                      style={{
                        padding: '8px 6px',
                        backgroundColor: '#ffffff',
                        border: `1px solid ${role.border}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = role.bg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: role.color }}>
                        {role.name}
                      </div>
                      <div style={{ fontSize: '0.675rem', color: '#94A3B8', marginTop: '2px' }}>
                        <code>{role.username}</code>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer Navigation */}
        <div 
          style={{ 
            padding: '1.15rem 2rem', 
            backgroundColor: '#F8FAFC', 
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#64748B'
          }}
        >
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              color: '#64748B',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={13} />
            <span>Continue as Guest</span>
          </Link>

          <span style={{ fontSize: '0.725rem', color: '#94A3B8' }}>
            Fixora · Secure Campus SSO
          </span>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
