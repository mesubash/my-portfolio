import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const initial = {
    opacity: 0,
    filter: "blur(4px)",
    ...(direction === "up" && { y: 30 }),
    ...(direction === "down" && { y: -30 }),
    ...(direction === "left" && { x: 40 }),
    ...(direction === "right" && { x: -40 }),
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" } : initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
