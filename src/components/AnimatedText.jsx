import { motion } from 'framer-motion';

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  wordDelay = 0.15,
  as: Tag = 'h1',
}) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * wordDelay,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
