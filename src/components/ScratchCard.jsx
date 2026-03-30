import { useRef, useEffect, useState, useCallback } from 'react';

export default function ScratchCard({
  width = 300,
  height = 200,
  coverColor = '#FF6B9D',
  coverText = 'GRATTE ICI! 🎁',
  revealThreshold = 50,
  onReveal,
  children,
}) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Draw cover
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, coverColor);
    gradient.addColorStop(0.5, '#FFD93D');
    gradient.addColorStop(1, coverColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add sparkle pattern
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 8 + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${Math.min(width, height) * 0.12}px Fredoka, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(coverText, width / 2, height / 2);
  }, [width, height, coverColor, coverText]);

  const getPercentScratched = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    return (transparent / (pixels.length / 4)) * 100;
  }, [width, height]);

  const scratch = useCallback(
    (x, y) => {
      const canvas = canvasRef.current;
      if (!canvas || revealed) return;
      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();

      // Draw line from last position for smooth scratching
      if (lastPos.current) {
        ctx.lineWidth = 50;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      lastPos.current = { x, y };

      const percent = getPercentScratched();
      if (percent > revealThreshold) {
        setRevealed(true);
        onReveal?.();
      }
    },
    [revealed, revealThreshold, onReveal, getPercentScratched]
  );

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches?.[0] || e;
    return {
      x: (touch.clientX - rect.left) * (width / rect.width),
      y: (touch.clientY - rect.top) * (height / rect.height),
    };
  };

  const handleStart = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  };

  const handleMove = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  return (
    <div
      className="relative inline-block rounded-2xl overflow-hidden"
      style={{ width, height, boxShadow: '0 8px 30px rgba(255, 107, 157, 0.3)' }}
    >
      {/* Reveal content underneath */}
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        {children}
      </div>

      {/* Scratch canvas on top */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="absolute inset-0 cursor-pointer"
          style={{ touchAction: 'none', width: '100%', height: '100%' }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      )}
    </div>
  );
}
