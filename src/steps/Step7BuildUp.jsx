import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PigMascot from '../components/PigMascot';

// Generate face image paths
const FACE_COUNT = 29;
const faceImages = Array.from({ length: FACE_COUNT }, (_, i) => `/images/faces/face${i + 1}.png`);

// Generate random positions for floating faces
function generateFacePositions(count) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      x: Math.random() * 85 + 5,       // 5-90% from left
      y: Math.random() * 75 + 5,       // 5-80% from top
      size: Math.random() * 30 + 55,    // 55-85px
      rotation: Math.random() * 40 - 20, // -20 to 20 deg
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 6,   // 6-10s float cycle (slower)
    });
  }
  return positions;
}

function FloatingFaces() {
  const positions = useMemo(() => generateFacePositions(FACE_COUNT), []);
  const selectedFaces = useMemo(() => faceImages, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {selectedFaces.map((src, i) => {
        const p = positions[i];
        return (
          <motion.img
            key={i}
            src={src}
            alt=""
            className="absolute rounded-full object-cover border-2 border-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0, rotate: p.rotation }}
            animate={{
              opacity: [0, 0.85, 0.85, 0],
              scale: [0, 1, 1, 0.5],
              rotate: [p.rotation, -p.rotation, p.rotation],
              y: [0, -15, 5, -10],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2 + 1,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Step7BuildUp({ onNext }) {
  const [phase, setPhase] = useState('loading1');

  useEffect(() => {
    const timers = [];
    if (phase === 'loading1') {
      timers.push(setTimeout(() => setPhase('loading2'), 4000));
    } else if (phase === 'loading2') {
      timers.push(setTimeout(() => setPhase('loading3'), 4000));
    } else if (phase === 'loading3') {
      timers.push(setTimeout(() => setPhase('drumroll'), 5000));
    } else if (phase === 'drumroll') {
      timers.push(setTimeout(() => setPhase('ready'), 4000));
    }
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const isLoading = phase === 'loading1' || phase === 'loading2' || phase === 'loading3';

  return (
    <div className="step-container relative" style={{ background: 'radial-gradient(circle at center, rgba(255,107,157,0.15) 0%, transparent 70%)' }}>

      {/* Floating Juliette faces in background */}
      {isLoading && <FloatingFaces />}

      <AnimatePresence mode="wait">

        {phase === 'loading1' && (
          <motion.div
            key="loading1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center z-10"
          >
            <motion.p
              className="title-text text-xl mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Chargement du cadeau...
            </motion.p>
            <div className="w-48 h-3 bg-pink-light/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #FF6B9D, #FF8C42)' }}
                initial={{ width: '0%' }}
                animate={{ width: '35%' }}
                transition={{ duration: 4 }}
              />
            </div>
          </motion.div>
        )}

        {phase === 'loading2' && (
          <motion.div
            key="loading2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center z-10"
          >
            <motion.p
              className="title-text text-xl mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Préparation de la surprise...
            </motion.p>
            <div className="w-48 h-3 bg-pink-light/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #FF6B9D, #FFD93D)' }}
                initial={{ width: '35%' }}
                animate={{ width: '70%' }}
                transition={{ duration: 4 }}
              />
            </div>
          </motion.div>
        )}

        {phase === 'loading3' && (
          <motion.div
            key="loading3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center z-10"
          >
            <motion.p
              className="title-text text-xl mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              C'est presque prêt... 🥁
            </motion.p>
            <div className="w-48 h-3 bg-pink-light/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #6BCB77, #4FC3F7)' }}
                initial={{ width: '70%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5 }}
              />
            </div>
          </motion.div>
        )}

        {phase === 'drumroll' && (
          <motion.div
            key="drumroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <PigMascot emotion="surprised" size={110} />
            </motion.div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {['Ton...', 'vrai...', 'cadeau...', "c'est..."].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.8, type: 'spring', stiffness: 300, damping: 15 }}
                  className="title-text text-3xl"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'ready' && (
          <motion.div
            key="ready"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="flex flex-col items-center"
          >
            <PigMascot emotion="party" size={120} className="mb-6" />

            <motion.p
              className="title-text text-2xl mb-8"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Tu es prête?! 🥁
            </motion.p>

            <motion.button
              className="btn-primary text-2xl px-12 py-5 animate-pulse-glow"
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              style={{
                background: 'linear-gradient(135deg, #FF6B9D 0%, #FFD93D 50%, #FF8C42 100%)',
                fontSize: '1.5rem',
              }}
            >
              RÉVÉLER 🎉
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
