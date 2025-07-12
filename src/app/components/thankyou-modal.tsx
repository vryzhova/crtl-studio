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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-[#F7F7F7] rounded-3xl shadow-xl px-6 py-8 min-w-[320px] max-w-full w-[90vw] max-w-[420px] flex flex-col items-center"
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-14 h-14 flex items-center justify-center border-4 border-black rounded-2xl bg-transparent text-black text-4xl transition hover:bg-black/10"
            aria-label="Закрыть"
          >
            <span className="pointer-events-none select-none">✕</span>
          </button>
          <SectionTitle title={title} position="center" />
          <div
            className="text-center font-bold text-[2.2rem] leading-tight text-[#333] mt-2 mb-1"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span>{description}</span>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
