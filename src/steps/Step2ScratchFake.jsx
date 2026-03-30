import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScratchCard from '../components/ScratchCard';
import PigMascot from '../components/PigMascot';
import { fireConfetti } from '../utils/confetti';

export default function Step2ScratchFake({ onNext }) {
  const [phase, setPhase] = useState('scratch'); // scratch, photo, joke

  const handleReveal = () => {
    fireConfetti();
    setPhase('photo');
  };

  return (
    <div className="step-container">
      <AnimatePresence mode="wait">
        {phase === 'scratch' && (
          <motion.div
            key="scratch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <motion.h2
              className="title-text text-2xl mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Gratte pour découvrir ton cadeau! 🎁
            </motion.h2>

            <ScratchCard
              width={280}
              height={350}
              coverText="GRATTE ICI! ✨"
              onReveal={handleReveal}
            >
              <img
                src="/images/tom.jpg"
                alt="Surprise!"
                className="w-full h-full object-cover"
              />
            </ScratchCard>

            <motion.p
              className="text-gray-500 mt-4 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              👆 Frotte avec ton doigt!
            </motion.p>
          </motion.div>
        )}

        {phase === 'photo' && (
          <motion.div
            key="photo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="rounded-3xl overflow-hidden mb-6"
              style={{
                width: '85vw',
                maxWidth: 340,
                boxShadow: '0 10px 40px rgba(255, 107, 157, 0.4)',
              }}
            >
              <img
                src="/images/tom.jpg"
                alt="Surprise!"
                className="w-full object-cover"
              />
            </motion.div>

            <PigMascot emotion="winking" size={80} />
            <motion.h2
              className="title-text text-2xl mt-3 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              C'est MOI ton cadeau! 😏
            </motion.h2>
            <motion.p
              className="text-gray-500 text-lg mb-6"
              style={{ fontFamily: 'Fredoka' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tu es contente? 😏😏😏
            </motion.p>

            <motion.button
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase('joke')}
            >
              Euh... 😅
            </motion.button>
          </motion.div>
        )}

        {phase === 'joke' && (
          <motion.div
            key="joke"
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            className="flex flex-col items-center"
          >
            <PigMascot emotion="winking" size={120} />
            <motion.h2
              className="title-text text-2xl mt-4 mb-6"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              Bon ok, j'arrête...
            </motion.h2>

            <motion.button
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
            >
              Je veux connaître mon cadeau!! 😠
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
