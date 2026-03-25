import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MagneticButton = ({ children, className = "", href, onClick, download, target, rel, as = "a", strength = 0.3 }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const Tag = as === "button" ? motion.button : motion.a;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      download={download}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15, mass: 0.5 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
