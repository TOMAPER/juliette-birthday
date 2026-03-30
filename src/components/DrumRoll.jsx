import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DrumRoll({ onComplete, duration = 3000 }) {
  const [phase, setPhase] = useState(0);
  const words = ['Ton...', 'vrai...', 'cadeau...', "c'est..."];

  useEffect(() => {
    if (phase < words.length) {
      const timer = setTimeout(() => setPhase(phase + 1), duration / words.length);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onComplete?.(), 500);
      return () => clearTimeout(timer);
    }
  }, [phase, duration, onComplete, words.length]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-3">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={
              i < phase
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.5, y: 20 }
            }
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }}
            className="title-text text-3xl md:text-4xl"
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Pulsing background effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle, rgba(255,107,157,0.1) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(255,107,157,0.2) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(255,107,157,0.1) 0%, transparent 70%)',
          ],
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
    </div>
  );
}
