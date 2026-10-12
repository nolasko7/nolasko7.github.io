import { useEffect, useRef } from 'react';

// Animated "infrastructure" network: nodes (services) linked by edges,
// with data packets travelling between them.
// - 3 depth layers with scroll parallax
// - the mouse gently attracts nearby nodes
// - clicking empty space sends a "ping" that propagates hop by hop
// - other components can trigger traffic via the `network:burst` event
// Full intensity on the hero, dimmed (fewer nodes, no idle packets) below it.
const LINK_DISTANCE = 150;
const MOUSE_DISTANCE = 190;
const ATTRACT_DISTANCE = 220;
const MIN_INTENSITY = 0.55;
const HOP_DELAY = 60;
const LAYERS = [0.4, 0.7, 1];

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    let width = 0;
    let height = 0;
    let nodes = [];
    let packets = [];
    let rings = [];
    let pingQueue = [];
    let pingLabel = null;
    let hasPinged = false;
    let edges = [];
    let adjacency = [];
    let active = [];
    let frameId = null;
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

      const maxNodes = isTouch ? 35 : 90;
      const count = Math.min(maxNodes, Math.floor((width * height) / 13000));
      nodes = Array.from({ length: count }, () => {
        const z = LAYERS[Math.floor(Math.random() * LAYERS.length)];
        const bvx = (Math.random() - 0.5) * 0.35 * (0.5 + 0.5 * z);
        const bvy = (Math.random() - 0.5) * 0.35 * (0.5 + 0.5 * z);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: bvx, vy: bvy, bvx, bvy,
          r: (Math.random() * 1.5 + 1) * (0.6 + 0.4 * z),
          z,
          pulse: 0,
          dx: 0, dy: 0,
        };
      });
      packets = [];
      pingQueue = [];
    };

    // Edges between nearby nodes of the same layer, using a spatial grid
    const buildEdges = () => {
      edges = [];
      adjacency = active.map(() => []);
      const grid = new Map();
      active.forEach((n, i) => {
        const key = `${Math.floor(n.dx / LINK_DISTANCE)},${Math.floor(n.dy / LINK_DISTANCE)}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(i);
      });
      active.forEach((a, i) => {
        const cx = Math.floor(a.dx / LINK_DISTANCE);
        const cy = Math.floor(a.dy / LINK_DISTANCE);
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            for (const j of grid.get(`${gx},${gy}`) || []) {
              if (j <= i) continue;
              const b = active[j];
              if (a.z !== b.z) continue;
              const dist = Math.hypot(a.dx - b.dx, a.dy - b.dy);
              if (dist < LINK_DISTANCE * (0.7 + 0.3 * a.z)) {
                edges.push([i, j, dist]);
                adjacency[i].push(j);
                adjacency[j].push(i);
              }
            }
          }
        }
      });
    };

    // Ping: BFS from the nearest node, each hop lights up a bit later
    const ping = (x, y, { showLabel = true } = {}) => {
      if (!active.length) return;
      let start = 0;
      let best = Infinity;
      active.forEach((n, i) => {
        const d = Math.hypot(n.dx - x, n.dy - y);
        if (d < best) { best = d; start = i; }
      });
      const now = performance.now();
      const hops = new Map([[start, 0]]);
      const queue = [start];
      while (queue.length) {
        const current = queue.shift();
        for (const next of adjacency[current]) {
          if (!hops.has(next)) {
            hops.set(next, hops.get(current) + 1);
            queue.push(next);
          }
        }
      }
      const startNode = active[start];
      hops.forEach((hop, i) => pingQueue.push({ node: active[i], at: now + hop * HOP_DELAY }));
      rings.push({ x: startNode.dx, y: startNode.dy, t0: now });

      if (showLabel && !hasPinged) {
        hasPinged = true;
        const maxHop = Math.max(...hops.values());
        const ip = `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        pingLabel = { x, y, text: `ping ${ip} — ${maxHop} hops`, t0: now };
      }
    };

    const spawnPacket = (burst = false) => {
      if (!edges.length) return;
      const [a, b] = edges[Math.floor(Math.random() * edges.length)];
      packets.push(Math.random() > 0.5 ? { a: active[a], b: active[b], t: 0, burst } : { a: active[b], b: active[a], t: 0, burst });
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      // 1 on the hero → MIN_INTENSITY after scrolling one viewport
      const scrollY = window.scrollY;
      const heroFactor = 1 - Math.min(1, scrollY / window.innerHeight);
      const intensity = MIN_INTENSITY + (1 - MIN_INTENSITY) * heroFactor;
      const activeCount = Math.round(nodes.length * (0.55 + 0.45 * heroFactor));
      active = nodes.slice(0, activeCount);

      // Move nodes: drift + mouse attraction + friction back to the drift
      for (const n of active) {
        if (!reducedMotion) {
          const distMouse = Math.hypot(n.dx - mouse.x, n.dy - mouse.y);
          if (distMouse < ATTRACT_DISTANCE && distMouse > 1) {
            const force = 0.025 * (1 - distMouse / ATTRACT_DISTANCE) * n.z;
            n.vx += ((mouse.x - n.dx) / distMouse) * force;
            n.vy += ((mouse.y - n.dy) / distMouse) * force;
          }
          n.vx += (n.bvx - n.vx) * 0.02;
          n.vy += (n.bvy - n.vy) * 0.02;
          const speed = Math.hypot(n.vx, n.vy);
          if (speed > 1.2) { n.vx *= 1.2 / speed; n.vy *= 1.2 / speed; }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) { n.vx *= -1; n.bvx *= -1; n.x = Math.max(0, Math.min(width, n.x)); }
          n.y = ((n.y % height) + height) % height;
        }
        // Parallax: each layer drifts with the scroll at its own speed
        n.dx = n.x;
        n.dy = (((n.y - scrollY * 0.05 * n.z) % height) + height) % height;
        n.pulse *= 0.95;
      }

      // Fire due ping hops
      pingQueue = pingQueue.filter((p) => {
        if (time < p.at) return true;
        p.node.pulse = 1;
        return false;
      });

      buildEdges();

      // Edges (brighter when both ends are pulsing)
      for (const [i, j, dist] of edges) {
        const a = active[i];
        const b = active[j];
        const pulse = Math.min(a.pulse, b.pulse);
        ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.25 * intensity * (0.4 + 0.6 * a.z) + pulse * 0.6;
        ctx.lineWidth = 1 + pulse;
        ctx.beginPath();
        ctx.moveTo(a.dx, a.dy);
        ctx.lineTo(b.dx, b.dy);
        ctx.stroke();
      }

      // Links to the mouse
      for (const n of active) {
        const dist = Math.hypot(n.dx - mouse.x, n.dy - mouse.y);
        if (dist < MOUSE_DISTANCE) {
          ctx.globalAlpha = (1 - dist / MOUSE_DISTANCE) * 0.6 * Math.max(intensity, 0.6) * (0.4 + 0.6 * n.z);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(n.dx, n.dy);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nodes (brighter near the mouse or when pulsing)
      for (const n of active) {
        const near = Math.hypot(n.dx - mouse.x, n.dy - mouse.y) < MOUSE_DISTANCE;
        const base = near ? 0.95 * Math.max(intensity, 0.6) : 0.5 * intensity;
        ctx.globalAlpha = Math.min(1, base * (0.4 + 0.6 * n.z) + n.pulse);
        if (n.pulse > 0.05) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 14 * n.pulse;
        }
        ctx.beginPath();
        ctx.arc(n.dx, n.dy, n.r + (near ? 1 : 0) + n.pulse * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Expanding rings from ping origins
      rings = rings.filter((ring) => {
        const age = (time - ring.t0) / 1000;
        if (age > 1.2) return false;
        ctx.globalAlpha = 0.5 * (1 - age / 1.2);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, 10 + age * 260, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

      // Data packets travelling along edges
      if (!reducedMotion) {
        if (heroFactor > 0.5 && time - lastSpawn > 250 && packets.length < 18) {
          spawnPacket();
          lastSpawn = time;
        }
        packets = packets.filter((p) => {
          p.t += p.burst ? 0.02 : 0.012;
          if (p.t >= 1 || Math.hypot(p.a.dx - p.b.dx, p.a.dy - p.b.dy) > LINK_DISTANCE * 1.2) return false;
          const x = p.a.dx + (p.b.dx - p.a.dx) * p.t;
          const y = p.a.dy + (p.b.dy - p.a.dy) * p.t;
          ctx.globalAlpha = p.burst ? 1 : heroFactor;
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          return true;
        });
      }

      // One-time ping label next to the click
      if (pingLabel) {
        const age = (time - pingLabel.t0) / 1000;
        if (age > 2) {
          pingLabel = null;
        } else {
          ctx.globalAlpha = age < 1.5 ? 0.9 : 0.9 * (1 - (age - 1.5) / 0.5);
          ctx.font = '11px "JetBrains Mono", monospace';
          ctx.fillText(pingLabel.text, pingLabel.x + 14, pingLabel.y - 12);
        }
      }

      ctx.globalAlpha = 1;
    };

    const loop = (time) => {
      draw(time);
      frameId = !reducedMotion ? requestAnimationFrame(loop) : null;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (reducedMotion) draw(performance.now());
    };
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const handleScroll = () => { if (reducedMotion) draw(performance.now()); };

    // Click on empty space → ping (ignore interactive elements and dialogs)
    const handleClick = (e) => {
      if (reducedMotion) return;
      if (e.target.closest('a, button, input, textarea, select, label, [role="dialog"], video, img')) return;
      ping(e.clientX, e.clientY);
    };

    // Traffic triggered by other components (terminal, pipeline)
    const handleBurst = (e) => {
      if (reducedMotion) return;
      if (e.detail?.type === 'wave') {
        ping(e.detail.x ?? width / 2, e.detail.y ?? height / 2, { showLabel: false });
      } else {
        for (let i = 0; i < 12; i++) spawnPacket(true);
      }
    };

    const resizeObserver = new ResizeObserver(() => { resize(); draw(performance.now()); });
    resizeObserver.observe(canvas);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('network:burst', handleBurst);
    document.addEventListener('mouseleave', handleMouseLeave);
    resize();
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('network:burst', handleBurst);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-screen w-full pointer-events-none -z-[1]"
    />
  );
};

export default NetworkBackground;
