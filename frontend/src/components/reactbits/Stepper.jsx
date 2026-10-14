import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

/**
 * Stepper Component (React Bits components/stepper)
 * Interactive multi-step animated timeline wizard with connected progress tracks and fluid step transitions.
 */
export function Stepper({ 
  steps = [], 
  initialStep = 0,
  onStepChange,
  className = ''
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
      if (onStepChange) onStepChange(index);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  return (
    <div 
      className={`stepper-container ${className}`}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '2rem',
        boxShadow: '0 4px 20px -4px rgba(15, 23, 42, 0.05)'
      }}
    >
      {/* Top Progress Track Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          marginBottom: '2.5rem',
          padding: '0 1rem'
        }}
      >
        {/* Background Connecting Line */}
        <div 
          style={{
            position: 'absolute',
            top: '20px',
            left: '2rem',
            right: '2rem',
            height: '3px',
            backgroundColor: '#E2E8F0',
            zIndex: 0
          }}
        />

        {/* Active Connecting Fill Line */}
        <motion.div 
          animate={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'absolute',
            top: '20px',
            left: '2rem',
            maxWidth: 'calc(100% - 4rem)',
            height: '3px',
            backgroundColor: '#004643',
            zIndex: 1
          }}
        />

        {/* Step Nodes */}
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div 
              key={idx}
              onClick={() => goToStep(idx)}
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive ? '#004643' : isCompleted ? '#059669' : '#FFFFFF',
                  borderColor: isActive ? '#004643' : isCompleted ? '#059669' : '#CBD5E1',
                  color: isActive || isCompleted ? '#FFFFFF' : '#64748B'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  boxShadow: isActive ? '0 0 0 4px rgba(0, 70, 67, 0.15)' : 'none'
                }}
              >
                {isCompleted ? <Check size={18} /> : <span>{idx + 1}</span>}
              </motion.div>

              <span 
                style={{
                  position: 'absolute',
                  top: '48px',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#004643' : '#64748B',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s'
                }}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content Card with Fluid Motion Transition */}
      <div style={{ minHeight: '220px', marginTop: '2.5rem', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#004643', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  STEP 0{currentStep + 1} OF 0{steps.length}
                </span>
                <h4 style={{ margin: '4px 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  {steps[currentStep].title}
                </h4>
              </div>

              {steps[currentStep].badge && (
                <span 
                  style={{ 
                    padding: '3px 10px', 
                    borderRadius: '9999px', 
                    fontSize: '0.725rem', 
                    fontWeight: 700, 
                    backgroundColor: '#E6F2F1', 
                    color: '#004643',
                    border: '1px solid rgba(0, 70, 67, 0.2)' 
                  }}
                >
                  {steps[currentStep].badge}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
              {steps[currentStep].description}
            </p>

            {/* Custom Content Slot / Code Snippet */}
            {steps[currentStep].content && (
              <div>{steps[currentStep].content}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stepper Footer Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9' }}>
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="btn btn-secondary"
          style={{
            opacity: currentStep === 0 ? 0.5 : 1,
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            padding: '8px 16px',
            fontSize: '0.85rem'
          }}
        >
          <ChevronLeft size={16} />
          <span>Previous Step</span>
        </button>

        <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>
          {currentStep + 1} / {steps.length}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="btn btn-primary"
          style={{
            opacity: currentStep === steps.length - 1 ? 0.5 : 1,
            cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
            padding: '8px 18px',
            fontSize: '0.85rem'
          }}
        >
          <span>Next Step</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Stepper;
