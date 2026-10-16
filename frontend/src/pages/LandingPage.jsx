import React, { useState } from 'react';
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
  FileText 
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('student');

  // Role profiles for interactive showcase
  const roleData = {
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

  const activeRoleDetails = roleData[activeRole];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      color: '#0F172A',
      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Embedded CSS for smooth animations, keyframes, and hover micro-interactions */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.25); }
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shimmerBorder {
          0% { border-color: #E2E8F0; }
          50% { border-color: #99CBC7; }
          100% { border-color: #E2E8F0; }
        }
        .landing-nav-link {
          color: #475569;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          transition: color 0.2s ease;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
        }
        .landing-nav-link:hover {
          color: #004643 !important;
          background-color: #F8FAFC;
        }
        .landing-btn-primary {
          background-color: #004643;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.925rem;
          padding: 0.75rem 1.4rem;
          border-radius: 10px;
          border: 1px solid #004643;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 70, 67, 0.18);
        }
        .landing-btn-primary:hover {
          background-color: #003634;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 70, 67, 0.28);
          border-color: #003634;
        }
        .landing-btn-secondary {
          background-color: #FFFFFF;
          color: #0F172A;
          font-weight: 700;
          font-size: 0.925rem;
          padding: 0.75rem 1.4rem;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        }
        .landing-btn-secondary:hover {
          background-color: #F8FAFC;
          border-color: #CBD5E1;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
        }
        .landing-card {
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .landing-card:hover {
          border-color: #CBD5E1;
          transform: translateY(-4px);
          box-shadow: 0 18px 32px -8px rgba(15, 23, 42, 0.08);
        }
        .landing-role-pill {
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
          background-color: #F1F5F9;
          color: #475569;
        }
        .landing-role-pill.active {
          background-color: #004643;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(0, 70, 67, 0.22);
        }
        .landing-role-pill:not(.active):hover {
          background-color: #E2E8F0;
          color: #0F172A;
        }
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
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
      {/* 1. SLIM NAVIGATION BAR */}
      {/* ============================================================ */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E2E8F0',
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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #004643 0%, #002B29 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0, 70, 67, 0.22)'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.025em'
              }}>
                Fixora
              </span>
              <span style={{
                fontSize: '0.675rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: '#E6F2F1',
                color: '#004643',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                border: '1px solid #B2D8D5'
              }}>
                Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#how-it-works" className="landing-nav-link">How It Works</a>
            <a href="#roles" className="landing-nav-link">Campus Roles</a>
            <a href="#metrics" className="landing-nav-link">Metrics</a>
          </nav>

          {/* Right Action CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link 
              to="/login" 
              style={{
                textDecoration: 'none',
                color: '#334155',
                fontSize: '0.875rem',
                fontWeight: 600,
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F1F5F9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <Lock size={15} style={{ color: '#64748B' }} />
              <span>Sign In</span>
            </Link>

            <Link 
              to="/dashboard" 
              className="landing-btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.55rem 1.15rem', borderRadius: '8px' }}
            >
              <span>Get Started</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION */}
      {/* ============================================================ */}
      <section style={{
        paddingTop: '4.5rem',
        paddingBottom: '5.5rem',
        background: 'radial-gradient(1200px 520px at 50% 0%, #E6F2F1 0%, rgba(248, 250, 252, 0) 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center'
        }}>
          {/* Status / Announcement Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#334155'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#047857',
                display: 'inline-block',
                animation: 'pulseGlow 2s infinite ease-in-out'
              }} />
              <span>Fixora Operations 2.4</span>
              <span style={{ color: '#94A3B8' }}>·</span>
              <span style={{ color: '#004643', fontWeight: 700 }}>Next-Gen Campus Facilities</span>
              <ChevronRight size={14} style={{ color: '#94A3B8' }} />
            </div>
          </div>

          {/* Large Headline */}
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            color: '#0F172A',
            maxWidth: '920px',
            margin: '0 auto 1.5rem'
          }}>
            Report it. Track it.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #004643 0%, #0D9488 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Fix it.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: '#475569',
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
              <ArrowRight size={18} />
            </Link>

            <Link to="/login" className="landing-btn-secondary" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
              <Lock size={17} style={{ color: '#475569' }} />
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
            color: '#64748B',
            fontSize: '0.825rem',
            fontWeight: 500,
            marginBottom: '4rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: '#004643' }} />
              <span>Instant deployment</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: '#004643' }} />
              <span>Multi-role RBAC security</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: '#004643' }} />
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
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            boxShadow: '0 25px 60px -15px rgba(0, 70, 67, 0.12), 0 10px 25px -5px rgba(15, 23, 42, 0.06)',
            overflow: 'hidden',
            textAlign: 'left'
          }}>
            {/* Mockup Window Header Bar */}
            <div style={{
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span style={{
                  marginLeft: '0.75rem',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  color: '#64748B',
                  backgroundColor: '#FFFFFF',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0'
                }}>
                  fixora.campus.internal/live-ops
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: '#047857',
                  backgroundColor: '#D1FAE5',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#047857' }} />
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
                borderBottom: '1px solid #F1F5F9'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#004643', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Live Operations Command
                  </div>
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginTop: '0.2rem'
                  }}>
                    North Campus Facility Network
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Activity size={14} style={{ color: '#004643' }} />
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Open Tickets:</span>
                    <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>12</strong>
                  </div>
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Clock size={14} style={{ color: '#D97706' }} />
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Avg Response:</span>
                    <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>28m</strong>
                  </div>
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <CheckCircle2 size={14} style={{ color: '#047857' }} />
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>SLA Compliance:</span>
                    <strong style={{ fontSize: '0.85rem', color: '#047857' }}>99.2%</strong>
                  </div>
                </div>
              </div>

              {/* Sample High Priority Live Ticket in Mockup */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
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
                        backgroundColor: '#FFE4E6',
                        color: '#BE123C',
                        border: '1px solid #FECDD3',
                        fontSize: '0.675rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <AlertTriangle size={11} /> HIGH PRIORITY
                      </span>
                      <span style={{
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        border: '1px solid #FDE68A',
                        fontSize: '0.675rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px'
                      }}>
                        IN PROGRESS
                      </span>
                      <span style={{ fontSize: '0.725rem', color: '#94A3B8' }}>Ticket #FX-2026-084</span>
                    </div>

                    <h4 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0F172A',
                      marginBottom: '0.35rem'
                    }}>
                      HVAC Chiller Unit Pressure Fluctuation · Science Block C (Room 304)
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.775rem', color: '#64748B', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Building2 size={13} style={{ color: '#004643' }} /> Academic Quad · Zone B
                      </span>
                      <span>·</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Users size={13} style={{ color: '#004643' }} /> Lead: Rajesh Kumar (HVAC Specialist)
                      </span>
                    </div>
                  </div>

                  {/* SLA Countdown pill */}
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    padding: '0.6rem 0.9rem',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>SLA Dispatch Target</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 800, color: '#004643' }}>
                      14m Remaining
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: '#64748B', marginBottom: '0.35rem' }}>
                    <span>Resolution Workflow (Stage 3 of 4: Compressor Seal Replacement)</span>
                    <strong style={{ color: '#004643' }}>75% Completed</strong>
                  </div>
                  <div style={{ height: '6px', borderRadius: '9999px', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
                    <div style={{ width: '75%', height: '100%', backgroundColor: '#004643', borderRadius: '9999px' }} />
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
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
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
              color: '#004643'
            }}>
              Proven Operational Track Record
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#0F172A',
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
                color: '#004643',
                lineHeight: 1
              }}>
                2,500+
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A', marginTop: '0.5rem' }}>
                Active Residents & Faculty
              </div>
              <div style={{ fontSize: '0.775rem', color: '#64748B', marginTop: '0.2rem' }}>
                Across student dorms & research wings
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#004643',
                lineHeight: 1
              }}>
                98.4%
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A', marginTop: '0.5rem' }}>
                Verified Resolution Rate
              </div>
              <div style={{ fontSize: '0.775rem', color: '#64748B', marginTop: '0.2rem' }}>
                Sign-off with photo inspection
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#004643',
                lineHeight: 1
              }}>
                &lt; 38m
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A', marginTop: '0.5rem' }}>
                Average Triage & Dispatch
              </div>
              <div style={{ fontSize: '0.775rem', color: '#64748B', marginTop: '0.2rem' }}>
                Automated crew routing
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#004643',
                lineHeight: 1
              }}>
                14
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A', marginTop: '0.5rem' }}>
                Campus Facilities Covered
              </div>
              <div style={{ fontSize: '0.775rem', color: '#64748B', marginTop: '0.2rem' }}>
                Centralized telemetry & asset registry
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FEATURES GRID */}
      {/* ============================================================ */}
      <section id="features" style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: '#F8FAFC'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span style={{
              fontSize: '0.775rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              backgroundColor: '#E6F2F1',
              color: '#004643',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: '1px solid #B2D8D5'
            }}>
              Engineered For Modern Campuses
            </span>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              marginTop: '1rem',
              marginBottom: '0.85rem'
            }}>
              Every capability needed to maintain a world-class institution.
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.6 }}>
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
            {/* Feature 1 */}
            <div className="landing-card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#E6F2F1',
                color: '#004643',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Activity size={24} />
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.6rem'
              }}>
                Real-Time Issue Tracking
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Instant two-way status updates and timestamped audit logs keep reporters, technicians, 
                and department supervisors in lockstep from ticket submission to completion.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: '#004643' }}>
                <Check size={14} />
                <span>Live audit trails & push alerts</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="landing-card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#FEF3C7',
                color: '#B45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Zap size={24} />
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.6rem'
              }}>
                Smart Priority Triage
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Automated severity assessment categorizes safety hazards, electrical emergencies, 
                and plumbing leaks—escalating urgent tasks directly to certified on-call dispatchers.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: '#B45309' }}>
                <Check size={14} />
                <span>Automated SLA & risk scoring</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="landing-card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Users size={24} />
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.6rem'
              }}>
                Multi-Role Campus Access
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Dedicated workflows tailored for Students filing reports, Faculty scheduling maintenance, 
                Technicians managing mobile work queues, and Super Admins overseeing campus telemetry.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: '#2563EB' }}>
                <Check size={14} />
                <span>4 targeted enterprise roles</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="landing-card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#D1FAE5',
                color: '#047857',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <BarChart3 size={24} />
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.6rem'
              }}>
                Analytics Dashboard
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Uncover infrastructure bottlenecks, track recurring facility failures by building, 
                and forecast maintenance budgets with deep operational intelligence and resolution heatmaps.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: '#047857' }}>
                <Check size={14} />
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
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
            <span style={{
              fontSize: '0.775rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#004643'
            }}>
              Seamless Operations
            </span>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              marginTop: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              Three steps from report to resolution.
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.6 }}>
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
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
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
                  backgroundColor: '#004643',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  <Smartphone size={22} />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#CBD5E1'
                }}>
                  01
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.75rem'
              }}>
                Report in 30 Seconds
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, flex: 1 }}>
                Campus members select their building, pick an issue category, upload photos, 
                and flag urgent hazards directly from their smartphone or computer.
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', fontSize: '0.775rem', color: '#004643', fontWeight: 700 }}>
                ✓ Zero registration friction
              </div>
            </div>

            {/* Step 2 */}
            <div style={{
              flex: 1,
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
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
                  backgroundColor: '#004643',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  <Layers size={22} />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#CBD5E1'
                }}>
                  02
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.75rem'
              }}>
                Triage & Dispatch
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, flex: 1 }}>
                Tickets are instantly evaluated against safety SLAs and dispatched to available on-duty technicians. 
                Reporters receive real-time updates as crews deploy.
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', fontSize: '0.775rem', color: '#004643', fontWeight: 700 }}>
                ✓ Automated technician assignment
              </div>
            </div>

            {/* Step 3 */}
            <div style={{
              flex: 1,
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
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
                  backgroundColor: '#004643',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  <CheckCircle2 size={22} />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#CBD5E1'
                }}>
                  03
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.75rem'
              }}>
                Verified Closeout
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, flex: 1 }}>
                Repairs are verified with photo logs and work notes. Tickets close out with complete 
                transparency, updating campus maintenance records and facility health metrics.
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', fontSize: '0.775rem', color: '#004643', fontWeight: 700 }}>
                ✓ Inspection sign-off & feedback
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. INTERACTIVE CAMPUS ROLES SHOWCASE */}
      {/* ============================================================ */}
      <section id="roles" style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: '#F8FAFC',
        borderTop: '1px solid #E2E8F0'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
            <span style={{
              fontSize: '0.775rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#004643'
            }}>
              Multi-Stakeholder Architecture
            </span>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              marginTop: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              Tailored workflows for every campus stakeholder.
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.6 }}>
              Choose a role below to see how Fixora optimizes their daily maintenance experience.
            </p>

            {/* Role Switcher Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}>
              <button 
                onClick={() => setActiveRole('student')}
                className={`landing-role-pill ${activeRole === 'student' ? 'active' : ''}`}
              >
                <GraduationCap size={16} />
                <span>Students</span>
              </button>

              <button 
                onClick={() => setActiveRole('faculty')}
                className={`landing-role-pill ${activeRole === 'faculty' ? 'active' : ''}`}
              >
                <Briefcase size={16} />
                <span>Faculty & Staff</span>
              </button>

              <button 
                onClick={() => setActiveRole('technician')}
                className={`landing-role-pill ${activeRole === 'technician' ? 'active' : ''}`}
              >
                <Wrench size={16} />
                <span>Facilities Crew</span>
              </button>

              <button 
                onClick={() => setActiveRole('admin')}
                className={`landing-role-pill ${activeRole === 'admin' ? 'active' : ''}`}
              >
                <ShieldCheck size={16} />
                <span>Administrators</span>
              </button>
            </div>
          </div>

          {/* Active Role Feature Display Card */}
          <div style={{
            maxWidth: '960px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #CBD5E1',
            padding: '2.5rem',
            boxShadow: '0 20px 40px -15px rgba(0, 70, 67, 0.08)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                  <span style={{
                    backgroundColor: '#E6F2F1',
                    color: '#004643',
                    fontSize: '0.725rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px'
                  }}>
                    {activeRoleDetails.badge}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '1rem'
                }}>
                  {activeRoleDetails.title}
                </h3>

                <blockquote style={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: '#334155',
                  lineHeight: 1.6,
                  borderLeft: '3px solid #004643',
                  paddingLeft: '1rem',
                  margin: '0 0 1.25rem 0'
                }}>
                  {activeRoleDetails.quote}
                </blockquote>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', marginBottom: '2rem' }}>
                  {activeRoleDetails.author}
                </div>

                <Link 
                  to={activeRoleDetails.destination} 
                  className="landing-btn-primary"
                  style={{ fontSize: '0.9rem' }}
                >
                  <span>{activeRoleDetails.ctaText}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Highlights List */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                padding: '1.75rem',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
                  Key Role Capabilities
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeRoleDetails.highlights.map((highlight, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#E6F2F1',
                        color: '#004643',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        flexShrink: 0
                      }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>
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
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #004643 0%, #002B29 100%)',
            borderRadius: '24px',
            padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)',
            color: '#FFFFFF',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 70, 67, 0.35)'
          }}>
            {/* Subtle decorative background circles */}
            <div style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(13, 148, 136, 0.25) 0%, rgba(0, 70, 67, 0) 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-60px',
              left: '-60px',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(241, 237, 229, 0.15) 0%, rgba(0, 70, 67, 0) 70%)',
              pointerEvents: 'none'
            }} />

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
                color: '#E6F2F1',
                marginBottom: '1.25rem'
              }}>
                <Sparkles size={14} style={{ color: '#FDE68A' }} />
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
                color: 'rgba(230, 242, 241, 0.9)',
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
                    color: '#004643',
                    fontWeight: 800,
                    fontSize: '1rem',
                    padding: '0.9rem 1.85rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  <span>Get Started Now</span>
                  <ArrowRight size={17} />
                </Link>

                <Link 
                  to="/login"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    padding: '0.9rem 1.85rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)'; }}
                >
                  <Lock size={16} />
                  <span>Sign In</span>
                </Link>
              </div>

              <div style={{
                marginTop: '2.5rem',
                fontSize: '0.8rem',
                color: 'rgba(230, 242, 241, 0.75)',
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
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
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
                  backgroundColor: '#004643',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck size={18} />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#0F172A'
                }}>
                  Fixora
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                The premier smart campus maintenance & issue resolution system. 
                Built for smarter, safer, and cleaner institutional environments.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#047857' }} />
                <span>All Systems Operational (99.98%)</span>
              </div>
            </div>

            {/* Column 2: Platform Navigation */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Platform
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <Link to="/dashboard" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Dashboard Overview
                  </Link>
                </li>
                <li>
                  <Link to="/issues" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Campus Issues Tracker
                  </Link>
                </li>
                <li>
                  <Link to="/report" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Report New Ticket
                  </Link>
                </li>
                <li>
                  <Link to="/analytics" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Facility Analytics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Portals & Access */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Portals
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <Link to="/login" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Resident Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/login" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Faculty & Staff Access
                  </Link>
                </li>
                <li>
                  <Link to="/maintenance-team" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Facilities Crew Roster
                  </Link>
                </li>
                <li>
                  <Link to="/admin" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Administrator Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Resources
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <Link to="/announcements" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Campus Notices
                  </Link>
                </li>
                <li>
                  <Link to="/help" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    Help Center & FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/my-reports" style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    My Submissions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid #F1F5F9',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.825rem',
            color: '#94A3B8'
          }}>
            <div>
              © 2026 Fixora. Built for smarter campuses. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Terms of Service</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Security Status</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
