import { motion } from 'framer-motion';
import PigMascot from '../components/PigMascot';

export default function Step0Consent({ onAccept, onDecline }) {
  return (
    <div className="step-container">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <PigMascot emotion="happy" size={110} />
      </motion.div>

      <motion.h2
        className="title-text text-2xl mt-6 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Avant de commencer... 📸
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 mb-8 px-6"
        style={{ fontFamily: 'Fredoka' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Est-ce que tu veux qu'on filme tes réactions pendant la surprise? 🤭
      </motion.p>

      <motion.div
        className="flex flex-col gap-3 w-full max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          className="btn-primary"
          style={{ background: 'linear-gradient(135deg, #6BCB77, #4FC3F7)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onAccept}
        >
          Oui, filme-moi! 📹😄
        </motion.button>
        <motion.button
          className="btn-primary"
          style={{ background: 'linear-gradient(135deg, #BA68C8, #FF6B9D)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onDecline}
        >
          Non merci 🙈
        </motion.button>
      </motion.div>
    </div>
  );
}
