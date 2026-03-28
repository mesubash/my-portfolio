import { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NodeBackground from "../ui/NodeBackground";

const NodeGraph = lazy(() => import("../three/NodeGraph"));

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const graphScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const graphOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 overflow-hidden">
      <NodeBackground />

      {/* 3D Morphing Sphere */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: graphScale, opacity: graphOpacity }}>
        <Suspense fallback={null}>
          <NodeGraph />
        </Suspense>
      </motion.div>

      {/* Mobile fallback glow (visible only when 3D and canvas don't render) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo/[0.06] rounded-full blur-[100px] pointer-events-none md:hidden" />

      {/* Vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,#07080c_72%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[1] pointer-events-none bg-gradient-to-t from-[#07080c] to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto pt-20 sm:pt-0"
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Role — clean, no blinking dot */}
        <motion.p variants={fadeUp} className="text-indigo-light text-xs font-semibold uppercase tracking-[0.25em] mb-6">
          Software Engineer
        </motion.p>

        {/* Name */}
        <motion.h1 variants={fadeUp} className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight">
          Subash Singh Dhami
        </motion.h1>

        {/* Description */}
        <motion.p variants={fadeUp} className="mt-7 text-slate-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
          Architecting scalable backend systems, cross-platform mobile apps, and modern web platforms.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-indigo rounded-lg overflow-hidden shadow-xl shadow-indigo/25 hover:shadow-indigo/40 transition-all duration-300 hover:-translate-y-[2px]"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative">View Work</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-slate-300 border border-white/[0.1] rounded-lg hover:border-white/[0.2] hover:text-white hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-[2px]"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-5 text-center">
          <a
            href="assets/Subash_Singh_Dhami_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-light transition-colors duration-300"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            View Resume
          </a>
        </motion.div>

        {/* Tech tags */}
        <motion.div variants={fadeUp} className="mt-14 flex flex-wrap justify-center gap-2">
          {["Spring Boot", "Flutter", "React", "PostgreSQL", "Docker", "AWS"].map((tech) => (
            <span key={tech} className="px-3 py-1 text-[11px] text-slate-500 bg-white/[0.02] border border-white/[0.05] rounded-md hover:border-white/[0.1] hover:text-slate-400 transition-all duration-300 cursor-default">
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-7 h-11 rounded-full border border-white/[0.08] flex items-start justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-0.5 h-2 rounded-full bg-indigo/50" />
        </motion.div>
      </motion.a>
    </div>
  );
};

export default Hero;
