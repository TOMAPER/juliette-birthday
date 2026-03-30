import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PigMascot from '../components/PigMascot';
import { fireConfetti } from '../utils/confetti';

const allOptions = [
  { id: 0, label: 'Un massage 💆🏽‍♀️', reaction: 'Raté, tu en as déjà eu un 👀', pig: 'laughing' },
  { id: 1, label: 'Un restaurant 🍰', reaction: 'Bah non! C\'est nul si je ne suis pas là 🤷🏻‍♂️', pig: 'laughing' },
  { id: 2, label: 'Un objet 🤯', reaction: 'Non, pas un objet 🥸', pig: 'winking' },
  { id: 3, label: 'Une bague 💍', reaction: 'Hmm.... pas encore 👀💍', pig: 'winking' },
];

export default function Step3Quiz({ onNext }) {
  const [remaining, setRemaining] = useState(allOptions);
  const [selected, setSelected] = useState(null);
  const [allDone, setAllDone] = useState(false);

  const isLast = remaining.length === 1;

  const handleSelect = (option) => {
    setSelected(option);
    if (remaining.length === 1) {
      setAllDone(true);
      fireConfetti();
    }
  };

  const handleContinue = () => {
    const newRemaining = remaining.filter((o) => o.id !== selected.id);
    setSelected(null);
    setRemaining(newRemaining);
  };

  return (
    <div className="step-container">
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={`reaction-${selected.id}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <PigMascot emotion={allDone ? 'laughing' : selected.pig} size={110} />
            <motion.p
              className="title-text text-xl mt-4 mb-4 px-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              {selected.reaction}
            </motion.p>

            {allDone && (
              <motion.h2
                className="title-text text-3xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                TOUJOURS PAS 😂
              </motion.h2>
            )}

            <motion.button
              className="btn-primary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: allDone ? 0.8 : 0.4 }}
              whileTap={{ scale: 0.9 }}
              onClick={allDone ? onNext : handleContinue}
            >
              {allDone ? 'C\'est quoi alors mon cadeau?! 😤' : remaining.length > 1 ? 'Essaie encore! 🤔' : 'Dernière chance... 😬'}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={`options-${remaining.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            <PigMascot emotion="surprised" size={100} className="mb-4" />
            <motion.p
              className="title-text text-xl mb-6"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              À ton avis, c'est quoi ton cadeau? 🤔
            </motion.p>
            <div className="flex flex-col gap-3 w-full max-w-sm px-4">
              {remaining.map((option, i) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, type: 'spring' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(option)}
                  className="btn-primary text-left text-base py-3 px-5"
                  style={{
                    background: [
                      'linear-gradient(135deg, #FF6B9D, #FF8C42)',
                      'linear-gradient(135deg, #4FC3F7, #6BCB77)',
                      'linear-gradient(135deg, #FFD93D, #FF8C42)',
                      'linear-gradient(135deg, #BA68C8, #FF6B9D)',
                    ][option.id % 4],
                  }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
