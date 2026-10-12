import { useEffect, useRef } from 'react';

// Animated "infrastructure" network: nodes (services) linked by edges,
// with data packets travelling between them. Reacts to the mouse.
const LINK_DISTANCE = 150;
const MOUSE_DISTANCE = 190;

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes = [];
    let packets = [];
    let frameId = null;
    let isVisible = true;
    let lastSpawn = 0;
    const mouse = { x: -9999, y: -9999 };

    const readColor = () => getComputedStyle(document.documentElement).getPropertyValue('--app-primary').trim() || '#4ade80';
    let color = readColor();
    const themeObserver = new MutationObserver(() => { color = readColor(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((width * height) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 1,
      }));
      packets = [];
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      // Move nodes
      if (!reducedMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      // Edges between nearby nodes
      const edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            edges.push([i, j]);
            ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.25;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Links to the mouse
      for (const n of nodes) {
        const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (dist < MOUSE_DISTANCE) {
          ctx.globalAlpha = (1 - dist / MOUSE_DISTANCE) * 0.6;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nodes (brighter near the mouse)
      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < MOUSE_DISTANCE;
        ctx.globalAlpha = near ? 0.95 : 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 1 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Data packets travelling along edges
      if (!reducedMotion) {
        if (time - lastSpawn > 250 && edges.length && packets.length < 18) {
          const [a, b] = edges[Math.floor(Math.random() * edges.length)];
          packets.push(Math.random() > 0.5 ? { a, b, t: 0 } : { a: b, b: a, t: 0 });
          lastSpawn = time;
        }
        packets = packets.filter((p) => {
          const a = nodes[p.a];
          const b = nodes[p.b];
          p.t += 0.012;
          if (p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK_DISTANCE * 1.2) return false;
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          ctx.globalAlpha = 1;
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          return true;
        });
      }

      ctx.globalAlpha = 1;
    };

    const loop = (time) => {
      draw(time);
      frameId = isVisible && !reducedMotion ? requestAnimationFrame(loop) : null;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (reducedMotion) draw(performance.now());
    };
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    // Pause the animation when the hero is off-screen
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !frameId && !reducedMotion) frameId = requestAnimationFrame(loop);
    });
    visibilityObserver.observe(canvas);

    const resizeObserver = new ResizeObserver(() => { resize(); draw(performance.now()); });
    resizeObserver.observe(canvas);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    resize();
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-screen w-full pointer-events-none -z-[1]"
      style={{
        maskImage: 'linear-gradient(to bottom, black 55%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent)',
      }}
    />
  );
};

export default NetworkBackground;
