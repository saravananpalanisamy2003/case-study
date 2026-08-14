import { useEffect, useRef, useState } from 'react';

type Splat = {
  x: number;
  y: number;
  radius: number;
  life: number;
  hue: number;
};

const COLORS = [
  { r: 255, g: 102, b: 0 },
  { r: 255, g: 60, b: 0 },
  { r: 255, g: 180, b: 80 },
  { r: 255, g: 255, b: 255 },
];

function isFinePointer() {
  return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
}

export function FluidCursor() {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splatsRef = useRef<Splat[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef<number>(0);
  const colorIndexRef = useRef(0);

  useEffect(() => {
    setEnabled(isFinePointer());
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    document.documentElement.classList.add('custom-cursor-active');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addSplat = (x: number, y: number, force: number) => {
      const count = Math.min(3, 1 + Math.floor(force / 8));
      for (let i = 0; i < count; i += 1) {
        colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length;
        splatsRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          radius: 8 + force * 0.15 + Math.random() * 6,
          life: 1,
          hue: colorIndexRef.current,
        });
      }
      if (splatsRef.current.length > 120) {
        splatsRef.current.splice(0, splatsRef.current.length - 120);
      }
    };

    const onMove = (event: PointerEvent) => {
      const prev = mouseRef.current;
      mouseRef.current = { x: event.clientX, y: event.clientY, active: true };
      const dx = event.clientX - (prev.x || event.clientX);
      const dy = event.clientY - (prev.y || event.clientY);
      addSplat(event.clientX, event.clientY, Math.min(40, Math.hypot(dx, dy)));
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      splatsRef.current = splatsRef.current.filter((splat) => splat.life > 0.02);

      for (const splat of splatsRef.current) {
        const color = COLORS[splat.hue % COLORS.length];
        const alpha = splat.life * 0.55;
        const gradient = ctx.createRadialGradient(
          splat.x,
          splat.y,
          0,
          splat.x,
          splat.y,
          splat.radius * (2 - splat.life * 0.5),
        );
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
        gradient.addColorStop(0.45, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.35})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(splat.x, splat.y, splat.radius * (1.6 - splat.life * 0.3), 0, Math.PI * 2);
        ctx.fill();

        splat.life -= 0.018;
        splat.radius += 0.35;
      }

      if (mouseRef.current.active) {
        const { x, y } = mouseRef.current;
        const pulse = 6 + Math.sin(Date.now() * 0.008) * 2;
        const dot = ctx.createRadialGradient(x, y, 0, x, y, pulse * 2);
        dot.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        dot.addColorStop(0.35, 'rgba(255, 102, 0, 0.75)');
        dot.addColorStop(1, 'rgba(255, 102, 0, 0)');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = dot;
        ctx.beginPath();
        ctx.arc(x, y, pulse * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fluid-cursor-root" aria-hidden="true">
      <canvas ref={canvasRef} className="fluid-cursor-canvas" />
    </div>
  );
}
