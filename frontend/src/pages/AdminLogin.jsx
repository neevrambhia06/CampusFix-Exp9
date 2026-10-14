import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Lock, 
  User, 
  ArrowRight, 
  AlertCircle, 
  ArrowLeft, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Sparkles,
  CheckCircle2,
  LogOut,
  ChevronRight,
  Hash
} from 'lucide-react';
import { useCampusFix } from '../context/CampusFixContext';
import { GoogleAuthModal, GoogleIcon } from '../components/reactbits/GoogleAuthModal';
import { CodeSlots } from '../components/reactbits/CodeSlots';

// Define the 4 core campus roles
const CAMPUS_ROLES = [
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
    code: '948210',
    description: 'Full triage authority, status updates, ticket deletion, and system telemetry.',
    destination: '/admin',
    userProfile: {
      id: 'ADM-2026-01',
      name: 'Campus Administrator',
      role: 'Admin',
      department: 'Campus Maintenance Directorate',
      email: 'admin@fixora.edu',
      avatar: '🛡️'
    }
  },
  {
    id: 'student',
    name: 'Student',
    icon: GraduationCap,
    badge: 'CAMPUS RESIDENT',
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    username: 'student',
    password: 'student',
    code: '123456',
    description: 'Report campus maintenance issues, track progress, and view live resolution updates.',
    destination: '/dashboard',
    userProfile: {
      id: 'STU-2026-88',
      name: 'Aarav Shah',
      role: 'Student',
      department: 'Computer Science & Engg.',
      email: 'aarav.shah@campus.edu',
      avatar: '🎓'
    }
  },
  {
    id: 'faculty',
    name: 'Faculty',
    icon: Briefcase,
    badge: 'ACADEMIC STAFF',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    username: 'faculty',
    password: 'faculty',
    code: '888888',
    description: 'Submit prioritized reports for lecture halls, laboratories, and departmental infrastructure.',
    destination: '/dashboard',
    userProfile: {
      id: 'FAC-2026-14',
      name: 'Dr. Neha Sen',
      role: 'Faculty',
      department: 'Information Technology',
      email: 'neha.sen@campus.edu',
      avatar: '👩‍🏫'
    }
  },
  {
    id: 'technician',
    name: 'Technician',
    icon: Wrench,
    badge: 'OPERATIONS CREW',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    username: 'technician',
    password: 'tech',
    code: '777777',
    description: 'Field engineer access to inspect work orders, verify equipment, and update tickets.',
    destination: '/issues',
    userProfile: {
      id: 'TECH-2026-03',
      name: 'Ramesh Patel',
      role: 'Technician',
      department: 'Electrical & HVAC Services',
      email: 'ramesh.patel@fixora.edu',
      avatar: '🔧'
    }
  }
];

export function AdminLogin() {
  const { login, logout, isAdmin, currentUser, setCurrentUser } = useCampusFix();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(CAMPUS_ROLES[0]);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSwitchingAccount, setIsSwitchingAccount] = useState(false);
  
  // New States: Google Auth & CodeSlots
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [authMethod, setAuthMethod] = useState('credentials'); // 'credentials' | 'codeslots'

  // If already logged in and not explicitly switching accounts, show active profile
  const isCurrentlyAuthenticated = currentUser && !isSwitchingAccount;

  // Handle Role selection
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setUsername(role.username);
    setPassword(role.password);
    setErrorMessage('');
  };

  // Handle Standard Form Submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const authenticatedUser = await login(username, password);
      setIsSwitchingAccount(false);

      if (authenticatedUser?.role === 'Admin') {
        navigate('/admin');
      } else if (authenticatedUser?.role === 'Technician') {
        navigate('/issues');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid credentials. Select a role above or use demo access.');
    } finally {
      setLoading(false);
    }
  };

  // Handle CodeSlots 6-digit verification completion
  const handleCodeSlotsComplete = async (code) => {
    setLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      // Find matching role by code or map dynamically
      let matchedRole = CAMPUS_ROLES.find((r) => r.code === code) || selectedRole;

      const userProfile = {
        ...matchedRole.userProfile,
        authProvider: 'CodeSlots'
      };

      setCurrentUser(userProfile);
      localStorage.setItem('campusfix_user', JSON.stringify(userProfile));
      localStorage.setItem('campusfix_token', `slot_auth_${Date.now()}`);

      setLoading(false);

      if (userProfile.role === 'Admin') {
        navigate('/admin');
      } else if (userProfile.role === 'Technician') {
        navigate('/issues');
      } else {
        navigate('/dashboard');
      }
    }, 600);
  };

  // Quick 1-Click Sign In for Instant Testing
  const handleQuickSignIn = async (role) => {
    setSelectedRole(role);
    setUsername(role.username);
    setPassword(role.password);
    setErrorMessage('');
    setLoading(true);

    try {
      const authenticatedUser = await login(role.username, role.password);
      setIsSwitchingAccount(false);

      if (authenticatedUser?.role === 'Admin') {
        navigate('/admin');
      } else if (authenticatedUser?.role === 'Technician') {
        navigate('/issues');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Quick login failed. Try entering credentials manually.');
    } finally {
      setLoading(false);
    }
  };

  // State: Already Logged In View
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
            boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
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
              marginBottom: '1.25rem',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
            }}
          >
            {currentUser.avatar || <User size={32} />}
          </div>

          <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.725rem', fontWeight: 700, letterSpacing: '0.04em', backgroundColor: isAdmin ? '#ECFDF5' : '#EFF6FF', color: isAdmin ? '#047857' : '#2563EB', marginBottom: '0.75rem' }}>
            {currentUser.role?.toUpperCase() || 'CAMPUS MEMBER'}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
            {currentUser.name}
          </h2>

          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.25rem' }}>
            {currentUser.email || `${currentUser.username || 'user'}@campus.edu`}
          </p>

          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '2rem' }}>
            {currentUser.department || 'Campus Community'}
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
                <span>Continue to Dashboard</span>
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
                marginTop: '0.75rem',
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
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#64748B';
              }}
            >
              <LogOut size={14} />
              <span>Sign In as Another Role</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const ActiveIcon = selectedRole.icon;

  return (
    <div style={{ minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem' }}>
      
      {/* Google Auth Modal */}
      <GoogleAuthModal 
        isOpen={showGoogleModal} 
        onClose={() => setShowGoogleModal(false)} 
      />

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
        <div style={{ padding: '2rem 2rem 1.25rem', textAlign: 'center', borderBottom: '1px solid #F1F5F9' }}>
          
          <div 
            style={{ 
              width: '54px', 
              height: '54px', 
              borderRadius: '16px', 
              backgroundColor: selectedRole.bg, 
              color: selectedRole.color, 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '1rem',
              transition: 'all 0.2s ease',
              border: `1px solid ${selectedRole.border}`
            }}
          >
            <ActiveIcon size={28} />
          </div>

          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 0.35rem 0' }}>
            Fixora Campus Portal
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
            Unified authentication gateway with Google Auth, CodeSlots & Multi-Role Access
          </p>

          {/* Minimalist Role Selector Segmented Tabs */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '6px', 
              backgroundColor: '#F8FAFC', 
              padding: '6px', 
              borderRadius: '14px', 
              marginTop: '1.25rem',
              border: '1px solid #E2E8F0'
            }}
          >
            {CAMPUS_ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole.id === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelectRole(role)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 4px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: isSelected ? '#ffffff' : 'transparent',
                    color: isSelected ? role.color : '#64748B',
                    boxShadow: isSelected ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                    cursor: 'pointer',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.75rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{role.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem 2rem' }}>
          
          {/* Google Auth Button (Pixel-perfect Google OAuth trigger) */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            style={{
              width: '100%',
              height: '44px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '12px',
              color: '#334155',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.borderColor = '#94A3B8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#CBD5E1';
            }}
          >
            <GoogleIcon size={18} />
            <span>Continue with Google</span>
          </button>

          {/* Separator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1.25rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
            <span style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              OR SIGN IN VIA
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
          </div>

          {/* Auth Method Sub-Toggle: Standard Credentials vs CodeSlots OTP */}
          <div 
            style={{ 
              display: 'flex', 
              backgroundColor: '#F1F5F9', 
              padding: '4px', 
              borderRadius: '10px', 
              marginBottom: '1.25rem' 
            }}
          >
            <button
              type="button"
              onClick={() => setAuthMethod('credentials')}
              style={{
                flex: 1,
                padding: '6px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.775rem',
                fontWeight: authMethod === 'credentials' ? 700 : 500,
                backgroundColor: authMethod === 'credentials' ? '#FFFFFF' : 'transparent',
                color: authMethod === 'credentials' ? '#0F172A' : '#64748B',
                boxShadow: authMethod === 'credentials' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              Username & Password
            </button>

            <button
              type="button"
              onClick={() => setAuthMethod('codeslots')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '6px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.775rem',
                fontWeight: authMethod === 'codeslots' ? 700 : 500,
                backgroundColor: authMethod === 'codeslots' ? '#FFFFFF' : 'transparent',
                color: authMethod === 'codeslots' ? '#004643' : '#64748B',
                boxShadow: authMethod === 'codeslots' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              <Hash size={13} />
              <span>CodeSlots Passcode</span>
            </button>
          </div>

          {/* Error Message */}
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

          {/* METHOD 1: CodeSlots OTP Verification Input */}
          {authMethod === 'codeslots' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '0.5rem 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>
                  Enter 6-Digit Campus Passcode
                </span>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0' }}>
                  Slot-animated verification with spring recoil physics
                </p>
              </div>

              <CodeSlots 
                length={6} 
                presetCode={selectedRole.code}
                onComplete={handleCodeSlotsComplete}
                disabled={loading}
              />

              {loading && (
                <div style={{ fontSize: '0.8rem', color: '#004643', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} className="animate-spin" />
                  <span>Verifying CodeSlots authentication...</span>
                </div>
              )}
            </div>
          ) : (
            /* METHOD 2: Standard Username & Password */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Username Input */}
              <div>
                <label 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.8rem', 
                    fontWeight: 600, 
                    color: '#334155', 
                    marginBottom: '6px' 
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <User size={13} style={{ color: '#64748B' }} />
                    <span>Username / Campus ID</span>
                  </span>
                  <span style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 500 }}>
                    Preset: <code>{selectedRole.username}</code>
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={`e.g. ${selectedRole.username}`}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 0.875rem',
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
              </div>

              {/* Password Input with Show/Hide toggle */}
              <div>
                <label 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.8rem', 
                    fontWeight: 600, 
                    color: '#334155', 
                    marginBottom: '6px' 
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <KeyRound size={13} style={{ color: '#64748B' }} />
                    <span>Password</span>
                  </span>
                  <span style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 500 }}>
                    Preset: <code>{selectedRole.password}</code>
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    style={{
                      width: '100%',
                      height: '42px',
                      paddingLeft: '0.875rem',
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Standard Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '44px',
                  marginTop: '0.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading ? (
                  <span>Authenticating with Fixora...</span>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Sign In as {selectedRole.name}</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              {/* Instant 1-Click Sign In Preset Button */}
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickSignIn(selectedRole)}
                style={{
                  width: '100%',
                  height: '38px',
                  backgroundColor: '#F8FAFC',
                  border: '1px dashed #CBD5E1',
                  borderRadius: '10px',
                  color: '#334155',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = selectedRole.bg;
                  e.currentTarget.style.borderColor = selectedRole.border;
                  e.currentTarget.style.color = selectedRole.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.color = '#334155';
                }}
              >
                <Sparkles size={14} />
                <span>Instant 1-Click Demo Login</span>
              </button>

            </form>
          )}

        </div>

        {/* Footer Navigation */}
        <div 
          style={{ 
            padding: '1.25rem 2rem', 
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
            to="/"
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
            <span>Home Landing Page</span>
          </Link>

          <span style={{ fontSize: '0.725rem', color: '#94A3B8' }}>
            Fixora Auth · Google OAuth & CodeSlots
          </span>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
