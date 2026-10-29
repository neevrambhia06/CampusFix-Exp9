import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  CheckSquare, 
  Square, 
  ShieldAlert, 
  Clock, 
  UserCheck, 
  X, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export function AlertDetailsModal({ alert, onClose }) {
  if (!alert) return null;

  // Local state for interactive safety checklist
  const initialChecked = {};
  if (Array.isArray(alert.safetyChecklist)) {
    alert.safetyChecklist.forEach((_, idx) => {
      initialChecked[idx] = false;
    });
  }
  const [checkedItems, setCheckedItems] = useState(initialChecked);

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const severity = alert.severity || alert.badge || 'Important';
  const isCritical = severity.toLowerCase().includes('critical') || severity.toLowerCase().includes('safety');
  const isWarning = severity.toLowerCase().includes('warning') || severity.toLowerCase().includes('important');

  const badgeColor = isCritical ? '#BE123C' : isWarning ? '#D97706' : '#2563EB';
  const badgeBg = isCritical ? '#FFF1F2' : isWarning ? '#FEF3C7' : '#EFF6FF';
  const badgeBorder = isCritical ? '#FECDD3' : isWarning ? '#FDE68A' : '#BFDBFE';

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          border: '1px solid #E2E8F0',
          position: 'relative',
          padding: '2rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748B',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E2E8F0';
            e.currentTarget.style.color = '#0F172A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F1F5F9';
            e.currentTarget.style.color = '#64748B';
          }}
          title="Close Alert Details"
        >
          <X size={18} />
        </button>

        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: badgeColor,
              backgroundColor: badgeBg,
              border: `1px solid ${badgeBorder}`
            }}
          >
            <ShieldAlert size={13} />
            <span>{severity}</span>
          </span>

          {alert.category && (
            <span
              style={{
                padding: '4px 9px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#475569',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              {alert.category}
            </span>
          )}

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', marginLeft: 'auto' }}>
            <Clock size={13} />
            <span>{alert.date || alert.time || 'Recently posted'}</span>
          </span>
        </div>

        {/* Alert Title */}
        <h2 
          style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            margin: '0 0 0.75rem 0',
            lineHeight: 1.3
          }}
        >
          {alert.title}
        </h2>

        {/* Sender Info Banner */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: '#F0FDFA',
            border: '1px solid #CCFBF1',
            borderRadius: '10px',
            marginBottom: '1.25rem',
            fontSize: '0.8rem',
            color: '#0F766E',
            fontWeight: 600
          }}
        >
          <UserCheck size={16} style={{ color: '#004643', flexShrink: 0 }} />
          <span>Authorized by: <strong>{alert.sender || alert.author || 'Dr. Ananya Sen · Dean of Infrastructure & Campus Operations'}</strong></span>
        </div>

        {/* Full Message / Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
            Official Directive & Scope
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
            {alert.description || alert.text || 'Routine maintenance and inspection scheduled across campus.'}
          </p>
        </div>

        {/* Impacted Campus Locations */}
        {Array.isArray(alert.impactedLocations) && alert.impactedLocations.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} style={{ color: '#004643' }} />
              <span>Impacted Campus Facilities</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {alert.impactedLocations.map((loc, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.825rem',
                    color: '#1E293B',
                    fontWeight: 500
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#004643' }} />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Checklist */}
        {Array.isArray(alert.safetyChecklist) && alert.safetyChecklist.length > 0 && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              Mandatory Safety Checklist & Advisory
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {alert.safetyChecklist.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '8px 12px',
                      backgroundColor: isChecked ? '#ECFDF5' : '#FFFFFF',
                      borderRadius: '8px',
                      border: isChecked ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ color: isChecked ? '#059669' : '#94A3B8', marginTop: '2px', flexShrink: 0 }}>
                      {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                    </div>
                    <span 
                      style={{ 
                        fontSize: '0.825rem', 
                        color: isChecked ? '#065F46' : '#334155',
                        textDecoration: isChecked ? 'line-through' : 'none',
                        lineHeight: 1.4
                      }}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{
              padding: '0.625rem 1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            <CheckCircle2 size={16} />
            <span>Acknowledge & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDetailsModal;
