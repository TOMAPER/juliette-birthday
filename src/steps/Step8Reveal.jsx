import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PigMascot from '../components/PigMascot';
import { fireMassiveConfetti } from '../utils/confetti';

export default function Step8Reveal({ onNext }) {
  useEffect(() => {
    fireMassiveConfetti();
  }, []);

  return (
    <div
      className="step-container"
      style={{
        background: 'radial-gradient(circle at center, rgba(255,215,0,0.2) 0%, rgba(255,107,157,0.1) 50%, transparent 80%)',
      }}
    >
      {/* Dancing pigs */}
      <div className="flex gap-4 mb-4">
        <PigMascot emotion="party" size={70} />
        <PigMascot emotion="love" size={70} />
        <PigMascot emotion="party" size={70} />
      </div>

      {/* Reveal image */}
      <motion.div
        initial={{ scale: 0, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.3 }}
        className="rounded-3xl overflow-hidden mb-6"
        style={{
          width: '85vw',
          maxWidth: 340,
          boxShadow: '0 10px 40px rgba(255, 107, 157, 0.4)',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/reveal.jpg`}
          alt="Surprise!"
          className="w-full object-cover"
        />
      </motion.div>

      <motion.h1
        className="title-text text-4xl md:text-5xl mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 12 }}
      >
        Rejoins-moi à Bali ✈️🌴
      </motion.h1>

      <motion.p
        className="text-xl mb-8"
        style={{ fontFamily: 'Fredoka', color: '#555' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        Pour deux semaines, le 14 avril ☀️
      </motion.p>

      <motion.p
        className="text-lg text-gray-500 mb-8"
        style={{ fontFamily: 'Fredoka' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        Joyeux anniversaire mon tout petit ❤️🐷
      </motion.p>

      <motion.button
        className="btn-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
      >
        Voir le reste... ❤️
      </motion.button>
    </div>
  );
}
