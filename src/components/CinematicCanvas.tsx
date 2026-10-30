import { useEffect, useRef } from 'react';

export function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    // Data pipeline stack layers
    const LAYERS = [
      { name: 'UI / Client', color: '#61dafb', glow: 'rgba(97, 218, 251, 0.9)' },
      { name: 'API Gateway', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.9)' },
      { name: 'Microservices', color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.9)' },
      { name: 'Cache / Redis', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.9)' },
      { name: 'Database Cluster', color: '#10b981', glow: 'rgba(16, 185, 129, 0.9)' },
      { name: 'AI / Telemetry', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.9)' },
      { name: 'Cloud Pipelines', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.9)' },
    ];

    const nodeCount = width < 768 ? 40 : 80;

    type PipelineNode = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      layer: string;
      color: string;
      glowColor: string;
      pulse: number;
      pulseSpeed: number;
    };

    type DataBeam = {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      trailLength: number;
      color: string;
      glowColor: string;
    };

    const nodes: PipelineNode[] = Array.from({ length: nodeCount }, () => {
      const layer = LAYERS[Math.floor(Math.random() * LAYERS.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2.2 + 1.2,
        layer: layer.name,
        color: layer.color,
        glowColor: layer.glow,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    });

    // Generate traveling data beams connecting services
    const beamCount = Math.floor(nodeCount * 0.75);
    const beams: DataBeam[] = Array.from({ length: beamCount }, () => {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (from + 1) % nodes.length;
      return {
        fromIndex: from,
        toIndex: to,
        progress: Math.random(),
        speed: Math.random() * 0.009 + 0.005,
        trailLength: 0.18 + Math.random() * 0.12,
        color: nodes[from].color,
        glowColor: nodes[from].glowColor,
      };
    });

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize, { passive: true });

    let rafId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Cursor interactive aura
      if (mouse.active) {
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320);
        aura.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
        aura.addColorStop(0.4, 'rgba(139, 92, 246, 0.05)');
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
      }

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Mouse gentle repulsion
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 0) {
            const force = (1 - dist / 180) * 0.7;
            node.x -= (dx / dist) * force;
            node.y -= (dy / dist) * force;
          }
        }

        // Screen boundary bounce/wrap
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
      }

      // Draw connection conduits (every layer of the stack connected)
      const maxDist = width < 768 ? 120 : 155;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Dual tone gradient conduit line
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `${nodes[i].color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
            grad.addColorStop(1, `${nodes[j].color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw traveling animated data beams (laser pulses with comet tails)
      for (const beam of beams) {
        beam.progress += beam.speed;
        if (beam.progress >= 1) {
          beam.progress = 0;
          beam.fromIndex = Math.floor(Math.random() * nodes.length);
          beam.toIndex = (beam.fromIndex + Math.floor(Math.random() * 6) + 1) % nodes.length;
          beam.color = nodes[beam.fromIndex].color;
          beam.glowColor = nodes[beam.fromIndex].glowColor;
        }

        const p1 = nodes[beam.fromIndex];
        const p2 = nodes[beam.toIndex];
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

        if (dist < 260) {
          // Head position
          const hx = p1.x + (p2.x - p1.x) * beam.progress;
          const hy = p1.y + (p2.y - p1.y) * beam.progress;

          // Tail position
          const tailProg = Math.max(0, beam.progress - beam.trailLength);
          const tx = p1.x + (p2.x - p1.x) * tailProg;
          const ty = p1.y + (p2.y - p1.y) * tailProg;

          // Comet tail
          const beamGrad = ctx.createLinearGradient(tx, ty, hx, hy);
          beamGrad.addColorStop(0, 'transparent');
          beamGrad.addColorStop(1, beam.color);

          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.strokeStyle = beamGrad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Laser head pulse with glowing halo
          ctx.beginPath();
          ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = beam.glowColor;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Render connected service nodes with breathing glow
      for (const node of nodes) {
        const pulseFactor = 0.8 + 0.35 * Math.sin(node.pulse);
        const radius = node.size * pulseFactor;

        // Ambient outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}15`;
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.glowColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-85"
      aria-hidden="true"
    />
  );
}
