import { useEffect, useRef } from 'react';

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label: string;
  color: string;
  alpha: number;
};

const TECH_ITEMS = [
  { label: 'React.js', color: '#61DAFB' },
  { label: 'JavaScript', color: '#F7DF1E' },
  { label: 'Python', color: '#3776AB' },
  { label: 'Node.js', color: '#68A063' },
  { label: 'Express.js', color: '#FFFFFF' },
  { label: 'MySQL', color: '#00758F' },
  { label: 'PHP', color: '#8892BF' },
  { label: 'WordPress', color: '#21759B' },
  { label: 'Tailwind', color: '#38BDF8' },
  { label: 'HTML5', color: '#E34F26' },
  { label: 'CSS3', color: '#1572B6' },
  { label: 'Git', color: '#F05032' },
  { label: 'REST API', color: '#A8B8C8' },
  { label: 'TypeScript', color: '#3178C6' },
  { label: 'NumPy', color: '#4DABCF' },
  { label: 'Pandas', color: '#130654' },
  { label: 'Java', color: '#E8821E' },
  { label: 'Linux', color: '#FCC624' },
  { label: 'WooCommerce', color: '#96588A' },
  { label: 'GSAP', color: '#88CE02' },
];

export function TechStackPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    // Mouse tracking
    const mouse = { x: -9999, y: -9999 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize, { passive: true });

    // Determine ball radius by canvas width
    const getR = () => W < 500 ? 28 : W < 800 ? 34 : 42;

    // Init balls
    let balls: Ball[] = [];

    const initBalls = () => {
      const r = getR();
      balls = TECH_ITEMS.map((t) => ({
        x: r + Math.random() * Math.max(0, W - r * 2),
        y: r + Math.random() * Math.max(0, H - r * 2),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.0,
        r,
        label: t.label,
        color: t.color,
        alpha: 0.92,
      }));
    };

    initBalls();

    // Resolve ball-to-ball collisions
    const resolveCollisions = () => {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const dx = balls[j].x - balls[i].x;
          const dy = balls[j].y - balls[i].y;
          const dist = Math.hypot(dx, dy);
          const minDist = balls[i].r + balls[j].r;

          if (dist < minDist && dist > 0) {
            // Push apart
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            balls[i].x -= nx * overlap;
            balls[i].y -= ny * overlap;
            balls[j].x += nx * overlap;
            balls[j].y += ny * overlap;

            // Elastic velocity exchange
            const dvx = balls[i].vx - balls[j].vx;
            const dvy = balls[i].vy - balls[j].vy;
            const dot = dvx * nx + dvy * ny;

            if (dot > 0) {
              balls[i].vx -= dot * nx;
              balls[i].vy -= dot * ny;
              balls[j].vx += dot * nx;
              balls[j].vy += dot * ny;
            }
          }
        }
      }
    };

    const MAX_SPEED = 2.2;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      const r = getR();

      for (const b of balls) {
        // Mouse repulsion
        const mdx = b.x - mouse.x;
        const mdy = b.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        const repelRange = r * 5;

        if (mdist < repelRange && mdist > 0) {
          const force = ((repelRange - mdist) / repelRange) * 3.2;
          b.vx += (mdx / mdist) * force;
          b.vy += (mdy / mdist) * force;
        }

        // Speed cap + gentle friction
        const speed = Math.hypot(b.vx, b.vy);
        if (speed > MAX_SPEED) {
          b.vx = (b.vx / speed) * MAX_SPEED;
          b.vy = (b.vy / speed) * MAX_SPEED;
        }
        b.vx *= 0.994;
        b.vy *= 0.994;

        // Move
        if (!prefersReduced) {
          b.x += b.vx;
          b.y += b.vy;
        }

        // Wall bounce
        if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx); }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx); }
        if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy); }
        if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy); }

        // Draw ball
        const grd = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
        grd.addColorStop(0, `${b.color}55`);
        grd.addColorStop(1, `${b.color}08`);

        // Outer glow
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r + 6, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color}12`;
        ctx.fill();

        // Ball body
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Border ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${b.color}70`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Text label
        ctx.fillStyle = b.color;
        ctx.font = `bold ${b.r < 35 ? 9 : 10}px 'DM Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, b.x, b.y);
      }

      resolveCollisions();
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      aria-label="Interactive tech stack physics canvas"
      role="img"
    />
  );
}
