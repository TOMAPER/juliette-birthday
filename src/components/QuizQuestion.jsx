import { motion } from 'framer-motion';

export default function QuizQuestion({ question, options, onSelect }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.p
        className="text-xl font-bold mb-6 title-text"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {question}
      </motion.p>
      <div className="flex flex-col gap-3">
        {options.map((option, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(option)}
            className="btn-primary text-left text-base py-3 px-5"
            style={{
              background: [
                'linear-gradient(135deg, #FF6B9D, #FF8C42)',
                'linear-gradient(135deg, #4FC3F7, #6BCB77)',
                'linear-gradient(135deg, #FFD93D, #FF8C42)',
                'linear-gradient(135deg, #BA68C8, #FF6B9D)',
              ][i % 4],
            }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
