import { useEffect, useRef, useCallback } from 'react';

type Sphere = {
  x: number; y: number; z: number;     // 3D coords on unit sphere
  projX: number; projY: number;          // 2D projected
  label: string;
  color: string;
  category: string;
  vTheta: number; vPhi: number;          // angular velocity
  scale: number;                          // depth scale (0.3 .. 1.3)
  hovered: boolean;
};

const SKILLS_3D = [
  // Frontend
  { label: 'React.js',   color: '#61DAFB', category: 'frontend' },
  { label: 'TypeScript', color: '#3178C6', category: 'frontend' },
  { label: 'Tailwind',   color: '#38BDF8', category: 'frontend' },
  { label: 'JavaScript', color: '#F7DF1E', category: 'frontend' },
  { label: 'HTML5',      color: '#E34F26', category: 'frontend' },
  { label: 'CSS3',       color: '#1572B6', category: 'frontend' },
  // Backend
  { label: 'Node.js',    color: '#68A063', category: 'backend' },
  { label: 'Express.js', color: '#C0C0C0', category: 'backend' },
  { label: 'Python',     color: '#FFD43B', category: 'backend' },
  { label: 'REST API',   color: '#A8B8D8', category: 'backend' },
  { label: 'PHP',        color: '#8892BF', category: 'backend' },
  // Database
  { label: 'MySQL',      color: '#00758F', category: 'database' },
  { label: 'WordPress',  color: '#21759B', category: 'database' },
  { label: 'WooCommerce',color: '#96588A', category: 'database' },
  // Tools
  { label: 'Git',        color: '#F05032', category: 'tools' },
  { label: 'GitHub',     color: '#9B7DD4', category: 'tools' },
  { label: 'Vite',       color: '#BD34FE', category: 'tools' },
  { label: 'GSAP',       color: '#88CE02', category: 'tools' },
  { label: 'Linux',      color: '#FCC624', category: 'tools' },
  { label: 'Postman',    color: '#FF6C37', category: 'tools' },
];

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#06b6d4',
  backend:  '#a78bfa',
  database: '#34d399',
  tools:    '#fb923c',
};

interface SkillSphere3DProps {
  activeFilter?: string;
}

export function SkillSphere3D({ activeFilter = 'all' }: SkillSphere3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const spheresRef = useRef<Sphere[]>([]);
  const dragRef   = useRef({ active: false, lastX: 0, lastY: 0 });
  const rotRef    = useRef({ theta: 0, phi: 0, vTheta: 0.003, vPhi: 0.0015 });
  const hoveredRef = useRef<number>(-1);

  const initSpheres = useCallback(() => {
    const count = SKILLS_3D.length;
    // Fibonacci sphere distribution for even coverage
    const golden = Math.PI * (3 - Math.sqrt(5));
    spheresRef.current = SKILLS_3D.map((item, i) => {
      const y  = 1 - (i / (count - 1)) * 2;
      const r  = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return {
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        projX: 0, projY: 0,
        label: item.label,
        color: item.color,
        category: item.category,
        vTheta: 0, vPhi: 0,
        scale: 1,
        hovered: false,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    initSpheres();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Mouse / Touch ----
    const getPos = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseDown = (e: MouseEvent) => {
      dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
      rotRef.current.vTheta = 0; rotRef.current.vPhi = 0;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (dragRef.current.active) {
        const dx = e.clientX - dragRef.current.lastX;
        const dy = e.clientY - dragRef.current.lastY;
        rotRef.current.theta += dx * 0.007;
        rotRef.current.phi   += dy * 0.007;
        rotRef.current.vTheta = dx * 0.004;
        rotRef.current.vPhi  = dy * 0.003;
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastY = e.clientY;
      }
      // Hover detection
      const pos = getPos(e);
      let found = -1;
      spheresRef.current.forEach((s, idx) => {
        const dx = s.projX - pos.x;
        const dy = s.projY - pos.y;
        const r  = Math.max(22, 40 * s.scale);
        if (Math.hypot(dx, dy) < r) found = idx;
      });
      hoveredRef.current = found;
      canvas.style.cursor = found >= 0 ? 'pointer' : 'grab';
    };
    const onMouseUp = () => { dragRef.current.active = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', resize, { passive: true });

    // ---- Render ----
    const project = (sphere: Sphere): { px: number; py: number; pz: number } => {
      const cosT = Math.cos(rotRef.current.theta);
      const sinT = Math.sin(rotRef.current.theta);
      const cosP = Math.cos(rotRef.current.phi);
      const sinP = Math.sin(rotRef.current.phi);

      // Rotate around Y (theta) then X (phi)
      const x1 = sphere.x * cosT - sphere.z * sinT;
      const z1 = sphere.x * sinT + sphere.z * cosT;
      const y1 = sphere.y * cosP - z1  * sinP;
      const z2 = sphere.y * sinP + z1  * cosP;

      const fov = W < 500 ? 380 : 550;
      const sc  = fov / (fov + z2 * 160);
      const radius = Math.min(W, H) * 0.38;
      return { px: W / 2 + x1 * radius * sc, py: H / 2 + y1 * radius * sc, pz: z2 };
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Rotating orbit rings (faint)
      ctx.save();
      ctx.translate(W / 2, H / 2);
      const ringR = Math.min(W, H) * 0.39;
      [0.6, 1.0].forEach((fr, ri) => {
        ctx.beginPath();
        ctx.ellipse(0, 0, ringR * fr, ringR * fr * 0.35, ri * 0.8 + rotRef.current.theta * 0.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6,182,212,${0.05 + ri * 0.04})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      ctx.restore();

      // Auto-rotate (inertia)
      if (!dragRef.current.active && !prefersReduced) {
        rotRef.current.theta += rotRef.current.vTheta;
        rotRef.current.phi   += rotRef.current.vPhi;
        rotRef.current.vTheta *= 0.98;
        rotRef.current.vPhi  *= 0.98;
        rotRef.current.vTheta += 0.003 * (1 - Math.abs(rotRef.current.vTheta) / 0.03);
      }

      // Project all
      const projected = spheresRef.current.map((s, idx) => {
        const { px, py, pz } = project(s);
        s.projX = px; s.projY = py;
        const sc = 0.45 + ((pz + 1) / 2) * 0.85;
        s.scale = sc;
        s.hovered = hoveredRef.current === idx;
        return { s, idx, pz };
      });

      // Sort back-to-front
      projected.sort((a, b) => a.pz - b.pz);

      // Filter dimming
      projected.forEach(({ s }) => {
        const visible = activeFilter === 'all' || s.category === activeFilter;
        const alpha  = visible ? 1 : 0.12;
        const r      = Math.max(18, 38 * s.scale);
        const catColor = CATEGORY_COLORS[s.category] || '#ffffff';
        const glowColor = s.hovered ? s.color : catColor;

        // Glow halo
        if (visible) {
          const halo = ctx.createRadialGradient(s.projX, s.projY, r * 0.3, s.projX, s.projY, r * 2.2);
          halo.addColorStop(0, `${glowColor}30`);
          halo.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(s.projX, s.projY, r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }

        // 3D sphere body — radial gradient simulating light from top-left
        const grad = ctx.createRadialGradient(
          s.projX - r * 0.35, s.projY - r * 0.35, r * 0.05,
          s.projX, s.projY, r
        );
        grad.addColorStop(0, `${s.color}CC`);
        grad.addColorStop(0.55, `${s.color}55`);
        grad.addColorStop(1, `${s.color}08`);

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.projX, s.projY, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Border
        ctx.beginPath();
        ctx.arc(s.projX, s.projY, r, 0, Math.PI * 2);
        ctx.strokeStyle = s.hovered ? s.color : `${s.color}80`;
        ctx.lineWidth = s.hovered ? 2 : 1;
        ctx.stroke();

        // Specular highlight
        const spec = ctx.createRadialGradient(
          s.projX - r * 0.3, s.projY - r * 0.35, 0,
          s.projX - r * 0.2, s.projY - r * 0.3, r * 0.45
        );
        spec.addColorStop(0, 'rgba(255,255,255,0.45)');
        spec.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(s.projX, s.projY, r, 0, Math.PI * 2);
        ctx.fillStyle = spec;
        ctx.fill();

        // Label
        if (s.scale > 0.55 || s.hovered) {
          const fontSize = s.hovered ? Math.max(10, 11 * s.scale) : Math.max(8, 9 * s.scale);
          ctx.font = `${s.hovered ? 'bold ' : ''}${fontSize}px 'DM Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = s.hovered ? '#ffffff' : `${s.color}EE`;
          ctx.globalAlpha = alpha * (0.6 + s.scale * 0.5);
          ctx.fillText(s.label, s.projX, s.projY);
        }

        ctx.globalAlpha = 1;
      });

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', resize);
    };
  }, [initSpheres, activeFilter]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: 'grab' }}
        aria-label="Interactive 3D skill sphere — drag to rotate"
        role="img"
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-zinc-500 pointer-events-none">
        DRAG TO ROTATE · HOVER FOR DETAILS
      </div>
    </div>
  );
}

