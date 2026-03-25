import { useEffect, useRef, useCallback } from "react";

const MAX_POINTS = 120;
const TRAIL_FADE_SPEED = 0.012;

const MouseFollower = () => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const isVisibleRef = useRef(false);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    if (isVisibleRef.current && mx > 0 && my > 0) {
      pointsRef.current.push({ x: mx, y: my, life: 1 });
    }

    pointsRef.current = pointsRef.current.filter((p) => {
      p.life -= TRAIL_FADE_SPEED;
      return p.life > 0;
    });

    if (pointsRef.current.length > MAX_POINTS) {
      pointsRef.current = pointsRef.current.slice(-MAX_POINTS);
    }

    const pts = pointsRef.current;
    if (pts.length < 3) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    // Outer glow - wide, soft
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const t = i / pts.length;
      const alpha = curr.life * t * 0.12;
      const width = t * 28 + 4;

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    // Core ribbon
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const t = i / pts.length;
      const alpha = curr.life * t * 0.6;
      const width = t * 10 + 1.5;

      const r = Math.round(139 + t * 97);
      const g = Math.round(92 - t * 20);
      const b = Math.round(246 - t * 93);

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    // Bright inner core
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const t = i / pts.length;
      const alpha = curr.life * t * 0.85;
      const width = t * 3.5 + 0.5;

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.strokeStyle = `rgba(220, 200, 255, ${alpha})`;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    // Head glow
    if (pts.length > 0) {
      const head = pts[pts.length - 1];
      const g1 = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 40);
      g1.addColorStop(0, `rgba(139, 92, 246, ${head.life * 0.2})`);
      g1.addColorStop(0.5, `rgba(139, 92, 246, ${head.life * 0.06})`);
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(200, 180, 255, ${head.life * 0.5})`;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) isVisibleRef.current = true;
    };
    const handleLeave = () => { isVisibleRef.current = false; };
    const handleEnter = () => { isVisibleRef.current = true; };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

export default MouseFollower;
