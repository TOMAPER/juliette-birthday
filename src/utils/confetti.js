import confetti from 'canvas-confetti';

export function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF6B9D', '#FFD93D', '#FF8C42', '#6BCB77', '#4FC3F7', '#BA68C8'],
  });
}

export function fireConfettiBurst() {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FF6B9D', '#FFD93D', '#FF8C42', '#6BCB77'],
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#4FC3F7', '#BA68C8', '#FFD93D', '#FF6B9D'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function fireMassiveConfetti() {
  const duration = 4000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 12,
      angle: 60,
      spread: 80,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#FF6B9D', '#FFD93D', '#FF8C42', '#6BCB77', '#4FC3F7', '#BA68C8'],
    });
    confetti({
      particleCount: 12,
      angle: 120,
      spread: 80,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#FF6B9D', '#FFD93D', '#FF8C42', '#6BCB77', '#4FC3F7', '#BA68C8'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
