import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScratchCard from '../components/ScratchCard';
import PigMascot from '../components/PigMascot';
import { fireConfetti } from '../utils/confetti';

export default function Step5ScratchFake2({ onNext }) {
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
            <PigMascot emotion="happy" size={90} className="mb-3" />
            <motion.h2
              className="title-text text-2xl mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Gratte ici pour voir ton cadeau! 🎁
            </motion.h2>

            <ScratchCard
              width={280}
              height={280}
              coverColor="#6BCB77"
              coverText="TON CADEAU! ✨"
              onReveal={handleReveal}
            >
              <img
                src="/images/chat.jpg"
                alt="Un chat!"
                className="w-full h-full object-cover"
              />
            </ScratchCard>

            <motion.p
              className="text-gray-500 mt-4 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              👆 Allez gratte!
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
              initial={{ scale: 0.5, rotate: 3 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="rounded-3xl overflow-hidden mb-6"
              style={{
                width: '85vw',
                maxWidth: 340,
                boxShadow: '0 10px 40px rgba(107, 203, 119, 0.4)',
              }}
            >
              <img
                src="/images/chat.jpg"
                alt="Un chat!"
                className="w-full object-cover"
              />
            </motion.div>

            <PigMascot emotion="love" size={80} />
            <motion.h2
              className="title-text text-2xl mt-3 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              🐱🐱🐱
            </motion.h2>

            <motion.button
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase('joke')}
            >
              C'est vrai?! 😍
            </motion.button>
          </motion.div>
        )}

        {phase === 'joke' && (
          <motion.div
            key="joke"
            initial={{ scale: 0.5, opacity: 0, rotate: 10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            className="flex flex-col items-center"
          >
            <PigMascot emotion="laughing" size={120} />
            <motion.h2
              className="title-text text-xl mt-4 mb-2 px-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              Non je ne vais pas te prendre un deuxième chat 😂
            </motion.h2>
            <motion.p
              className="text-lg text-gray-500 mb-6"
              style={{ fontFamily: 'Fredoka' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ça serait comme tromper notre fille 🥲
            </motion.p>

            <motion.button
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
            >
              TOM. ARRÊTE. 😂😤
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
