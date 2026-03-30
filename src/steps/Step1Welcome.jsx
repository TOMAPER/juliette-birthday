import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PigMascot from '../components/PigMascot';
import { fireConfettiBurst } from '../utils/confetti';

export default function Step1Welcome({ onNext }) {
  useEffect(() => {
    fireConfettiBurst();
  }, []);

  return (
    <div className="step-container">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <PigMascot emotion="party" size={140} />
      </motion.div>

      <motion.h1
        className="title-text text-4xl md:text-5xl mt-6 mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        Joyeux Anniversaire
      </motion.h1>

      <motion.h1
        className="title-text text-5xl md:text-6xl mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: 'spring' }}
        style={{ color: '#FF8C42' }}
      >
        Juliette! 🎂🐷
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ fontFamily: 'Fredoka, sans-serif' }}
      >
        Prepare-toi... 🎁
      </motion.p>

      <motion.button
        className="btn-primary text-xl animate-pulse-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, type: 'spring' }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
      >
        Decouvre ton cadeau →
      </motion.button>
    </div>
  );
}
