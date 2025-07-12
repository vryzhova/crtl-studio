import React from 'react';
import { SectionTitle } from './section-title';
import { AnimatePresence, motion } from 'framer-motion';

interface ThankYouModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ open, onClose, title, description }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white rounded-3xl shadow-xl px-12.5 py-8 min-w-[320px] w-[90vw] max-w-[593px] h-[300px] flex flex-col items-center"
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border-2 border-black rounded-md bg-transparent text-black text-2xl transition hover:bg-black/10"
            aria-label="Закрыть"
          >
            <span className="pointer-events-none select-none">✕</span>
          </button>
          <div className={`justify-center container flex items-center mx-auto px-4 relative z-5`}>
            <div className="inline-flex  items-center justify-center  bg-black px-6 py-2 border border-lime-active rounded-full text-lime-active text-sm md:text-base font-mono whitespace-nowrap">
              {title}
            </div>
          </div>
          <div
            className="text-center font-bold text-[2.2rem] leading-tight bg-gradient-to-b from-black to-gray-gradient bg-clip-text text-transparent  mt-2 mb-1"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span>{description}</span>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
