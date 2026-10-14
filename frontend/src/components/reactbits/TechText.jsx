import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const TECH_GLYPHS = '01#%&*+<>[]{}~=/_X0192ΔΩ';

/**
 * TechText Component (React Bits text-animations/tech-text)
 * Letters transform into dashed vector paths and scramble into technical blueprint glyphs under cursor hover.
 */
export function TechText({ 
  text = 'FIXORA', 
  subtext = 'CAMPUS MAINTENANCE OS',
  className = '',
  color = '#004643',
  accentColor = '#00E599',
  fontSize = '3.5rem'
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Scramble animation on hover or initial load
  const triggerScramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return TECH_GLYPHS[Math.floor(Math.random() * TECH_GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    triggerScramble();
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <div 
      className={`tech-text-container ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        triggerScramble();
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem 2rem',
        cursor: 'crosshair',
        userSelect: 'none'
      }}
    >
      {/* Corner Tech Crosshairs & Blueprint Dashes */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px dashed rgba(0, 70, 67, 0.25)',
          borderRadius: '16px',
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
          borderColor: isHovered ? accentColor : 'rgba(0, 70, 67, 0.25)',
          boxShadow: isHovered ? `0 0 25px ${accentColor}25` : 'none'
        }}
      >
        {/* Top-Left Crosshair */}
        <span style={{ position: 'absolute', top: '-6px', left: '-6px', width: '12px', height: '12px', borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
        {/* Top-Right Crosshair */}
        <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '12px', height: '12px', borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
        {/* Bottom-Left Crosshair */}
        <span style={{ position: 'absolute', bottom: '-6px', left: '-6px', width: '12px', height: '12px', borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
        {/* Bottom-Right Crosshair */}
        <span style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '12px', height: '12px', borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
      </div>

      {/* Blueprint Coordinates Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.675rem', fontFamily: 'monospace', letterSpacing: '0.12em', color: color, opacity: 0.7, marginBottom: '4px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isHovered ? accentColor : color, display: 'inline-block', transition: 'background-color 0.2s' }} />
        <span>SYS.ENG // EXP-9.PROD</span>
        <span>·</span>
        <span>LOC [37.7749° N, 122.4194° W]</span>
      </div>

      {/* Main Scrambling Wordmark with Dashed Vector Path Effect */}
      <motion.div
        animate={{
          letterSpacing: isHovered ? '0.18em' : '0.08em',
          textShadow: isHovered 
            ? `0 0 12px ${accentColor}80, 0 0 30px ${color}40`
            : '0 2px 8px rgba(0, 70, 67, 0.15)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          fontSize,
          fontWeight: 900,
          fontFamily: "'Cabinet Grotesk', 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
          color: color,
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          lineHeight: 1.1,
          position: 'relative'
        }}
      >
        {displayText.split('').map((char, idx) => (
          <span 
            key={idx}
            style={{
              display: 'inline-block',
              position: 'relative',
              transition: 'transform 0.15s ease, color 0.15s ease',
              color: isHovered && Math.random() > 0.6 ? accentColor : color,
              transform: isHovered ? `translateY(${Math.sin(idx + Date.now()) * 2}px)` : 'none'
            }}
          >
            {char}
          </span>
        ))}
      </motion.div>

      {/* Subtext with Terminal Cursor */}
      {subtext && (
        <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#475569' }}>
          <span>{subtext}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ width: '6px', height: '12px', backgroundColor: accentColor, display: 'inline-block' }}
          />
        </div>
      )}
    </div>
  );
}

export default TechText;
