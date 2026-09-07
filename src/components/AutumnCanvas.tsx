import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  angle: number;
  rotationSpeed: number;
  isLeaf: boolean;
}

export function AutumnCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const autumnPalette = [
      '#e07a3f', // Autumn orange
      '#e8a038', // Golden ochre
      '#c2522b', // Deep terracotta
      '#f59e0b', // Glowing amber
      '#85994b', // Olive leaf
      '#d97706', // Warm amber
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Density of particles
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      particles = Array.from({ length: Math.min(count, 85) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: Math.sin(Math.random() * Math.PI) * 0.35,
        opacity: Math.random() * 0.6 + 0.2,
        color: autumnPalette[Math.floor(Math.random() * autumnPalette.length)],
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        isLeaf: Math.random() > 0.45,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.isLeaf) {
          // Draw a stylized delicate autumn leaf/ember petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.2, p.radius * 1.1, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw a soft glowing speck / star ember
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (!prefersReducedMotion) {
          p.y += p.speedY;
          p.x += Math.sin(p.y * 0.015) * 0.4 + p.speedX;
          p.angle += p.rotationSpeed;

          // Wrap around edges
          if (p.y > canvas.height + 10) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x > canvas.width + 10) p.x = -10;
          if (p.x < -10) p.x = canvas.width + 10;
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle radial glow in warm deep autumn hues */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(68, 32, 14, 0.45) 0%, rgba(20, 12, 7, 0.95) 75%)'
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-75" />
    </div>
  );
}
