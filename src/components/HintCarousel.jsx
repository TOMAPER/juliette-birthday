import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HintCarousel({ hints, onComplete }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < hints.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative h-40 flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-7xl"
          >
            {hints[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {hints.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i <= current ? 'bg-pink scale-110' : 'bg-pink-light/50'
            }`}
          />
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={next}
        className="btn-primary"
      >
        {current < hints.length - 1 ? 'Indice suivant ➡️' : 'J\'ai vu tous les indices! 🤔'}
      </motion.button>
    </div>
  );
}
