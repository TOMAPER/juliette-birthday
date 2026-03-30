import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PigMascot from '../components/PigMascot';
import HintCarousel from '../components/HintCarousel';
import { fireConfetti, fireConfettiBurst } from '../utils/confetti';

const fakeHints = ['👻', '👗', '☘️', '📞'];
const realHints = ['🏃🏽‍♀️', '✅', '😴', '📊'];

export default function Step6Hints({ onNext }) {
  // Phases: fakeCarousel → fakeGuess → fakeWrong → realCarousel → realGuess → lastHint → lastGuess → whoop → realReveal
  const [phase, setPhase] = useState('fakeCarousel');
  const [guess, setGuess] = useState('');

  const handleFakeGuess = (e) => {
    e.preventDefault();
    if (guess.trim()) {
      setGuess('');
      setPhase('fakeWrong');
    }
  };


  return (
    <div className="step-container">
      <AnimatePresence mode="wait">

        {/* PHASE 1: Fake hints carousel */}
        {phase === 'fakeCarousel' && (
          <motion.div
            key="fakeCarousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
          >
            <PigMascot emotion="detective" size={100} className="mb-4" />
            <h2 className="title-text text-2xl mb-6">
              Ok, devine mon cadeau 🕵️
            </h2>
            <HintCarousel hints={fakeHints} onComplete={() => setPhase('fakeGuess')} />
          </motion.div>
        )}

        {/* PHASE 2: Text input for fake guess */}
        {phase === 'fakeGuess' && (
          <motion.div
            key="fakeGuess"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
          >
            <PigMascot emotion="winking" size={100} className="mb-4" />
            <h2 className="title-text text-xl mb-6">
              Alors, c'est quoi d'après toi? 🤔
            </h2>
            <form onSubmit={handleFakeGuess} className="w-full max-w-xs flex flex-col gap-3">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Tape ta réponse..."
                className="w-full px-5 py-4 rounded-full text-lg text-center outline-none"
                style={{
                  fontFamily: 'Fredoka, sans-serif',
                  border: '3px solid #FFB3D1',
                  background: 'rgba(255,255,255,0.8)',
                  color: '#555',
                }}
                autoFocus
              />
              <motion.button
                type="submit"
                className="btn-primary"
                whileTap={{ scale: 0.9 }}
              >
                Valider ✅
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* PHASE 3: Wrong! Not even the right hints */}
        {phase === 'fakeWrong' && (
          <motion.div
            key="fakeWrong"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <PigMascot emotion="laughing" size={110} />
            <motion.h2
              className="title-text text-2xl mt-4 mb-2"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              Raté! 😂
            </motion.h2>
            <motion.p
              className="text-lg text-gray-500 mb-6 px-4"
              style={{ fontFamily: 'Fredoka' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Ce n'étaient même pas les bons indices 😏
            </motion.p>
            <motion.p
              className="title-text text-xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Voilà les vrais indices...
            </motion.p>
            <motion.button
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase('realCarousel')}
            >
              Montre-moi! 🧐
            </motion.button>
          </motion.div>
        )}

        {/* PHASE 4: Real hints carousel */}
        {phase === 'realCarousel' && (
          <motion.div
            key="realCarousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
          >
            <PigMascot emotion="detective" size={100} className="mb-4" />
            <h2 className="title-text text-2xl mb-6">
              Les vrais indices 🕵️
            </h2>
            <HintCarousel hints={realHints} onComplete={() => setPhase('iKnow')} />
          </motion.div>
        )}

        {/* PHASE 5: "C'est bon je sais" button */}
        {phase === 'iKnow' && (
          <motion.div
            key="iKnow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <PigMascot emotion="surprised" size={100} className="mb-6" />
            <motion.button
              className="btn-primary text-lg"
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase('lastGuess')}
            >
              C'est bon, je sais ce que c'est! 🤩
            </motion.button>
          </motion.div>
        )}

        {/* PHASE 6: Nope, not a Whoop */}
        {phase === 'lastGuess' && (
          <motion.div
            key="whoop"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <PigMascot emotion="laughing" size={120} />
            <motion.h2
              className="title-text text-2xl mt-4 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              Non, perdu 😂
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 mb-2 px-4"
              style={{ fontFamily: 'Fredoka' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Ce n'est pas une Whoop 😂
            </motion.p>
            <motion.p
              className="text-lg text-gray-500 mb-6 px-4"
              style={{ fontFamily: 'Fredoka' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Je t'ai encore donné des faux indices... 🤭
              Mais voilà ton vrai cadeau!
            </motion.p>
            <motion.button
              className="btn-primary animate-pulse-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                fireConfettiBurst();
                onNext();
              }}
            >
              DÉCOUVRIR MON VRAI CADEAU 🎉
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
