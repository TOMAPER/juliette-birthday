import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PigMascot from '../components/PigMascot';
import { fireConfettiBurst } from '../utils/confetti';

const questions = [
  {
    text: "C'est qui le plus beau? 😍",
    options: [
      { label: 'TOM 💁‍♀️', image: null },
      { label: 'TOM 😎', image: null },
    ],
    reaction: 'Bonne réponse, t\'es trop forte 😘',
  },
  {
    text: "C'est qui le plus fort? 💪",
    options: [
      { label: 'TOM 💪', image: null },
      { label: 'TOM 🏆', image: null },
    ],
    reaction: 'Encore bonne réponse, tu as mérité ton cadeau 🎁',
  },
];

export default function Step4FunQuiz({ onNext }) {
  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState(false);

  const currentQ = questions[qIndex];

  const handleAnswer = () => {
    setAnswered(true);
    fireConfettiBurst();
  };

  const nextQuestion = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setAnswered(false);
    } else {
      onNext();
    }
  };

  return (
    <div className="step-container">
      <motion.h2
        className="title-text text-xl mb-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Réponds à ces questions pour avoir ton cadeau 🎁
      </motion.h2>

      <motion.p
        className="text-sm text-gray-400 mb-4"
        style={{ fontFamily: 'Fredoka' }}
      >
        Question {qIndex + 1}/{questions.length}
      </motion.p>

      <PigMascot emotion={answered ? 'party' : 'happy'} size={90} className="mb-4" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${qIndex}-${answered}`}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="w-full max-w-sm"
        >
          {!answered ? (
            <>
              <p className="text-xl mb-6 px-4 font-bold" style={{ fontFamily: 'Fredoka', color: '#555' }}>
                {currentQ.text}
              </p>

              <div className="flex flex-col gap-3 px-4">
                {currentQ.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAnswer}
                    className="btn-primary text-left text-lg py-4 px-5 flex items-center gap-3"
                    style={{
                      background: i === 0
                        ? 'linear-gradient(135deg, #FF6B9D, #FF8C42)'
                        : 'linear-gradient(135deg, #4FC3F7, #6BCB77)',
                    }}
                  >
                    {opt.image && (
                      <img
                        src={opt.image}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                    )}
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <p
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'Fredoka', color: '#6BCB77' }}
              >
                ✅ Bonne réponse!
              </p>
              <p
                className="text-lg text-gray-600 mb-6 px-4"
                style={{ fontFamily: 'Fredoka' }}
              >
                {currentQ.reaction}
              </p>
              <motion.button
                className="btn-primary"
                whileTap={{ scale: 0.9 }}
                onClick={nextQuestion}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {qIndex < questions.length - 1 ? 'Question suivante ➡️' : 'Voir mon cadeau! 🎉'}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
