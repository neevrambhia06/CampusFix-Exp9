import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * CodeSlots Component (React Bits micro/code-slots)
 * Segmented OTP / Passcode entry where digit slots spring dynamically into place upon typing or pasting.
 */
export function CodeSlots({ 
  length = 6, 
  onComplete, 
  autoFocus = true,
  disabled = false,
  presetCode = '948210'
}) {
  const [values, setValues] = useState(Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index, value) => {
    if (disabled) return;
    const cleanChar = value.slice(-1); // Take the latest typed character

    const newValues = [...values];
    newValues[index] = cleanChar;
    setValues(newValues);

    // Auto-advance to next slot if a character was entered
    if (cleanChar && index < length - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    // Check if fully completed
    const fullCode = newValues.join('');
    if (fullCode.length === length && !newValues.includes('')) {
      if (onComplete) onComplete(fullCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      if (!values[index] && index > 0) {
        // Move back and clear previous
        const newValues = [...values];
        newValues[index - 1] = '';
        setValues(newValues);
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newValues = [...values];
        newValues[index] = '';
        setValues(newValues);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    if (disabled) return;

    const pastedData = e.clipboardData.getData('text/plain').trim().slice(0, length);
    if (!pastedData) return;

    const newValues = [...values];
    pastedData.split('').forEach((char, i) => {
      if (i < length) newValues[i] = char;
    });
    setValues(newValues);

    const nextIdx = Math.min(pastedData.length, length - 1);
    setActiveIndex(nextIdx);
    inputRefs.current[nextIdx]?.focus();

    if (pastedData.length === length && onComplete) {
      onComplete(pastedData);
    }
  };

  const fillPreset = (codeToFill) => {
    const chars = codeToFill.slice(0, length).split('');
    const newValues = Array(length).fill('');
    chars.forEach((c, idx) => { newValues[idx] = c; });
    setValues(newValues);
    if (onComplete) onComplete(chars.join(''));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
      {/* Segmented Code Slots Container */}
      <div 
        onPaste={handlePaste}
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        {Array.from({ length }).map((_, index) => {
          const isFilled = Boolean(values[index]);
          const isFocused = activeIndex === index;

          return (
            <motion.div
              key={index}
              animate={{
                scale: isFocused ? 1.08 : 1,
                borderColor: isFocused ? '#004643' : isFilled ? '#00E599' : '#CBD5E1',
                boxShadow: isFocused 
                  ? '0 0 0 3px rgba(0, 70, 67, 0.15), 0 8px 16px -4px rgba(15, 23, 42, 0.08)' 
                  : isFilled 
                  ? '0 2px 6px rgba(0, 229, 153, 0.12)' 
                  : '0 1px 2px rgba(15, 23, 42, 0.04)'
              }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              style={{
                position: 'relative',
                width: '46px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: isFocused ? '#FFFFFF' : isFilled ? '#F0FDF4' : '#F8FAFC',
                border: '2px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Hidden Transparent Input Overlay */}
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={values[index]}
                disabled={disabled}
                onFocus={() => setActiveIndex(index)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  cursor: disabled ? 'not-allowed' : 'text'
                }}
              />

              {/* Spring Animated Digit Display */}
              <AnimatePresence mode="popLayout">
                {isFilled ? (
                  <motion.span
                    key={values[index] + index}
                    initial={{ y: 20, scale: 0.5, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    exit={{ y: -20, scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      fontFamily: 'monospace'
                    }}
                  >
                    {values[index]}
                  </motion.span>
                ) : isFocused ? (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{
                      width: '2px',
                      height: '24px',
                      backgroundColor: '#004643',
                      borderRadius: '1px'
                    }}
                  />
                ) : (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Auto-fill Preset Helper Chip */}
      {presetCode && (
        <button
          type="button"
          onClick={() => fillPreset(presetCode)}
          disabled={disabled}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#F1F5F9',
            border: '1px dashed #CBD5E1',
            color: '#475569',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E6F2F1';
            e.currentTarget.style.borderColor = '#004643';
            e.currentTarget.style.color = '#004643';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F1F5F9';
            e.currentTarget.style.borderColor = '#CBD5E1';
            e.currentTarget.style.color = '#475569';
          }}
        >
          <Sparkles size={12} />
          <span>Auto-fill Demo Passcode ({presetCode})</span>
        </button>
      )}
    </div>
  );
}

export default CodeSlots;
