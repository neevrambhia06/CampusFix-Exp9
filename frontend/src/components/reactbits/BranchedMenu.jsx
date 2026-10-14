import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown, 
  Code2, 
  Database, 
  Network, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_SUBJECTS = [
  {
    id: 'wmad',
    title: 'Web and Mobile Application Development (Lab)',
    code: 'CS-504L',
    icon: Code2,
    badge: 'SEMESTER 5 CORE',
    color: '#004643',
    bg: '#E6F2F1',
    isOpenDefault: true,
    experiments: [
      { id: 'exp1', num: 'Exp 1', title: 'HTML5 Semantic Layout & CSS3 Grid/Flexbox', status: 'Completed', link: '/dashboard' },
      { id: 'exp2', num: 'Exp 2', title: 'JavaScript DOM Manipulation & Event Handling', status: 'Completed', link: '/dashboard' },
      { id: 'exp3', num: 'Exp 3', title: 'React Functional Components, Props & State', status: 'Completed', link: '/dashboard' },
      { id: 'exp4', num: 'Exp 4', title: 'Campus Issue System (Client Prototype)', status: 'Completed', link: '/dashboard' },
      { id: 'exp5', num: 'Exp 5', title: 'React Hooks (useContext, useMemo, useRef)', status: 'Completed', link: '/dashboard' },
      { id: 'exp6', num: 'Exp 6', title: 'Asynchronous Data Fetching & REST Client', status: 'Completed', link: '/issues' },
      { id: 'exp7', num: 'Exp 7', title: 'Backend API Service Simulation with Express', status: 'Completed', link: '/dashboard' },
      { id: 'exp8', num: 'Exp 8', title: 'Role-Based Authentication & Guarded Routes', status: 'Completed', link: '/login' },
      { 
        id: 'exp9', 
        num: 'Exp 9', 
        title: 'Fixora Full-Stack: Spring Boot + Docker + Render + Auth', 
        status: 'Active Lab', 
        active: true, 
        badge: 'CURRENT PROJECT',
        link: '/dashboard' 
      },
    ]
  },
  {
    id: 'dbms',
    title: 'Database Management Systems Lab',
    code: 'CS-502L',
    icon: Database,
    badge: 'RELATIONAL SQL',
    color: '#2563EB',
    bg: '#EFF6FF',
    experiments: [
      { id: 'db1', num: 'Exp 1', title: 'Relational Schema DDL & Integrity Constraints', status: 'Completed' },
      { id: 'db2', num: 'Exp 2', title: 'Complex SQL Queries, Subqueries & Joins', status: 'Completed' },
      { id: 'db3', num: 'Exp 3', title: 'PL/SQL Triggers, Procedures & Transactions', status: 'Completed' },
    ]
  },
  {
    id: 'cn',
    title: 'Computer Networks Lab',
    code: 'CS-503L',
    icon: Network,
    badge: 'NETWORKING',
    color: '#7C3AED',
    bg: '#F5F3FF',
    experiments: [
      { id: 'cn1', num: 'Exp 1', title: 'Packet Capture & Header Analysis (Wireshark)', status: 'Completed' },
      { id: 'cn2', num: 'Exp 2', title: 'Client-Server Socket Programming (TCP/UDP)', status: 'Completed' },
    ]
  },
  {
    id: 'se',
    title: 'Software Engineering & Agile Methodologies',
    code: 'CS-501',
    icon: Layers,
    badge: 'AGILE / CI-CD',
    color: '#D97706',
    bg: '#FFFBEB',
    experiments: [
      { id: 'se1', num: 'Exp 1', title: 'UML Use-Case & Class Diagrams Modeling', status: 'Completed' },
      { id: 'se2', num: 'Exp 2', title: 'Automated Unit Testing & Continuous Delivery', status: 'Completed' },
    ]
  }
];

/**
 * BranchedMenu Component (React Bits micro/branched-menu)
 * Visual hierarchy tree with connecting curved SVG branch lines mapping academic subjects to lab experiments.
 */
export function BranchedMenu({ 
  subjects = DEFAULT_SUBJECTS,
  onSelectExperiment,
  className = ''
}) {
  const [openSubjects, setOpenSubjects] = useState({ wmad: true });

  const toggleSubject = (id) => {
    setOpenSubjects((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div 
      className={`branched-menu-tree ${className}`}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '1.75rem',
        boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#E6F2F1', color: '#004643', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
              Academic Subjects & Lab Tracks
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Explore semester course syllabus and dive into branched lab experiments
            </p>
          </div>
        </div>

        <span style={{ fontSize: '0.725rem', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px', backgroundColor: '#F1F5F9', color: '#475569' }}>
          SEM 5 CURRICULUM
        </span>
      </div>

      {/* Subject Nodes List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {subjects.map((subj) => {
          const isOpen = Boolean(openSubjects[subj.id]);
          const Icon = subj.icon || Folder;

          return (
            <div key={subj.id} style={{ position: 'relative' }}>
              
              {/* Parent Subject Node Card */}
              <button
                type="button"
                onClick={() => toggleSubject(subj.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  backgroundColor: isOpen ? subj.bg : '#F8FAFC',
                  border: `1px solid ${isOpen ? subj.color + '40' : '#E2E8F0'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '8px', 
                      backgroundColor: '#FFFFFF', 
                      color: subj.color, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)' 
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                        {subj.title}
                      </span>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.725rem', color: subj.color, fontWeight: 700, backgroundColor: '#FFFFFF', padding: '1px 6px', borderRadius: '4px' }}>
                        {subj.code}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {subj.experiments?.length || 0} Practical Experiments
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {subj.badge && (
                    <span style={{ fontSize: '0.675rem', fontWeight: 700, color: subj.color, padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#FFFFFF' }}>
                      {subj.badge}
                    </span>
                  )}
                  {isOpen ? <ChevronDown size={18} style={{ color: subj.color }} /> : <ChevronRight size={18} style={{ color: '#94A3B8' }} />}
                </div>
              </button>

              {/* Branched Children (Experiments) with SVG Tree Lines */}
              <AnimatePresence>
                {isOpen && subj.experiments && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{
                      position: 'relative',
                      marginLeft: '20px',
                      paddingLeft: '24px',
                      marginTop: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    {/* Vertical Trunk Branch Line */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: '22px',
                        left: '0px',
                        width: '2px',
                        backgroundColor: subj.color + '40',
                        borderRadius: '1px'
                      }}
                    />

                    {subj.experiments.map((exp, expIdx) => {
                      const isCurrent = exp.active;

                      return (
                        <div 
                          key={exp.id || expIdx}
                          style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {/* Curved Branch Hook (SVG) */}
                          <svg
                            style={{
                              position: 'absolute',
                              left: '-24px',
                              top: '12px',
                              width: '24px',
                              height: '24px',
                              pointerEvents: 'none'
                            }}
                          >
                            <path
                              d="M 0 0 L 0 8 Q 0 16 12 16 L 24 16"
                              fill="none"
                              stroke={subj.color + '50'}
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>

                          {/* Branch Leaf Item */}
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 14px',
                              borderRadius: '10px',
                              backgroundColor: isCurrent ? '#E6F2F1' : '#FFFFFF',
                              border: `1px solid ${isCurrent ? '#004643' : '#E2E8F0'}`,
                              boxShadow: isCurrent ? '0 2px 8px rgba(0, 70, 67, 0.12)' : 'none',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span 
                                style={{ 
                                  fontFamily: 'monospace', 
                                  fontSize: '0.725rem', 
                                  fontWeight: 800, 
                                  color: isCurrent ? '#004643' : '#64748B',
                                  backgroundColor: isCurrent ? '#FFFFFF' : '#F1F5F9',
                                  padding: '2px 6px',
                                  borderRadius: '4px'
                                }}
                              >
                                {exp.num}
                              </span>
                              <span style={{ fontSize: '0.825rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#004643' : '#334155' }}>
                                {exp.title}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {exp.badge && (
                                <span style={{ fontSize: '0.675rem', fontWeight: 800, backgroundColor: '#004643', color: '#FFFFFF', padding: '2px 8px', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Sparkles size={11} />
                                  <span>{exp.badge}</span>
                                </span>
                              )}

                              {exp.link ? (
                                <Link
                                  to={exp.link}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: isCurrent ? '#004643' : '#2563EB',
                                    textDecoration: 'none'
                                  }}
                                >
                                  <span>Launch</span>
                                  <ExternalLink size={12} />
                                </Link>
                              ) : (
                                <span style={{ fontSize: '0.725rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                                  <CheckCircle2 size={13} />
                                  <span>{exp.status}</span>
                                </span>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BranchedMenu;
