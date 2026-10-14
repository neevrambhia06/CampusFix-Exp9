import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * MagicBento & BentoCard Components (React Bits components/magic-bento)
 * Bento grid layout with reactive cursor edge-light tracking and click-wave animation effects.
 */
export function BentoCard({ 
  children, 
  className = '', 
  span = 'col-span-1', 
  onClick,
  title,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = '#004643',
  badgeBg = '#E6F2F1'
}) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;

    const newRipple = {
      id: Date.now() + Math.random(),
      x: rippleX,
      y: rippleY,
    };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`bento-card ${span} ${className}`}
      style={{
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        padding: '1.5rem',
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 12px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)' 
          : '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Reactive Cursor Edge Light / Radial Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          background: `radial-gradient(380px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 70, 67, 0.08), transparent 70%)`,
        }}
      />

      {/* Reactive Border Spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: '21px',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          background: `radial-gradient(240px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 229, 153, 0.4), transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Click-Wave Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: ripple.y - 40,
              left: ripple.x - 40,
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 70, 67, 0.2)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Card Header (if props provided) */}
      {(title || Icon || badge) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {Icon && (
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: badgeBg,
                  color: badgeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={18} />
              </div>
            )}
            <div>
              {title && <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>{title}</h3>}
              {subtitle && <p style={{ margin: '2px 0 0', fontSize: '0.775rem', color: '#64748B' }}>{subtitle}</p>}
            </div>
          </div>

          {badge && (
            <span 
              style={{
                fontSize: '0.675rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: badgeBg,
                color: badgeColor,
                border: `1px solid ${badgeColor}30`
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Card Inner Content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export function MagicBento({ children, className = '' }) {
  return (
    <div 
      className={`magic-bento-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
}

export default MagicBento;
