import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExpandableEventCard({
  imageSrc = 'https://assets.watermelon.sh/event.avif',
  title = 'Neon Nights Festival',
  description = 'Experience the ultimate electronic music festival with top DJs and immersive visual arts.',
  content,
  cardId,
  primaryActionLabel,
  onPrimaryAction,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = `expandable-event-card-${cardId || title}`;

  const handlePrimaryAction = () => {
    setIsOpen(false);
    onPrimaryAction?.();
  };

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer overflow-hidden rounded-3xl bg-white border border-[#E0D9CB] hover:border-[#004643]/30 transition-colors group shadow-sm hover:shadow-xl flex flex-col"
      >
        <motion.div layoutId={`image-container-${layoutId}`} className="relative h-48 w-full overflow-hidden bg-[#FAF8F5]">
          <motion.img
            layoutId={`image-${layoutId}`}
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>

        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <motion.h3 layoutId={`title-${layoutId}`} className="text-base font-bold tracking-tight text-[#002E2C] mb-1 line-clamp-1">
            {title}
          </motion.h3>
          <motion.p layoutId={`desc-${layoutId}`} className="text-[#597371] text-xs tracking-wide line-clamp-2">
            {description}
          </motion.p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E0D9CB] z-10 flex flex-col shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center bg-white/70 hover:bg-white rounded-full border border-[#E0D9CB] text-[#002E2C] transition-colors backdrop-blur-sm"
                aria-label="Close event details"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              <motion.div layoutId={`image-container-${layoutId}`} className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
                <motion.img
                  layoutId={`image-${layoutId}`}
                  src={imageSrc}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <motion.h3 layoutId={`title-${layoutId}`} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#002E2C] mb-2">
                  {title}
                </motion.h3>
                <motion.p layoutId={`desc-${layoutId}`} className="text-[#004643] text-xs font-bold tracking-wide uppercase mb-6">
                  {description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  transition={{ type: 'spring', duration: 0.3, bounce: 0, delay: 0.1 }}
                  className="text-[#2C4A48] text-sm leading-relaxed"
                >
                  {content}
                </motion.div>

                {primaryActionLabel && onPrimaryAction && (
                  <div className="mt-6 pt-6 border-t border-[#E0D9CB] flex justify-end">
                    <button
                      onClick={handlePrimaryAction}
                      className="btn btn-primary py-3 px-6 text-sm shadow-sm"
                    >
                      {primaryActionLabel}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}