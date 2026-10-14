import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Server, 
  Database, 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Code2, 
  Globe,
  Terminal,
  Cpu,
  LogIn
} from 'lucide-react';
import { useCampusFix } from '../context/CampusFixContext';
import { TechText } from '../components/reactbits/TechText';
import { MagicBento, BentoCard } from '../components/reactbits/MagicBento';
import { Stepper } from '../components/reactbits/Stepper';
import { BranchedMenu } from '../components/reactbits/BranchedMenu';
import { AssignmentChecklist } from '../components/reactbits/SpringCheck';
import { GoogleAuthModal, GoogleIcon } from '../components/reactbits/GoogleAuthModal';

export function LandingPage() {
  const { stats, dataSource, currentUser, isAdmin } = useCampusFix();
  const navigate = useNavigate();
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  // Experiment 9 Architecture Steps for the Stepper Component
  const experimentSteps = [
    {
      title: 'JPA Entity & Database Schema',
      badge: 'SPRING DATA JPA',
      description: 'Defined the relational Issue entity mapped to the PostgreSQL/H2 "issues" table with primary keys, priority, category, and lifecycle states.',
      content: (
        <div style={{ backgroundColor: '#0F172A', color: '#E2E8F0', padding: '12px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto' }}>
          <code>@Entity @Table(name = "issues") public class Issue &#123; @Id @GeneratedValue Long id; String title; String status; ... &#125;</code>
        </div>
      )
    },
    {
      title: 'Spring Boot REST Controller',
      badge: 'CONTROLLER LAYER',
      description: 'Implemented REST endpoints (GET, POST, PUT, PATCH, DELETE) in IssueController and role-based login validation in AuthController.',
      content: (
        <div style={{ backgroundColor: '#0F172A', color: '#E2E8F0', padding: '12px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto' }}>
          <code>@RestController @RequestMapping("/api/issues") public class IssueController &#123; ... &#125;</code>
        </div>
      )
    },
    {
      title: 'Docker Multi-Stage Build',
      badge: 'CONTAINERIZATION',
      description: 'Constructed an optimized 2-stage Dockerfile: Stage 1 builds Maven dependencies with Temurin JDK 21; Stage 2 packages minimal JRE runtime.',
      content: (
        <div style={{ backgroundColor: '#0F172A', color: '#E2E8F0', padding: '12px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto' }}>
          <code>FROM eclipse-temurin:21-jdk AS builder &rarr; FROM eclipse-temurin:21-jre-alpine CMD java -jar app.jar</code>
        </div>
      )
    },
    {
      title: 'Render Cloud Deployment & CORS',
      badge: 'PRODUCTION HOSTING',
      description: 'Configured universal CorsConfig in Spring Boot to allow React origins, and deployed live to Render at campusfix-backend-ceqd.onrender.com.',
      content: (
        <div style={{ backgroundColor: '#0F172A', color: '#E2E8F0', padding: '12px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto' }}>
          <code>https://campusfix-backend-ceqd.onrender.com/api/health &rarr; 200 OK (Spring Boot Live)</code>
        </div>
      )
    },
    {
      title: 'React 19 Frontend & React Bits',
      badge: 'CLIENT ARCHITECTURE',
      description: 'Connected React 19 Context API to Spring Boot, featuring Google OAuth, CodeSlots OTP, MagicBento, Stepper, and BranchedMenu.',
      content: (
        <div style={{ backgroundColor: '#0F172A', color: '#E2E8F0', padding: '12px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto' }}>
          <code>VITE_API_URL &rarr; Fetch API &rarr; CampusFixContext &rarr; Super Admin & Student Views</code>
        </div>
      )
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#0F172A', overflowX: 'hidden' }}>
      
      {/* Google Auth Modal */}
      <GoogleAuthModal 
        isOpen={showGoogleModal} 
        onClose={() => setShowGoogleModal(false)} 
      />

      {/* Top Navigation Bar */}
      <nav 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E2E8F0',
          padding: '0.875rem 2rem'
        }}
      >
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Logo & Lab Tag */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#004643', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem' }}>
              F
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
                Fixora
              </span>
              <span style={{ marginLeft: '6px', fontSize: '0.675rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#E6F2F1', color: '#004643' }}>
                EXP-9
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <Link to="/dashboard" style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}>
              Dashboard
            </Link>
            <Link to="/issues" style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}>
              All Issues
            </Link>
            <Link to="/report" style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}>
              Report Problem
            </Link>
            <Link to="/admin" style={{ color: '#004643', textDecoration: 'none', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} />
              <span>Admin Portal</span>
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setShowGoogleModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 12px',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              <GoogleIcon size={16} />
              <span>Google Sign-In</span>
            </button>

            <Link
              to="/login"
              className="btn btn-primary"
              style={{ padding: '7px 16px', fontSize: '0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <LogIn size={14} />
              <span>{currentUser ? currentUser.name : 'Sign In'}</span>
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero Section with TechText Project Name */}
      <section style={{ padding: '4rem 1.5rem 3.5rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Animated Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: '#E6F2F1', border: '1px solid #B2D8D5', color: '#004643', fontSize: '0.775rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          <Sparkles size={14} />
          <span>EXPERIMENT 9 · SPRING BOOT 3 + REACT 19 + RENDER CLOUD</span>
        </div>

        {/* REACT BITS: TechText Hero Wordmark */}
        <div style={{ margin: '1rem 0' }}>
          <TechText 
            text="FIXORA" 
            subtext="CAMPUS ISSUE & MAINTENANCE OS" 
            color="#004643" 
            accentColor="#00E599"
            fontSize="4.2rem"
          />
        </div>

        {/* Hero Pitch */}
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '1rem 0 0.75rem', lineHeight: 1.3 }}>
          Report it. Track it. Fix it.
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 2rem' }}>
          A full-stack, enterprise-grade campus maintenance platform. Powered by a containerized 
          Spring Boot REST backend deployed on Render, complete with Super Admin triage, Google OAuth, and interactive React Bits micro-interactions.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '0.95rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Launch Campus Dashboard</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="btn btn-secondary"
            style={{ padding: '12px 24px', fontSize: '0.95rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShieldCheck size={18} style={{ color: '#004643' }} />
            <span>Admin Control Center</span>
          </button>

          <button
            onClick={() => setShowGoogleModal(true)}
            style={{
              padding: '12px 22px',
              fontSize: '0.95rem',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
            }}
          >
            <GoogleIcon size={18} />
            <span>Sign In with Google</span>
          </button>
        </div>

      </section>

      {/* Main Content Sections Container */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        
        {/* SECTION 1: REACT BITS MagicBento Grid */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#004643', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              REACT BITS // MAGIC BENTO GRID
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>
              High-Velocity System Architecture
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0' }}>
              Hover over cards to witness interactive cursor edge-lighting and click-wave ripple physics
            </p>
          </div>

          <MagicBento>
            {/* Card 1: Spring Boot Cloud Backend (Wide) */}
            <BentoCard
              span="col-span-1"
              title="Spring Boot 3.2.5 REST Backend"
              subtitle="Containerized & Deployed on Render Cloud"
              icon={Server}
              badge="LIVE CONTAINER"
              badgeColor="#047857"
              badgeBg="#ECFDF5"
              onClick={() => window.open('https://campusfix-backend-ceqd.onrender.com/api/health', '_blank')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569' }}>
                  <span>Production Host:</span>
                  <strong style={{ color: '#0F172A' }}>Render (Frankfurt, EU)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569' }}>
                  <span>Runtime Environment:</span>
                  <strong style={{ color: '#0F172A' }}>Eclipse Temurin 21 JRE</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569' }}>
                  <span>CORS Cross-Origin:</span>
                  <strong style={{ color: '#047857' }}>Universal (Allowed Any)</strong>
                </div>
                <div style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '0.75rem', fontFamily: 'monospace', color: '#004643', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>GET /api/issues</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </BentoCard>

            {/* Card 2: Real-time Ticket Status */}
            <BentoCard
              span="col-span-1"
              title="Real-Time Issue Triage"
              subtitle="Synchronized across student & admin portals"
              icon={Layers}
              badge="LIVE METRICS"
              badgeColor="#004643"
              badgeBg="#E6F2F1"
              onClick={() => navigate('/issues')}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '1rem', textAlign: 'center' }}>
                <div style={{ padding: '10px 4px', backgroundColor: '#FFF1F2', borderRadius: '10px', border: '1px solid #FECDD3' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E11D48' }}>{stats.reportedIssues}</div>
                  <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#BE123C' }}>Reported</div>
                </div>

                <div style={{ padding: '10px 4px', backgroundColor: '#FEF3C7', borderRadius: '10px', border: '1px solid #FDE68A' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D97706' }}>{stats.inProgressIssues}</div>
                  <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#B45309' }}>In Progress</div>
                </div>

                <div style={{ padding: '10px 4px', backgroundColor: '#ECFDF5', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{stats.resolvedIssues}</div>
                  <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#047857' }}>Resolved</div>
                </div>
              </div>
            </BentoCard>

            {/* Card 3: Multi-Role Auth & Google OAuth */}
            <BentoCard
              span="col-span-1"
              title="Multi-Role Security Gateway"
              subtitle="Google OAuth, CodeSlots & Admin Access"
              icon={ShieldCheck}
              badge="4 ROLES"
              badgeColor="#7C3AED"
              badgeBg="#F5F3FF"
              onClick={() => navigate('/login')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#334155' }}>
                  <CheckCircle2 size={14} style={{ color: '#059669' }} />
                  <span><strong>Administrator</strong> (Full triage & delete)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#334155' }}>
                  <CheckCircle2 size={14} style={{ color: '#059669' }} />
                  <span><strong>Student</strong> (Ticket reporting & tracking)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#334155' }}>
                  <CheckCircle2 size={14} style={{ color: '#059669' }} />
                  <span><strong>Faculty & Technician</strong> Work Orders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#334155' }}>
                  <CheckCircle2 size={14} style={{ color: '#059669' }} />
                  <span><strong>Google Identity</strong> One-Click OAuth</span>
                </div>
              </div>
            </BentoCard>
          </MagicBento>
        </section>

        {/* SECTION 2: REACT BITS BranchedMenu (Subjects & Experiments Tree) */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#004643', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              REACT BITS // BRANCHED MENU
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>
              Academic Subjects & Branched Experiments
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0' }}>
              Hierarchical curriculum navigator connecting core courses to practical lab submissions
            </p>
          </div>

          <BranchedMenu />
        </section>

        {/* SECTION 3: REACT BITS Stepper (Experiment Steps) */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#004643', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              REACT BITS // INTERACTIVE STEPPER
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>
              Experiment 9 Architectural Roadmap
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0' }}>
              Step-by-step breakdown of backend data modeling, dockerization, and cloud deployment
            </p>
          </div>

          <Stepper steps={experimentSteps} />
        </section>

        {/* SECTION 4: REACT BITS SpringCheck (Assignment Checklist) */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#004643', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              REACT BITS // SPRING CHECK MICRO-INTERACTION
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>
              Lab Assignment Submission Verification
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0' }}>
              Click any milestone to experience the spring recoil physics and SVG checkmark drawing
            </p>
          </div>

          <AssignmentChecklist />
        </section>

      </div>

      {/* Modern Minimalist Footer */}
      <footer style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '2.5rem 1.5rem', textAlign: 'center', fontSize: '0.825rem', color: '#64748B' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#004643', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
              F
            </div>
            <strong style={{ color: '#0F172A', fontSize: '1rem' }}>Fixora</strong>
            <span>·</span>
            <span>Experiment 9 Complete Full-Stack Solution</span>
          </div>

          <p style={{ margin: 0, maxWidth: '600px', lineHeight: 1.5 }}>
            Web and Mobile Application Development Lab · Semester 5 · Spring Boot 3 + React 19 + Docker + Render
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', fontWeight: 600 }}>
            <Link to="/dashboard" style={{ color: '#004643', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/issues" style={{ color: '#004643', textDecoration: 'none' }}>All Issues</Link>
            <Link to="/admin" style={{ color: '#004643', textDecoration: 'none' }}>Admin Control</Link>
            <Link to="/login" style={{ color: '#004643', textDecoration: 'none' }}>Portal Login</Link>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.5rem' }}>
            © 2026 Fixora. Designed with React Bits micro-interactions.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
