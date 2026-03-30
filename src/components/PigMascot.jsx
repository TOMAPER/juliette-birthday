import { motion } from 'framer-motion';

const pigExpressions = {
  happy: {
    eyes: '• •',
    mouth: '◡',
    blush: true,
    color: '#FFB6C1',
  },
  laughing: {
    eyes: '≧ ≦',
    mouth: 'D',
    blush: true,
    color: '#FFB6C1',
  },
  surprised: {
    eyes: 'O O',
    mouth: 'o',
    blush: false,
    color: '#FFB6C1',
  },
  crying: {
    eyes: 'T T',
    mouth: '︵',
    blush: false,
    color: '#FFB6C1',
  },
  winking: {
    eyes: '- •',
    mouth: '◡',
    blush: true,
    color: '#FFB6C1',
  },
  love: {
    eyes: '♥ ♥',
    mouth: '◡',
    blush: true,
    color: '#FF9EAF',
  },
  detective: {
    eyes: '◉ •',
    mouth: '—',
    blush: false,
    color: '#FFB6C1',
    accessory: '🔍',
  },
  party: {
    eyes: '★ ★',
    mouth: 'D',
    blush: true,
    color: '#FF9EAF',
    accessory: '🎉',
  },
};

export default function PigMascot({ emotion = 'happy', size = 120, className = '' }) {
  const expr = pigExpressions[emotion] || pigExpressions.happy;

  const animations = {
    happy: { rotate: [-3, 3, -3], transition: { repeat: Infinity, duration: 2 } },
    laughing: { rotate: [-5, 5, -5], y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } },
    surprised: { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } },
    crying: { y: [0, 3, 0], transition: { repeat: Infinity, duration: 1 } },
    winking: { rotate: [0, 5, 0], transition: { repeat: Infinity, duration: 2 } },
    love: { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } },
    detective: { x: [-3, 3, -3], transition: { repeat: Infinity, duration: 3 } },
    party: { rotate: [-8, 8, -8], y: [0, -8, 0], transition: { repeat: Infinity, duration: 0.8 } },
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={animations[emotion] || animations.happy}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        {/* Ears */}
        <ellipse cx="30" cy="25" rx="18" ry="15" fill={expr.color} stroke="#E91E7E" strokeWidth="2" />
        <ellipse cx="30" cy="25" rx="10" ry="8" fill="#FF8FAB" />
        <ellipse cx="90" cy="25" rx="18" ry="15" fill={expr.color} stroke="#E91E7E" strokeWidth="2" />
        <ellipse cx="90" cy="25" rx="10" ry="8" fill="#FF8FAB" />

        {/* Body (head) */}
        <circle cx="60" cy="62" r="42" fill={expr.color} stroke="#E91E7E" strokeWidth="2.5" />

        {/* Blush */}
        {expr.blush && (
          <>
            <ellipse cx="28" cy="68" rx="10" ry="6" fill="#FF8FAB" opacity="0.5" />
            <ellipse cx="92" cy="68" rx="10" ry="6" fill="#FF8FAB" opacity="0.5" />
          </>
        )}

        {/* Snout */}
        <ellipse cx="60" cy="72" rx="18" ry="13" fill="#FF8FAB" stroke="#E91E7E" strokeWidth="2" />
        <circle cx="53" cy="72" r="3.5" fill="#E91E7E" />
        <circle cx="67" cy="72" r="3.5" fill="#E91E7E" />

        {/* Eyes */}
        <text
          x="60"
          y="55"
          textAnchor="middle"
          fontSize="16"
          fontFamily="monospace"
          fill="#333"
          fontWeight="bold"
        >
          {expr.eyes}
        </text>

        {/* Mouth */}
        <text
          x="60"
          y="92"
          textAnchor="middle"
          fontSize="14"
          fontFamily="monospace"
          fill="#E91E7E"
          fontWeight="bold"
        >
          {expr.mouth}
        </text>

        {/* Accessory */}
        {expr.accessory && (
          <text x="95" y="35" fontSize="20">
            {expr.accessory}
          </text>
        )}

        {/* Tears for crying */}
        {emotion === 'crying' && (
          <>
            <motion.ellipse
              cx="42"
              cy="60"
              rx="3"
              ry="5"
              fill="#4FC3F7"
              animate={{ y: [0, 15], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            />
            <motion.ellipse
              cx="78"
              cy="60"
              rx="3"
              ry="5"
              fill="#4FC3F7"
              animate={{ y: [0, 15], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}
