import React, { useEffect, useRef } from 'react';

interface RoyalAmbientParticlesProps {
  particleCount?: number;
  className?: string;
}

export const RoyalAmbientParticles: React.FC<RoyalAmbientParticlesProps> = ({
  particleCount = 28,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle golden palace embers
    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      alpha: number;
      alphaSpeed: number;
      baseColor: string;
    }

    const goldColors = ['212, 175, 55', '197, 160, 89', '244, 232, 209', '185, 149, 96'];

    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.6,
      speedY: -(Math.random() * 0.35 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      alphaSpeed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      baseColor: goldColors[Math.floor(Math.random() * goldColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.15 || p.alpha >= 0.75) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Reset if drifted beyond top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.baseColor}, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
