import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  Activity, 
  BarChart3, 
  Layers, 
  Users, 
  Smartphone, 
  Wrench, 
  Building2, 
  Bell, 
  Check, 
  Lock, 
  ChevronRight, 
  GraduationCap, 
  Briefcase, 
  FileText,
  Palette,
  Menu,
  X
} from 'lucide-react';

/**
 * STRICT 3-COLOR TONE ARCHITECTURE (60-30-10 Tri-Tone System)
 * -----------------------------------------------------------------------------
 * 1. Tone 1: Primary Brand Tone (~30%) - Focal identity, primary CTAs, active states, key fills
 * 2. Tone 2: Neutral Slate Canvas (~60%) - Obsidian text, slate bodies, crisp borders, cards & backgrounds
 * 3. Tone 3: High-Contrast Accent (~10%) - Live pulses, SLA alerts, telemetry badges, conversion spark
 */
export const TRI_TONE_PRESETS = {
  aquamarine: {
    id: 'aquamarine',
    name: 'Teal · Slate · Amber',
    label: 'Campus Institutional (Default)',
    primary: '#004643',
    primaryHover: '#003634',
    primaryLight: '#E6F2F1',
    primaryBorder: '#99CBC7',
    primaryGlow: 'rgba(0, 70, 67, 0.22)',
    neutralDark: '#0F172A',
    neutralBody: '#334155',
    neutralMuted: '#64748B',
    neutralBorder: '#E2E8F0',
    neutralBorderHover: '#CBD5E1',
    neutralBg: '#F8FAFC',
    neutralSurface: '#FFFFFF',
    accent: '#D97706',
    accentLight: '#FEF3C7',
    accentBorder: '#FDE68A',
    accentText: '#92400E',
    accentGlow: 'rgba(217, 119, 6, 0.25)',
    bannerGradient: 'linear-gradient(135deg, #004643 0%, #002B29 100%)',
    heroGradient: 'radial-gradient(1200px 520px at 50% 0%, #E6F2F1 0%, rgba(248, 250, 252, 0) 100%)',
    tagBg: '#E6F2F1'
  },
  indigo: {
    id: 'indigo',
    name: 'Indigo · Slate · Mint',
    label: 'Modern Enterprise SaaS',
    primary: '#4F46E5',
    primaryHover: '#4338CA',
    primaryLight: '#EEF2FF',
    primaryBorder: '#C7D2FE',
    primaryGlow: 'rgba(79, 70, 229, 0.22)',
    neutralDark: '#0F172A',
    neutralBody: '#334155',
    neutralMuted: '#64748B',
    neutralBorder: '#E2E8F0',
    neutralBorderHover: '#CBD5E1',
    neutralBg: '#F8FAFC',
    neutralSurface: '#FFFFFF',
    accent: '#059669',
    accentLight: '#ECFDF5',
    accentBorder: '#A7F3D0',
    accentText: '#065F46',
    accentGlow: 'rgba(5, 150, 105, 0.25)',
    bannerGradient: 'linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)',
    heroGradient: 'radial-gradient(1200px 520px at 50% 0%, #EEF2FF 0%, rgba(248, 250, 252, 0) 100%)',
    tagBg: '#EEF2FF'
  },
  cobalt: {
    id: 'cobalt',
    name: 'Cobalt · Slate · Coral',
    label: 'High-Impact SaaS',
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryLight: '#EFF6FF',
    primaryBorder: '#BFDBFE',
    primaryGlow: 'rgba(37, 99, 235, 0.22)',
    neutralDark: '#0F172A',
    neutralBody: '#334155',
    neutralMuted: '#64748B',
    neutralBorder: '#E2E8F0',
    neutralBorderHover: '#CBD5E1',
    neutralBg: '#F8FAFC',
    neutralSurface: '#FFFFFF',
    accent: '#EA580C',
    accentLight: '#FFF7ED',
    accentBorder: '#FED7AA',
    accentText: '#9A3412',
    accentGlow: 'rgba(234, 88, 12, 0.25)',
    bannerGradient: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
    heroGradient: 'radial-gradient(1200px 520px at 50% 0%, #EFF6FF 0%, rgba(248, 250, 252, 0) 100%)',
    tagBg: '#EFF6FF'
  }
};

/**
 * STATIC ROLE PROFILES
 * Extracted to module scope for render-cycle performance and memory optimization.
 */
export const ROLE_PROFILES = {
  student: {
    id: 'student',
    title: 'Campus Residents & Students',
    badge: 'RESIDENT ACCESS',
    icon: GraduationCap,
    quote: '“Submitting a leaky faucet ticket takes under 30 seconds. I can track the repair crew in real time right from my phone.”',
    author: 'Aarav Shah · North Campus Resident',
    highlights: [
      'Photo-based instant ticket logging',
      'Real-time SMS & in-app progress updates',
      'Direct technician chat & completion verification',
      'Dormitory & study room facility requests'
    ],
    destination: '/dashboard',
    ctaText: 'Explore Resident Portal'
  },
  faculty: {
    id: 'faculty',
    title: 'Faculty & Department Staff',
    badge: 'ACADEMIC STAFF',
    icon: Briefcase,
    quote: '“When our lab cooling failed before an inspection, Fixora prioritized the ticket instantly and restored temperature controls in 40 minutes.”',
    author: 'Dr. Vikram Patel · Department of Applied Sciences',
    highlights: [
      'Priority tagging for lecture halls & research labs',
      'Scheduled maintenance requests during off-hours',
      'Equipment serial number tracking & history',
      'Direct escalation to building supervisors'
    ],
    destination: '/dashboard',
    ctaText: 'Access Staff Dashboard'
  },
  technician: {
    id: 'technician',
    title: 'Facilities & Maintenance Crews',
    badge: 'FACILITY CREW',
    icon: Wrench,
    quote: '“The mobile queue automatically routes me to nearby tickets with exact room numbers, parts lists, and safety notes.”',
    author: 'Rajesh Kumar · Lead Facility Engineer',
    highlights: [
      'Mobile-optimized dispatch queue',
      'One-tap status updates (In Progress, Resolved)',
      'Inventory usage logs & maintenance checklists',
      'Emergency broadcast alerts directly to mobile'
    ],
    destination: '/issues',
    ctaText: 'View Technician Queue'
  },
  admin: {
    id: 'admin',
    title: 'Campus Operations & Administrators',
    badge: 'SYSTEM ADMIN',
    icon: ShieldCheck,
    quote: '“Fixora provides an executive view of all 14 campus buildings. Average resolution time dropped 54% in our first semester.”',
    author: 'Director of Campus Infrastructure',
    highlights: [
      'Full administrative dispatch & triage console',
      'Campus-wide facility health & recurring failure analytics',
      'Automated SLA monitoring & compliance logs',
      'Multi-tenant role permissions & staff rostering'
    ],
    destination: '/admin',
    ctaText: 'Enter Admin Console'
  }
};

export function LandingPage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('student');
  const [activeTonePreset, setActiveTonePreset] = useState('aquamarine');
  const [showTonePicker, setShowTonePicker] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tonePickerRef = useRef(null);
  const mobileNavRef = useRef(null);

  const theme = TRI_TONE_PRESETS[activeTonePreset] || TRI_TONE_PRESETS.aquamarine;
  const activeRoleDetails = ROLE_PROFILES[activeRole] || ROLE_PROFILES.student;

  // Dismiss dropdowns on outside click or Escape key press
  useEffect(() => {
    function handleClickOutside(event) {
      if (tonePickerRef.current && !tonePickerRef.current.contains(event.target)) {
        setShowTonePicker(false);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setShowTonePicker(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.neutralSurface,
      color: theme.neutralDark,
      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: 'hidden',
      position: 'relative',
      transition: 'background-color 0.25s ease, color 0.25s ease'
    }}>
      {/* Dynamic 3-Color Tone CSS Tokens with Craft Floor & Accessibility Directives */}
      <style>{`
        :root {
          --tone-primary: ${theme.primary};
          --tone-primary-hover: ${theme.primaryHover};
          --tone-primary-light: ${theme.primaryLight};
          --tone-primary-border: ${theme.primaryBorder};
          --tone-neutral-dark: ${theme.neutralDark};
          --tone-neutral-body: ${theme.neutralBody};
          --tone-neutral-muted: ${theme.neutralMuted};
          --tone-neutral-border: ${theme.neutralBorder};
          --tone-neutral-bg: ${theme.neutralBg};
          --tone-accent: ${theme.accent};
          --tone-accent-light: ${theme.accentLight};
          --tone-accent-border: ${theme.accentBorder};
          --tone-accent-text: ${theme.accentText};
        }

        ::selection {
          background-color: ${theme.primaryLight};
          color: ${theme.primary};
        }

        * {
          caret-color: ${theme.primary};
        }

        :focus-visible {
          outline: 2px solid ${theme.primary};
          outline-offset: 2px;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.95; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.25); }
        }

        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        /* prefers-reduced-motion compliance */
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .tri-tone-dot-pulse {
            animation: none !important;
            opacity: 1 !important;
          }
        }

        .landing-nav-link {
          color: ${theme.neutralMuted};
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          transition: color 0.2s ease, background-color 0.2s ease;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
        }

        .landing-nav-link:hover {
          color: ${theme.primary} !important;
          background-color: ${theme.neutralBg};
        }

        .landing-btn-primary {
          background-color: ${theme.primary};
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.925rem;
          min-height: 44px;
          padding: 0.7rem 1.4rem;
          border-radius: 10px;
          border: 1px solid ${theme.primary};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px ${theme.primaryGlow};
        }

        .landing-btn-primary:hover {
          background-color: ${theme.primaryHover};
          transform: translateY(-2px);
          box-shadow: 0 8px 22px ${theme.primaryGlow};
          border-color: ${theme.primaryHover};
        }

        .landing-btn-secondary {
          background-color: ${theme.neutralSurface};
          color: ${theme.neutralDark};
          font-weight: 700;
          font-size: 0.925rem;
          min-height: 44px;
          padding: 0.7rem 1.4rem;
          border-radius: 10px;
          border: 1px solid ${theme.neutralBorder};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        }

        .landing-btn-secondary:hover {
          background-color: ${theme.neutralBg};
          border-color: ${theme.neutralBorderHover};
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
        }

        .landing-card {
          background-color: ${theme.neutralSurface};
          border: 1px solid ${theme.neutralBorder};
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .landing-card:hover {
          border-color: ${theme.neutralBorderHover};
          transform: translateY(-4px);
          box-shadow: 0 18px 32px -8px rgba(15, 23, 42, 0.08);
        }

        .landing-role-pill {
          min-height: 44px;
          padding: 0.65rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 700;
          border: 1px solid transparent;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          background-color: ${theme.neutralBg};
          color: ${theme.neutralMuted};
        }

        .landing-role-pill.active {
          background-color: ${theme.primary};
          color: #FFFFFF;
          box-shadow: 0 4px 12px ${theme.primaryGlow};
        }

        .landing-role-pill:not(.active):hover {
          background-color: ${theme.neutralBorder};
          color: ${theme.neutralDark};
        }

        /* 44x44px Minimum Touch Target Compliance */
        .tri-tone-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 44px;
          padding: 0 14px;
          border-radius: 22px;
          background-color: ${theme.neutralBg};
          border: 1px solid ${theme.neutralBorder};
          font-size: 0.775rem;
          font-weight: 700;
          color: ${theme.neutralBody};
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tri-tone-badge:hover {
          border-color: ${theme.primaryBorder};
          background-color: ${theme.neutralSurface};
        }

        .tri-tone-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .landing-footer-link {
          text-decoration: none;
          color: ${theme.neutralMuted};
          font-size: 0.825rem;
          transition: color 0.2s ease;
          border-radius: 4px;
          padding: 2px 4px;
        }

        .landing-footer-link:hover {
          color: ${theme.primary};
        }

        .mobile-nav-toggle {
          display: none;
          min-height: 44px;
          min-width: 44px;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid ${theme.neutralBorder};
          border-radius: 8px;
          color: ${theme.neutralDark};
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .mobile-nav-toggle:hover {
          background-color: ${theme.neutralBg};
        }

        @media (max-width: 960px) {
          .nav-links-desktop { display: none !important; }
          .mobile-nav-toggle { display: inline-flex !important; }
          .hero-mock-grid { grid-template-columns: 1fr !important; }
          .how-it-works-flow { flex-direction: column !important; }
          .how-it-works-connector { display: none !important; }
        }

        @media (max-width: 640px) {
          .hero-cta-group { flex-direction: column !important; width: 100% !important; }
          .hero-cta-group a, .hero-cta-group button { width: 100% !important; justify-content: center !important; }
          .stats-grid-container { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. SLIM NAVIGATION BAR (ACCESSIBLE + RESPONSIVE DRAWER) */}
      {/* ============================================================ */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme.neutralBorder}`,
        height: '72px'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo & Brand Identity */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }} aria-label="Fixora Home">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: theme.bannerGradient,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 10px ${theme.primaryGlow}`
            }}>
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.3rem',
                fontWeight: 800,
                color: theme.neutralDark,
                letterSpacing: '-0.025em'
              }}>
                Fixora
              </span>
              <span style={{
                fontSize: '0.675rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: theme.primaryLight,
                color: theme.primary,
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                border: `1px solid ${theme.primaryBorder}`
              }}>
                Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop" aria-label="Primary Navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#how-it-works" className="landing-nav-link">How It Works</a>
            <a href="#roles" className="landing-nav-link">Campus Roles</a>
            <a href="#metrics" className="landing-nav-link">Metrics</a>
          </nav>

          {/* Right Action: Tri-Tone Selector, CTA Buttons & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Interactive 3-Color Tone Switcher Pill */}
            <div ref={tonePickerRef} style={{ position: 'relative' }}>
              <button 
                type="button"
                onClick={() => setShowTonePicker(!showTonePicker)}
                className="tri-tone-badge"
                aria-haspopup="listbox"
                aria-expanded={showTonePicker}
                aria-label={`Select 3-Color Tone Theme. Currently ${theme.name}`}
              >
                <div style={{ display: 'flex', gap: '3px' }} aria-hidden="true">
                  <span className="tri-tone-dot" style={{ backgroundColor: theme.primary }} />
                  <span className="tri-tone-dot" style={{ backgroundColor: theme.neutralDark }} />
                  <span className="tri-tone-dot" style={{ backgroundColor: theme.accent }} />
                </div>
                <span>3-Color Tone</span>
              </button>

              {/* Dropdown Menu for Tri-Tone Presets */}
              {showTonePicker && (
                <div 
                  role="listbox"
                  aria-label="3-Color Tone Palette Presets"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '260px',
                    backgroundColor: theme.neutralSurface,
                    borderRadius: '12px',
                    border: `1px solid ${theme.neutralBorder}`,
                    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                    padding: '0.75rem',
                    zIndex: 200
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: theme.neutralMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', padding: '0 0.25rem' }}>
                    Select 3-Color Tone System
                  </div>
                  {Object.values(TRI_TONE_PRESETS).map((preset) => {
                    const isSelected = preset.id === activeTonePreset;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setActiveTonePreset(preset.id);
                          setShowTonePicker(false);
                        }}
                        style={{
                          width: '100%',
                          minHeight: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '8px',
                          border: isSelected ? `1px solid ${preset.primaryBorder}` : '1px solid transparent',
                          backgroundColor: isSelected ? preset.primaryLight : 'transparent',
                          cursor: 'pointer',
                          marginBottom: '4px',
                          textAlign: 'left',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.825rem', fontWeight: 700, color: isSelected ? preset.primary : theme.neutralDark }}>
                            {preset.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: theme.neutralMuted }}>
                            {preset.label}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }} aria-hidden="true">
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: preset.primary }} />
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: preset.neutralDark }} />
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: preset.accent }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <Link 
              to="/login" 
              className="nav-links-desktop"
              style={{
                textDecoration: 'none',
                color: theme.neutralBody,
                fontSize: '0.875rem',
                fontWeight: 600,
                minHeight: '44px',
                padding: '0 0.95rem',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.neutralBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <Lock size={15} style={{ color: theme.neutralMuted }} aria-hidden="true" />
              <span>Sign In</span>
            </Link>

            <Link 
              to="/dashboard" 
              className="landing-btn-primary nav-links-desktop"
              style={{ fontSize: '0.85rem', padding: '0 1.15rem' }}
            >
              <span>Get Started</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            {/* Mobile Hamburger Navigation Button */}
            <button
              type="button"
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div 
            ref={mobileNavRef}
            style={{
              backgroundColor: theme.neutralSurface,
              borderBottom: `1px solid ${theme.neutralBorder}`,
              boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <a 
              href="#features" 
              className="landing-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '0.75rem 0.5rem', fontSize: '1rem', borderBottom: `1px solid ${theme.neutralBorder}` }}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="landing-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '0.75rem 0.5rem', fontSize: '1rem', borderBottom: `1px solid ${theme.neutralBorder}` }}
            >
              How It Works
            </a>
            <a 
              href="#roles" 
              className="landing-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '0.75rem 0.5rem', fontSize: '1rem', borderBottom: `1px solid ${theme.neutralBorder}` }}
            >
              Campus Roles
            </a>
            <a 
              href="#metrics" 
              className="landing-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '0.75rem 0.5rem', fontSize: '1rem', borderBottom: `1px solid ${theme.neutralBorder}` }}
            >
              Metrics
            </a>
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <Link 
                to="/login"
                className="landing-btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/dashboard"
                className="landing-btn-primary"
                style={{ flex: 1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Launch App
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION */}
      {/* ============================================================ */}
      <section style={{
        paddingTop: '4.5rem',
        paddingBottom: '5.5rem',
        background: theme.heroGradient,
        position: 'relative',
        transition: 'background 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center'
        }}>
          {/* Status / Announcement Tag with Tri-Tone Accent Pulse */}
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: theme.neutralSurface,
              border: `1px solid ${theme.neutralBorder}`,
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: theme.neutralBody
            }}>
              {/* Accent tone live status pulse */}
              <span 
                className="tri-tone-dot-pulse"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: theme.accent,
                  display: 'inline-block',
                  animation: 'pulseGlow 2s infinite ease-in-out'
                }} 
                aria-hidden="true"
              />
              <span>Fixora Operations 2.4</span>
              <span style={{ color: theme.neutralBorderHover }} aria-hidden="true">·</span>
              <span style={{ color: theme.primary, fontWeight: 700 }}>3-Color Tone Design</span>
              <ChevronRight size={14} style={{ color: theme.neutralMuted }} aria-hidden="true" />
            </div>
          </div>

          {/* Large Headline */}
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            color: theme.neutralDark,
            maxWidth: '920px',
            margin: '0 auto 1.5rem'
          }}>
            Report it. Track it.{' '}
            <span style={{
              color: theme.primary,
              textDecoration: 'none'
            }}>
              Fix it.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: theme.neutralBody,
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            The intelligent campus maintenance and incident response platform. 
            Empowering students, faculty, and facility teams with 30-second ticket filing, 
            automated priority triage, and real-time resolution telemetry.
          </p>

          {/* Dual CTAs */}
          <div className="hero-cta-group" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <Link to="/dashboard" className="landing-btn-primary" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
              <span>Launch Platform</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link to="/login" className="landing-btn-secondary" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
              <Lock size={17} style={{ color: theme.neutralMuted }} aria-hidden="true" />
              <span>Portal Sign In</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.75rem',
            flexWrap: 'wrap',
            color: theme.neutralMuted,
            fontSize: '0.825rem',
            fontWeight: 500,
            marginBottom: '4rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: theme.primary }} aria-hidden="true" />
              <span>Instant deployment</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: theme.primary }} aria-hidden="true" />
              <span>Multi-role RBAC security</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: theme.primary }} aria-hidden="true" />
              <span>Sub-minute automated dispatch</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* HERO UI PREVIEW / PRODUCT TELEMETRY MOCKUP */}
          {/* ============================================================ */}
          <div style={{
            maxWidth: '1040px',
            margin: '0 auto',
            borderRadius: '20px',
            backgroundColor: theme.neutralSurface,
            border: `1px solid ${theme.neutralBorder}`,
            boxShadow: `0 25px 60px -15px ${theme.primaryGlow}, 0 10px 25px -5px rgba(15, 23, 42, 0.05)`,
            overflow: 'hidden',
            textAlign: 'left'
          }}>
            {/* Mockup Window Header Bar - Styled in 3-Color Tone */}
            <div style={{
              backgroundColor: theme.neutralBg,
              borderBottom: `1px solid ${theme.neutralBorder}`,
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* 3-Tone Dots */}
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: theme.primary }} aria-hidden="true" />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: theme.neutralDark }} aria-hidden="true" />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: theme.accent }} aria-hidden="true" />
                <span style={{
                  marginLeft: '0.75rem',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  color: theme.neutralMuted,
                  backgroundColor: theme.neutralSurface,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '6px',
                  border: `1px solid ${theme.neutralBorder}`
                }}>
                  fixora.campus.internal/live-ops
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: theme.accentText,
                  backgroundColor: theme.accentLight,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '9999px',
                  border: `1px solid ${theme.accentBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.accent }} aria-hidden="true" />
                  Telemetry Active
                </span>
              </div>
            </div>

            {/* Mockup Inside Workspace */}
            <div style={{ padding: '1.75rem' }}>
              {/* Telemetry Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1.25rem',
                borderBottom: `1px solid ${theme.neutralBorder}`
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: theme.primary, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Live Operations Command
                  </div>
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: theme.neutralDark,
                    marginTop: '0.2rem'
                  }}>
                    North Campus Facility Network
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{
                    backgroundColor: theme.neutralBg,
                    border: `1px solid ${theme.neutralBorder}`,
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Activity size={14} style={{ color: theme.primary }} aria-hidden="true" />
                    <span style={{ fontSize: '0.75rem', color: theme.neutralMuted }}>Open Tickets:</span>
                    <strong style={{ fontSize: '0.85rem', color: theme.neutralDark }}>12</strong>
                  </div>
                  <div style={{
                    backgroundColor: theme.neutralBg,
                    border: `1px solid ${theme.neutralBorder}`,
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Clock size={14} style={{ color: theme.accent }} aria-hidden="true" />
                    <span style={{ fontSize: '0.75rem', color: theme.neutralMuted }}>Avg Response:</span>
                    <strong style={{ fontSize: '0.85rem', color: theme.neutralDark }}>28m</strong>
                  </div>
                  <div style={{
                    backgroundColor: theme.neutralBg,
                    border: `1px solid ${theme.neutralBorder}`,
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <CheckCircle2 size={14} style={{ color: theme.primary }} aria-hidden="true" />
                    <span style={{ fontSize: '0.75rem', color: theme.neutralMuted }}>SLA Compliance:</span>
                    <strong style={{ fontSize: '0.85rem', color: theme.primary }}>99.2%</strong>
                  </div>
                </div>
              </div>

              {/* Sample High Priority Live Ticket in Mockup */}
              <div style={{
                backgroundColor: theme.neutralSurface,
                borderRadius: '12px',
                border: `1px solid ${theme.neutralBorder}`,
                padding: '1.25rem',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{
                        backgroundColor: theme.accentLight,
                        color: theme.accentText,
                        border: `1px solid ${theme.accentBorder}`,
                        fontSize: '0.675rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <AlertTriangle size={11} aria-hidden="true" /> HIGH PRIORITY
                      </span>
                      <span style={{
                        backgroundColor: theme.primaryLight,
                        color: theme.primary,
                        border: `1px solid ${theme.primaryBorder}`,
                        fontSize: '0.675rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px'
                      }}>
                        IN PROGRESS
                      </span>
                      <span style={{ fontSize: '0.725rem', color: theme.neutralMuted }}>Ticket #FX-2026-084</span>
                    </div>

                    <h4 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: theme.neutralDark,
                      marginBottom: '0.35rem'
                    }}>
                      HVAC Chiller Unit Pressure Fluctuation · Science Block C (Room 304)
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.775rem', color: theme.neutralMuted, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Building2 size={13} style={{ color: theme.primary }} aria-hidden="true" /> Academic Quad · Zone B
                      </span>
                      <span>·</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Users size={13} style={{ color: theme.primary }} aria-hidden="true" /> Lead: Rajesh Kumar (HVAC Specialist)
                      </span>
                    </div>
                  </div>

                  {/* SLA Countdown pill */}
                  <div style={{
                    backgroundColor: theme.neutralBg,
                    borderRadius: '8px',
                    border: `1px solid ${theme.neutralBorder}`,
                    padding: '0.6rem 0.9rem',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontSize: '0.7rem', color: theme.neutralMuted, fontWeight: 600 }}>SLA Dispatch Target</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 800, color: theme.accent }}>
                      14m Remaining
                    </div>
                  </div>
                </div>

                {/* Progress Bar in Primary Tone with Accessible ARIA Role */}
                <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: `1px solid ${theme.neutralBorder}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: theme.neutralMuted, marginBottom: '0.35rem' }}>
                    <span>Resolution Workflow (Stage 3 of 4: Compressor Seal Replacement)</span>
                    <strong style={{ color: theme.primary }}>75% Completed</strong>
                  </div>
                  <div 
                    role="progressbar"
                    aria-valuenow={75}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Resolution Workflow Progress: Compressor Seal Replacement 75% completed"
                    style={{ height: '6px', borderRadius: '9999px', backgroundColor: theme.neutralBg, overflow: 'hidden' }}
                  >
                    <div style={{ width: '75%', height: '100%', backgroundColor: theme.primary, borderRadius: '9999px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. STATS CREDIBILITY BAR */}
      {/* ============================================================ */}
      <section id="metrics" style={{
        backgroundColor: theme.neutralSurface,
        borderTop: `1px solid ${theme.neutralBorder}`,
        borderBottom: `1px solid ${theme.neutralBorder}`,
        padding: '3rem 1.5rem'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '0.775rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: theme.primary
            }}>
              Proven Operational Track Record
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 800,
              color: theme.neutralDark,
              marginTop: '0.25rem'
            }}>
              Trusted by 2,500+ campus residents daily
            </h2>
          </div>

          <div className="stats-grid-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ padding: '1rem' }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 800,
                color: theme.primary,
                lineHeight: 1
              }}>
                2,500+
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: theme.neutralDark, marginTop: '0.5rem' }}>
                Active Residents & Faculty
              </div>
              <div style={{ fontSize: '0.775rem', color: theme.neutralMuted, marginTop: '0.2rem' }}>
                Across student dorms & research wings
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 800,
                color: theme.primary,
                lineHeight: 1
              }}>
                98.4%
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: theme.neutralDark, marginTop: '0.5rem' }}>
                Verified Resolution Rate
              </div>
              <div style={{ fontSize: '0.775rem', color: theme.neutralMuted, marginTop: '0.2rem' }}>
                Sign-off with photo inspection
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 800,
                color: theme.accent,
                lineHeight: 1
              }}>
                &lt; 38m
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: theme.neutralDark, marginTop: '0.5rem' }}>
                Average Triage & Dispatch
              </div>
              <div style={{ fontSize: '0.775rem', color: theme.neutralMuted, marginTop: '0.2rem' }}>
                Automated crew routing
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 800,
                color: theme.primary,
                lineHeight: 1
              }}>
                14
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: theme.neutralDark, marginTop: '0.5rem' }}>
                Campus Facilities Covered
              </div>
              <div style={{ fontSize: '0.775rem', color: theme.neutralMuted, marginTop: '0.2rem' }}>
                Centralized telemetry & asset registry
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FEATURES GRID - 3-COLOR TONE ALIGNED */}
      {/* ============================================================ */}
      <section id="features" style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.neutralBg
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span style={{
              fontSize: '0.775rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              backgroundColor: theme.primaryLight,
              color: theme.primary,
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: `1px solid ${theme.primaryBorder}`
            }}>
              Engineered For Modern Campuses
            </span>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: theme.neutralDark,
              letterSpacing: '-0.025em',
              marginTop: '1rem',
              marginBottom: '0.85rem'
            }}>
              Every capability needed to maintain a world-class institution.
            </h2>
            <p style={{ fontSize: '1rem', color: theme.neutralMuted, lineHeight: 1.6 }}>
              Fixora replaces disorganized group chats, sticky notes, and paper work orders with 
              a unified platform engineered for institutional reliability.
            </p>
          </div>

          {/* 4 Feature Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {/* Feature 1: Real-Time Tracking (Tone 1: Primary) */}
            <div className="landing-card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: theme.primaryLight,
                color: theme.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Activity size={24} aria-hidden="true" />
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: theme.neutralDark,
                marginBottom: '0.6rem'
              }}>
                Real-Time Issue Tracking
              </h3>
              <p style={{ fontSize: '0.9rem', color: theme.neutralMuted, lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Instant two-way status updates and timestamped audit logs keep reporters, technicians, 
                and department supervisors in lockstep from ticket submission to completion.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: theme.primary }}>
                <Check size={14} aria-hidden="true" />
                <span>Live audit trails & push alerts</span>
              </div>
            </div>

            {/* Feature 2: Smart Priority Triage (Tone 3: Accent Highlight Card) */}
            <div className="landing-card" style={{ borderColor: theme.accentBorder }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: theme.accentLight,
                color: theme.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Zap size={24} aria-hidden="true" />
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: theme.neutralDark,
                marginBottom: '0.6rem'
              }}>
                Smart Priority Triage
              </h3>
              <p style={{ fontSize: '0.9rem', color: theme.neutralMuted, lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Automated severity assessment categorizes safety hazards, electrical emergencies, 
                and plumbing leaks—escalating urgent tasks directly to certified on-call dispatchers.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: theme.accent }}>
                <Check size={14} aria-hidden="true" />
                <span>Automated SLA & risk scoring</span>
              </div>
            </div>

            {/* Feature 3: Multi-Role Campus Access (Tone 1: Primary) */}
            <div className="landing-card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: theme.primaryLight,
                color: theme.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Users size={24} aria-hidden="true" />
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: theme.neutralDark,
                marginBottom: '0.6rem'
              }}>
                Multi-Role Campus Access
              </h3>
              <p style={{ fontSize: '0.9rem', color: theme.neutralMuted, lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Dedicated workflows tailored for Students filing reports, Faculty scheduling maintenance, 
                Technicians managing mobile work queues, and Super Admins overseeing campus telemetry.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: theme.primary }}>
                <Check size={14} aria-hidden="true" />
                <span>4 targeted enterprise roles</span>
              </div>
            </div>

            {/* Feature 4: Analytics Dashboard (Tone 1: Primary) */}
            <div className="landing-card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: theme.primaryLight,
                color: theme.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <BarChart3 size={24} aria-hidden="true" />
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: theme.neutralDark,
                marginBottom: '0.6rem'
              }}>
                Analytics Dashboard
              </h3>
              <p style={{ fontSize: '0.9rem', color: theme.neutralMuted, lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Uncover infrastructure bottlenecks, track recurring facility failures by building, 
                and forecast maintenance budgets with deep operational intelligence and resolution heatmaps.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: theme.primary }}>
                <Check size={14} aria-hidden="true" />
                <span>Predictive facility heatmaps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. HOW IT WORKS (3-STEP HORIZONTAL FLOW) */}
      {/* ============================================================ */}
      <section id="how-it-works" style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.neutralSurface
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
            <span style={{
              fontSize: '0.775rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: theme.primary
            }}>
              Seamless Operations
            </span>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: theme.neutralDark,
              letterSpacing: '-0.025em',
              marginTop: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              Three steps from report to resolution.
            </h2>
            <p style={{ fontSize: '1rem', color: theme.neutralMuted, lineHeight: 1.6 }}>
              A frictionless protocol designed to reduce response latency from days to minutes.
            </p>
          </div>

          {/* 3 Step Cards with Connection */}
          <div className="how-it-works-flow" style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {/* Step 1 */}
            <div style={{
              flex: 1,
              backgroundColor: theme.neutralBg,
              borderRadius: '16px',
              border: `1px solid ${theme.neutralBorder}`,
              padding: '2.25rem 1.75rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: theme.primary,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  boxShadow: `0 4px 10px ${theme.primaryGlow}`
                }}>
                  <Smartphone size={22} aria-hidden="true" />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: theme.neutralBorderHover
                }} aria-hidden="true">
                  01
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: theme.neutralDark,
                marginBottom: '0.75rem'
              }}>
                Report in 30 Seconds
              </h3>
              <p style={{ fontSize: '0.9rem', color: theme.neutralMuted, lineHeight: 1.6, flex: 1 }}>
                Campus members select their building, pick an issue category, upload photos, 
                and flag urgent hazards directly from their smartphone or computer.
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${theme.neutralBorder}`, fontSize: '0.775rem', color: theme.primary, fontWeight: 700 }}>
                ✓ Zero registration friction
              </div>
            </div>

            {/* Step 2 */}
            <div style={{
              flex: 1,
              backgroundColor: theme.neutralBg,
              borderRadius: '16px',
              border: `1px solid ${theme.neutralBorder}`,
              padding: '2.25rem 1.75rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: theme.primary,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  boxShadow: `0 4px 10px ${theme.primaryGlow}`
                }}>
                  <Layers size={22} aria-hidden="true" />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: theme.neutralBorderHover
                }} aria-hidden="true">
                  02
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: theme.neutralDark,
                marginBottom: '0.75rem'
              }}>
                Triage & Dispatch
              </h3>
              <p style={{ fontSize: '0.9rem', color: theme.neutralMuted, lineHeight: 1.6, flex: 1 }}>
                Tickets are instantly evaluated against safety SLAs and dispatched to available on-duty technicians. 
                Reporters receive real-time updates as crews deploy.
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${theme.neutralBorder}`, fontSize: '0.775rem', color: theme.primary, fontWeight: 700 }}>
                ✓ Automated technician assignment
              </div>
            </div>

            {/* Step 3 */}
            <div style={{
              flex: 1,
              backgroundColor: theme.neutralBg,
              borderRadius: '16px',
              border: `1px solid ${theme.neutralBorder}`,
              padding: '2.25rem 1.75rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: theme.primary,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  boxShadow: `0 4px 10px ${theme.primaryGlow}`
                }}>
                  <CheckCircle2 size={22} aria-hidden="true" />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: theme.neutralBorderHover
                }} aria-hidden="true">
                  03
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: theme.neutralDark,
                marginBottom: '0.75rem'
              }}>
                Verified Closeout
              </h3>
              <p style={{ fontSize: '0.9rem', color: theme.neutralMuted, lineHeight: 1.6, flex: 1 }}>
                Repairs are verified with photo logs and work notes. Tickets close out with complete 
                transparency, updating campus maintenance records and facility health metrics.
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${theme.neutralBorder}`, fontSize: '0.775rem', color: theme.primary, fontWeight: 700 }}>
                ✓ Inspection sign-off & feedback
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. INTERACTIVE CAMPUS ROLES SHOWCASE (TABLIST ARIA) */}
      {/* ============================================================ */}
      <section id="roles" style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.neutralBg,
        borderTop: `1px solid ${theme.neutralBorder}`
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
            <span style={{
              fontSize: '0.775rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: theme.primary
            }}>
              Multi-Stakeholder Architecture
            </span>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: theme.neutralDark,
              letterSpacing: '-0.025em',
              marginTop: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              Tailored workflows for every campus stakeholder.
            </h2>
            <p style={{ fontSize: '1rem', color: theme.neutralMuted, lineHeight: 1.6 }}>
              Choose a role below to see how Fixora optimizes their daily maintenance experience.
            </p>

            {/* Accessible Role Switcher Pills (Tablist Pattern) */}
            <div 
              role="tablist"
              aria-label="Campus Stakeholder Workflows"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginTop: '2rem'
              }}
            >
              {Object.keys(ROLE_PROFILES).map((roleKey) => {
                const role = ROLE_PROFILES[roleKey];
                const IconComponent = role.icon;
                const isSelected = activeRole === roleKey;
                return (
                  <button 
                    key={roleKey}
                    id={`tab-${roleKey}`}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${roleKey}`}
                    type="button"
                    onClick={() => setActiveRole(roleKey)}
                    className={`landing-role-pill ${isSelected ? 'active' : ''}`}
                  >
                    <IconComponent size={16} aria-hidden="true" />
                    <span>{roleKey === 'student' ? 'Students' : roleKey === 'faculty' ? 'Faculty & Staff' : roleKey === 'technician' ? 'Facilities Crew' : 'Administrators'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Feature Display Card (Tabpanel Pattern) */}
          <div 
            id={`panel-${activeRole}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeRole}`}
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              backgroundColor: theme.neutralSurface,
              borderRadius: '20px',
              border: `1px solid ${theme.neutralBorder}`,
              padding: '2.5rem',
              boxShadow: `0 20px 40px -15px ${theme.primaryGlow}`
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                  <span style={{
                    backgroundColor: theme.primaryLight,
                    color: theme.primary,
                    fontSize: '0.725rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    border: `1px solid ${theme.primaryBorder}`
                  }}>
                    {activeRoleDetails.badge}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: theme.neutralDark,
                  marginBottom: '1rem'
                }}>
                  {activeRoleDetails.title}
                </h3>

                <blockquote style={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: theme.neutralBody,
                  lineHeight: 1.6,
                  borderLeft: `3px solid ${theme.primary}`,
                  paddingLeft: '1rem',
                  margin: '0 0 1.25rem 0'
                }}>
                  {activeRoleDetails.quote}
                </blockquote>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.neutralMuted, marginBottom: '2rem' }}>
                  {activeRoleDetails.author}
                </div>

                <Link 
                  to={activeRoleDetails.destination} 
                  className="landing-btn-primary"
                  style={{ fontSize: '0.9rem' }}
                >
                  <span>{activeRoleDetails.ctaText}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>

              {/* Highlights List */}
              <div style={{
                backgroundColor: theme.neutralBg,
                borderRadius: '14px',
                padding: '1.75rem',
                border: `1px solid ${theme.neutralBorder}`
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: theme.neutralDark, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
                  Key Role Capabilities
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeRoleDetails.highlights.map((highlight, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: theme.primaryLight,
                        color: theme.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        flexShrink: 0
                      }}>
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </div>
                      <span style={{ fontSize: '0.9rem', color: theme.neutralBody, fontWeight: 500 }}>
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CALL TO ACTION (CTA) FOOTER SECTION */}
      {/* ============================================================ */}
      <section style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.neutralSurface
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            background: theme.bannerGradient,
            borderRadius: '24px',
            padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)',
            color: '#FFFFFF',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 25px 50px -12px ${theme.primaryGlow}`
          }}>
            {/* Subtle decorative background circles */}
            <div style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} aria-hidden="true" />
            <div style={{
              position: 'absolute',
              bottom: '-60px',
              left: '-60px',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} aria-hidden="true" />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.775rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.25rem'
              }}>
                <Sparkles size={14} style={{ color: theme.accentLight }} aria-hidden="true" />
                <span>Ready to modernize campus facilities?</span>
              </div>

              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '1.25rem'
              }}>
                Ready to improve your campus?
              </h2>

              <p style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: 'rgba(255, 255, 255, 0.88)',
                lineHeight: 1.6,
                marginBottom: '2.5rem'
              }}>
                Join thousands of students, faculty members, and maintenance engineers 
                keeping our campus operating safely and at peak performance.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <Link 
                  to="/dashboard"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: theme.primary,
                    fontWeight: 800,
                    fontSize: '1rem',
                    minHeight: '44px',
                    padding: '0.9rem 1.85rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = theme.neutralBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  <span>Get Started Now</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>

                <Link 
                  to="/login"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    minHeight: '44px',
                    padding: '0.9rem 1.85rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)'; }}
                >
                  <Lock size={16} aria-hidden="true" />
                  <span>Sign In</span>
                </Link>
              </div>

              <div style={{
                marginTop: '2.5rem',
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <span>✓ Zero credit card required</span>
                <span>✓ Single Sign-On ready</span>
                <span>✓ 99.9% Uptime guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. MINIMAL PRODUCT FOOTER */}
      {/* ============================================================ */}
      <footer style={{
        backgroundColor: theme.neutralSurface,
        borderTop: `1px solid ${theme.neutralBorder}`,
        padding: '4rem 1.5rem 2.5rem'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}>
            {/* Column 1: Brand Info */}
            <div style={{ maxWidth: '320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: theme.primary,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 2px 8px ${theme.primaryGlow}`
                }}>
                  <ShieldCheck size={18} aria-hidden="true" />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: theme.neutralDark
                }}>
                  Fixora
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: theme.neutralMuted, lineHeight: 1.6, marginBottom: '1.25rem' }}>
                The premier smart campus maintenance & issue resolution system. 
                Built for smarter, safer, and cleaner institutional environments.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: theme.primary, fontWeight: 700 }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: theme.primary }} aria-hidden="true" />
                <span>All Systems Operational (99.98%)</span>
              </div>
            </div>

            {/* Column 2: Platform Navigation */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: theme.neutralDark, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Platform
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <Link to="/dashboard" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Dashboard Overview
                  </Link>
                </li>
                <li>
                  <Link to="/issues" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Campus Issues Tracker
                  </Link>
                </li>
                <li>
                  <Link to="/report" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Report New Ticket
                  </Link>
                </li>
                <li>
                  <Link to="/analytics" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Facility Analytics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Portals & Access */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: theme.neutralDark, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Portals
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <Link to="/login" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Resident Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/login" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Faculty & Staff Access
                  </Link>
                </li>
                <li>
                  <Link to="/maintenance-team" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Facilities Crew Roster
                  </Link>
                </li>
                <li>
                  <Link to="/admin" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Administrator Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: theme.neutralDark, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Resources
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <Link to="/announcements" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Campus Notices
                  </Link>
                </li>
                <li>
                  <Link to="/help" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Help Center & FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/my-reports" style={{ textDecoration: 'none', color: theme.neutralMuted, fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    My Submissions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar with Semantic Focusable Links */}
          <div style={{
            borderTop: `1px solid ${theme.neutralBorder}`,
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.825rem',
            color: theme.neutralMuted
          }}>
            <div>
              © 2026 Fixora. Built with 3-Color Tone Design Intelligence. All rights reserved.
            </div>
            <nav aria-label="Legal and Compliance" style={{ display: 'flex', gap: '1.25rem' }}>
              <Link to="/help" className="landing-footer-link">Privacy Policy</Link>
              <Link to="/help" className="landing-footer-link">Terms of Service</Link>
              <Link to="/help" className="landing-footer-link">Security Status</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
