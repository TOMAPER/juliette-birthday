import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PigMascot from '../components/PigMascot';
import { fireConfetti } from '../utils/confetti';

export default function Step9LoveNote({ videoUrl, downloadVideo }) {
  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="step-container">
      <PigMascot emotion="love" size={130} className="mb-6" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-sm mx-auto rounded-3xl p-6 mb-6"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(255, 107, 157, 0.2)',
        }}
      >
        <p
          className="text-lg leading-relaxed"
          style={{ fontFamily: 'Fredoka', color: '#555' }}
        >
          [MESSAGE PERSONNEL DE TOM ICI]
        </p>
        <br />
        <p
          className="text-lg leading-relaxed"
          style={{ fontFamily: 'Fredoka', color: '#555' }}
        >
          Ecris ici ton petit mot pour Juliette. Quelque chose de mignon, drôle,
          ou romantique — c'est toi qui vois! 🐷❤️
        </p>
      </motion.div>

      {/* Optional photo gallery placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-3 mb-6 overflow-x-auto px-4"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FFE0F0, #FFF9C4)',
              border: '2px dashed #FFB3D1',
            }}
          >
            <span className="text-2xl">📷</span>
          </div>
        ))}
      </motion.div>

      <motion.h2
        className="title-text text-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
      >
        Je t'aime ❤️
      </motion.h2>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <PigMascot emotion="happy" size={60} />
      </motion.div>

      {/* Download reaction video */}
      {videoUrl && (
        <motion.div
          className="mt-6 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Fredoka' }}>
            Ta réaction a été filmée! 🎬
          </p>
          <motion.button
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #4FC3F7, #6BCB77)' }}
            whileTap={{ scale: 0.9 }}
            onClick={downloadVideo}
          >
            Télécharger la vidéo 📹
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
