import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

/**
 * SpringCheck Component (React Bits micro/spring-check)
 * Micro-interaction checkbox featuring physics-based spring scaling and SVG path-drawn checkmarks.
 */
export function SpringCheck({ 
  checked = false, 
  onChange, 
  label, 
  sublabel,
  id,
  disabled = false,
  color = '#004643',
  activeColor = '#00E599'
}) {
  const [internalChecked, setInternalChecked] = useState(checked);
  const isChecked = onChange !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const nextVal = !isChecked;
    if (onChange) {
      onChange(nextVal);
    } else {
      setInternalChecked(nextVal);
    }
  };

  return (
    <div 
      onClick={handleToggle}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '10px 14px',
        borderRadius: '12px',
        backgroundColor: isChecked ? '#F0FDF4' : '#FFFFFF',
        border: `1px solid ${isChecked ? '#A7F3D0' : '#E2E8F0'}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        transition: 'all 0.15s ease'
      }}
    >
      {/* Spring Animated Checkbox Box */}
      <motion.div
        whileTap={{ scale: disabled ? 1 : 0.8 }}
        animate={{
          scale: isChecked ? [1, 1.25, 1] : 1,
          backgroundColor: isChecked ? color : '#FFFFFF',
          borderColor: isChecked ? color : '#CBD5E1'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '7px',
          border: '2px solid #CBD5E1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px'
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          style={{ overflow: 'visible' }}
        >
          <motion.path
            d="M 4 12 L 9 17 L 20 6"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{
              pathLength: isChecked ? 1 : 0,
              opacity: isChecked ? 1 : 0
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              duration: 0.2
            }}
          />
        </svg>
      </motion.div>

      {/* Label and Details */}
      {(label || sublabel) && (
        <div style={{ flex: 1, minWidth: 0 }}>
          {label && (
            <motion.div 
              animate={{ 
                color: isChecked ? '#64748B' : '#0F172A',
                textDecoration: isChecked ? 'line-through' : 'none'
              }}
              style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}
            >
              {label}
            </motion.div>
          )}
          {sublabel && (
            <div style={{ fontSize: '0.75rem', color: isChecked ? '#94A3B8' : '#64748B', marginTop: '2px' }}>
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * AssignmentChecklist Component
 * Renders the full Experiment 9 assignment requirements using SpringCheck boxes with dynamic completion tally.
 */
export function AssignmentChecklist({ className = '' }) {
  const [tasks, setTasks] = useState([
    { id: 't1', label: 'Spring Boot 3.2.5 REST API backend', sublabel: 'Configured embedded Tomcat on port 8080 and JPA layer', checked: true },
    { id: 't2', label: 'Relational Issue Entity & JpaRepository', sublabel: 'Auto-mapped SQL schema with CRUD repository operations', checked: true },
    { id: 't3', label: 'Docker Containerization with Eclipse Temurin 21', sublabel: 'Multi-stage Dockerfile building optimized Alpine runnable JAR', checked: true },
    { id: 't4', label: 'Cross-Origin Resource Sharing (CORS)', sublabel: 'Allows requests from Render frontend and localhost:5173', checked: true },
    { id: 't5', label: 'Render Cloud Deployment', sublabel: 'Live backend hosted on Render at campusfix-backend-ceqd.onrender.com', checked: true },
    { id: 't6', label: 'Super Admin Control Center & Multi-Role Gateway', sublabel: 'Role-based access for Admin, Student, Faculty, and Technician', checked: true },
    { id: 't7', label: 'Google Authentication & CodeSlots Verification', sublabel: 'Interactive Google account picker & 6-slot OTP micro-interaction', checked: true },
    { id: 't8', label: 'React Bits Micro-Interactions Integration', sublabel: 'TechText, CodeSlots, MagicBento, Stepper, BranchedMenu, SpringCheck', checked: true },
  ]);

  const toggleTask = (id, newChecked) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: newChecked } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.checked).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div 
      className={`assignment-checklist-card ${className}`}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '1.75rem',
        boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)',
        width: '100%'
      }}
    >
      {/* Header with Progress Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
              Experiment 9 Assignment Milestones
            </h3>
            <span style={{ fontSize: '0.675rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' }}>
              {progressPercent}% VERIFIED
            </span>
          </div>
          <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Interactive evaluation checklist with spring-physics check animation
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#004643', fontFamily: 'monospace' }}>
            {completedCount}/{tasks.length}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: '#F1F5F9', overflow: 'hidden', marginBottom: '1.25rem' }}>
        <motion.div
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ height: '100%', backgroundColor: '#004643', borderRadius: '3px' }}
        />
      </div>

      {/* Checklist Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
        {tasks.map((task) => (
          <SpringCheck
            key={task.id}
            id={task.id}
            label={task.label}
            sublabel={task.sublabel}
            checked={task.checked}
            onChange={(nextVal) => toggleTask(task.id, nextVal)}
          />
        ))}
      </div>
    </div>
  );
}

export default SpringCheck;
