import { useEffect } from 'react';
import { fireConfetti } from '../utils/confetti';

export default function ConfettiTrigger({ fire = true }) {
  useEffect(() => {
    if (fire) {
      fireConfetti();
    }
  }, [fire]);

  return null;
}
