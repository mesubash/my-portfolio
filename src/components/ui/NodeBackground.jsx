import { useEffect, useRef, useCallback } from "react";

const SPACING = 32;
const DOT_R = 1;
const MOUSE_R = 130;
const PUSH = 25;
const CONNECT_DIST = 70;
const RETURN_SPEED = 0.055;

const NodeBackground = () => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  const init = useCallback((w, h) => {
    const dots = [];
    const cols = Math.ceil(w / SPACING) + 1;
    const rows = Math.ceil(h / SPACING) + 1;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        dots.push({ ox: c * SPACING, oy: r * SPACING, x: c * SPACING, y: r * SPACING, vx: 0, vy: 0 });
      }
    }
    dotsRef.current = dots;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dots = dotsRef.current;

    // Physics
    for (const d of dots) {
      const dx = mx - d.x, dy = my - d.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_R && dist > 0) {
        const f = (MOUSE_R - dist) / MOUSE_R;
        d.vx -= (dx / dist) * f * PUSH * 0.06;
        d.vy -= (dy / dist) * f * PUSH * 0.06;
      }
      d.vx += (d.ox - d.x) * RETURN_SPEED;
      d.vy += (d.oy - d.y) * RETURN_SPEED;
      d.vx *= 0.82;
      d.vy *= 0.82;
      d.x += d.vx;
      d.y += d.vy;
    }

    // Connections between displaced neighbors
    ctx.lineWidth = 0.5;
    for (let i = 0; i < dots.length; i++) {
      const a = dots[i];
      const da = Math.abs(a.x - a.ox) + Math.abs(a.y - a.oy);
      if (da < 0.5) continue;
      for (let j = i + 1; j < dots.length; j++) {
        const b = dots[j];
        const ddx = a.x - b.x, ddy = a.y - b.y;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 > CONNECT_DIST * CONNECT_DIST) continue;
        const db = Math.abs(b.x - b.ox) + Math.abs(b.y - b.oy);
        if (db < 0.5) continue;
        const alpha = Math.max(da, db) * 0.012;
        ctx.strokeStyle = `rgba(99,102,241,${Math.min(alpha, 0.12)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // Dots
    for (const d of dots) {
      const disp = Math.sqrt((d.x - d.ox) ** 2 + (d.y - d.oy) ** 2);
      const dm = Math.sqrt((mx - d.x) ** 2 + (my - d.y) ** 2);
      const near = Math.max(0, 1 - dm / MOUSE_R);
      const size = DOT_R + disp * 0.05 + near * 1;
      const alpha = 0.08 + near * 0.35 + disp * 0.01;

      const r = Math.round(80 + near * 19);
      const g = Math.round(80 + near * 22);
      const b = Math.round(100 + near * 141);

      ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 0.5)})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width = p.offsetWidth;
      canvas.height = p.offsetHeight;
      init(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    canvas.parentElement?.addEventListener("mousemove", onMove);
    canvas.parentElement?.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [init, animate]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

export default NodeBackground;
