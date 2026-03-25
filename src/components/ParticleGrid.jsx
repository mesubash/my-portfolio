import { useEffect, useRef, useCallback } from "react";

const ParticleGrid = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const dotsRef = useRef([]);

  const SPACING = 28;
  const DOT_RADIUS = 1.2;
  const MOUSE_RADIUS = 120;
  const PUSH_FORCE = 30;
  const RETURN_SPEED = 0.06;
  const CONNECT_DISTANCE = 80;

  const init = useCallback((canvas) => {
    const cols = Math.ceil(canvas.width / SPACING) + 1;
    const rows = Math.ceil(canvas.height / SPACING) + 1;
    const dots = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          originX: i * SPACING,
          originY: j * SPACING,
          x: i * SPACING,
          y: j * SPACING,
          vx: 0,
          vy: 0,
        });
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

    // Update dots
    for (const dot of dotsRef.current) {
      const dx = mx - dot.x;
      const dy = my - dot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        const angle = Math.atan2(dy, dx);
        dot.vx -= Math.cos(angle) * force * PUSH_FORCE * 0.08;
        dot.vy -= Math.sin(angle) * force * PUSH_FORCE * 0.08;
      }

      // Spring back
      dot.vx += (dot.originX - dot.x) * RETURN_SPEED;
      dot.vy += (dot.originY - dot.y) * RETURN_SPEED;
      dot.vx *= 0.85;
      dot.vy *= 0.85;
      dot.x += dot.vx;
      dot.y += dot.vy;
    }

    // Draw connections between nearby displaced dots
    ctx.strokeStyle = "rgba(139,92,246,0.04)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < dotsRef.current.length; i++) {
      const a = dotsRef.current[i];
      const displacementA = Math.abs(a.x - a.originX) + Math.abs(a.y - a.originY);
      if (displacementA < 1) continue;

      for (let j = i + 1; j < dotsRef.current.length; j++) {
        const b = dotsRef.current[j];
        const ddx = a.x - b.x;
        const ddy = a.y - b.y;
        const d = ddx * ddx + ddy * ddy;
        if (d < CONNECT_DISTANCE * CONNECT_DISTANCE) {
          const displacementB = Math.abs(b.x - b.originX) + Math.abs(b.y - b.originY);
          if (displacementB < 1) continue;
          const alpha = Math.max(displacementA, displacementB) * 0.008;
          ctx.strokeStyle = `rgba(139,92,246,${Math.min(alpha, 0.08)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    for (const dot of dotsRef.current) {
      const displacement = Math.sqrt(
        (dot.x - dot.originX) ** 2 + (dot.y - dot.originY) ** 2
      );
      const distToMouse = Math.sqrt(
        (mx - dot.x) ** 2 + (my - dot.y) ** 2
      );

      // Size grows with displacement
      const size = DOT_RADIUS + displacement * 0.06;

      // Color shifts from gray to purple near cursor
      const proximity = Math.max(0, 1 - distToMouse / MOUSE_RADIUS);
      const r = Math.round(60 + proximity * 79);
      const g = Math.round(60 + proximity * 32);
      const b = Math.round(80 + proximity * 166);
      const alpha = 0.15 + proximity * 0.5 + displacement * 0.015;

      ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 0.7)})`;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
      ctx.fill();

      // Add glow to highly displaced dots
      if (displacement > 5) {
        ctx.fillStyle = `rgba(139,92,246,${displacement * 0.005})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      init(canvas);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [init, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleGrid;
