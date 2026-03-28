import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SectionHeading = ({ children, label, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-14 sm:mb-16">
      {label && (
        <p className="text-indigo text-xs font-medium uppercase tracking-[0.2em] mb-3">{label}</p>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
        {children}
      </h2>
      <motion.div
        className="h-[2px] bg-indigo mt-4 rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: 40 }}
      />
      {description && (
        <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
