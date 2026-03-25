import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typed from "typed.js";
import ParticleGrid from "./ParticleGrid";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";

const LandingPage = () => {
  const typedRef = useRef(null);
  const typedInstanceRef = useRef(null);
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typedRef.current && !typedInstanceRef.current) {
        typedInstanceRef.current = new Typed(typedRef.current, {
          strings: ["Student", "Developer", "Software Engineer", "Learner", "Void"],
          typeSpeed: 70,
          backSpeed: 50,
          backDelay: 1200,
          startDelay: 200,
          loop: true,
          showCursor: true,
          cursorChar: "|",
        });
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const techBadges = ["Java", "Spring Boot", "Flutter", "React", "PostgreSQL"];

  return (
    <div ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-dark-950">
      {/* Interactive particle grid */}
      <ParticleGrid />

      {/* Animated gradient orbs with scroll parallax */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ scale: orbScale }}>
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter: "blur(80px)", top: "-15%", right: "-10%" }}
          animate={{ x: mousePos.x * 2.5, y: mousePos.y * 2.5 }}
          transition={{ type: "spring", damping: 30, stiffness: 80 }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)", filter: "blur(80px)", bottom: "5%", left: "-8%" }}
          animate={{ x: mousePos.x * -2, y: mousePos.y * -2 }}
          transition={{ type: "spring", damping: 30, stiffness: 80 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", filter: "blur(60px)", top: "35%", left: "25%" }}
          animate={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
          transition={{ type: "spring", damping: 30, stiffness: 80 }}
        />
      </motion.div>

      {/* Horizontal light sweep */}
      <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.08, 0] }} transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}>
        <div className="w-full h-full" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.15) 50%, transparent 100%)" }} />
      </motion.div>

      {/* Content with scroll parallax */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-0"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Main Heading with text scramble */}
        <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
          <span className="block">Hello, I&apos;m</span>
          <span className="block gradient-text animate-gradient-x mt-2">
            <TextScramble text="Subash Singh Dhami" />
          </span>
        </motion.h1>

        {/* Dynamic Role */}
        <motion.div variants={item} className="mb-8">
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-400 h-[1.3em]">
            <span ref={typedRef} className="text-violet-400 font-semibold" />
          </p>
          <motion.div
            className="w-20 h-[2px] bg-gradient-to-r from-violet-500 to-pink-500 mx-auto mt-4 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>

        {/* Description */}
        <motion.p variants={item} className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Full-stack developer passionate about building scalable applications
          and solving real-world problems with modern technologies.
        </motion.p>

        {/* Tech badges */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mb-12">
          {techBadges.map((tech, index) => (
            <motion.span
              key={tech}
              className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-sm text-gray-400 font-medium backdrop-blur-sm hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-300 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.08, duration: 0.4, ease: "backOut" }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Magnetic Action Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            href="#about"
            strength={0.25}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-full overflow-hidden shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 transition-shadow duration-500"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative flex items-center gap-2">
              Discover More
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </MagneticButton>

          <MagneticButton
            href="#hire-me"
            strength={0.25}
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-violet-400 border border-violet-500/30 rounded-full hover:bg-violet-500/10 hover:border-violet-400/60 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Hire Me
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </MagneticButton>

          <MagneticButton
            href="/assets/Subash_Singh_Dhami_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.25}
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-400 border border-white/[0.08] rounded-full hover:bg-white/[0.04] hover:text-white hover:border-white/[0.2] transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              View CV
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.a
          href="#about"
          className="block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center pt-2 hover:border-violet-500/30 transition-colors duration-300">
            <div className="w-1 h-2.5 bg-violet-400/60 rounded-full" />
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default LandingPage;
