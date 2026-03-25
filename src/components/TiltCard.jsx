import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltCard = ({ children, className = "", tiltStrength = 8 }) => {
  const ref = useRef(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 200, damping: 25 });
  const my = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(my, [-0.5, 0.5], [`${tiltStrength}deg`, `-${tiltStrength}deg`]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [`-${tiltStrength}deg`, `${tiltStrength}deg`]);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos - 0.5);
    y.set(yPos - 0.5);
    setSpotlightPos({ x: xPos * 100, y: yPos * 100 });
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Spotlight overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: `radial-gradient(350px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(139,92,246,0.08), transparent 60%)`,
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
