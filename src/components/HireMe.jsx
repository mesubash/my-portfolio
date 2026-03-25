import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const AnimatedCounter = ({ target, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target);
    const dur = 1500;
    const steps = 30;
    const inc = num / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{count}{suffix}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
};

/* Animated SVG icons that draw on hover */
const AnimatedIcon = ({ children, className }) => (
  <motion.div
    className={className}
    whileHover={{ scale: 1.15, rotate: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </motion.div>
);

const services = [
  {
    icon: (
      <>
        <motion.path strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} viewport={{ once: true }} />
        <motion.circle cx="17" cy="8" r="0.5" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }} />
        <motion.circle cx="17" cy="16" r="0.5" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1 }} viewport={{ once: true }} />
      </>
    ),
    title: "Backend Development",
    desc: "Spring Boot, APIs, Microservices",
    iconBoxClass: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  },
  {
    icon: (
      <>
        <motion.path strokeWidth={1.5} d="M10 20l4-16" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
        <motion.path strokeWidth={1.5} d="M14 8l4 4-4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }} />
        <motion.path strokeWidth={1.5} d="M6 16l-4-4 4-4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }} />
      </>
    ),
    title: "Full-Stack Web",
    desc: "React, Next.js, End-to-end solutions",
    iconBoxClass: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  {
    icon: (
      <>
        <motion.rect x="6" y="3" width="12" height="18" rx="2" strokeWidth={1.5} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2 }} viewport={{ once: true }} />
        <motion.circle cx="12" cy="18" r="0.5" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1 }} viewport={{ once: true }} />
      </>
    ),
    title: "Mobile Apps",
    desc: "Flutter, Cross-platform development",
    iconBoxClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    icon: (
      <>
        <motion.path strokeWidth={1.5} d="M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} viewport={{ once: true }} />
      </>
    ),
    title: "System Architecture",
    desc: "Scalable solutions, DevOps",
    iconBoxClass: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  },
];

const availability = [
  { dotClass: "bg-emerald-400", pingClass: "bg-emerald-400", text: "Available for new opportunities" },
  { dotClass: "bg-violet-500", pingClass: "bg-violet-500", text: "Open to internships & freelance work" },
  { dotClass: "bg-blue-500", pingClass: "bg-blue-500", text: "Remote & on-site collaboration" },
];

const HireMe = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-padding bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-600/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-cyan-600/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            I&apos;m currently <span className="text-violet-400 font-medium">open to opportunities</span> in
            backend development, full-stack projects, mobile app development, and exciting tech collaborations.
          </p>
        </motion.div>

        {/* Service Cards with animated SVG icons and tilt */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
          initial="hidden" animate={isInView ? "show" : "hidden"}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <TiltCard tiltStrength={8}>
                <div className="glass-card-hover p-6 text-center group h-full">
                  <AnimatedIcon className={`w-14 h-14 rounded-xl ${service.iconBoxClass} border flex items-center justify-center mx-auto mb-4`}>
                    {service.icon}
                  </AnimatedIcon>
                  <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm">{service.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Availability CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
          <TiltCard tiltStrength={3}>
            <div className="glass-card-hover p-8 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h3>
                  <div className="space-y-4">
                    {availability.map(({ dotClass, pingClass, text }) => (
                      <motion.div key={text} className="flex items-center group" whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                        <span className="relative flex h-2.5 w-2.5 mr-3">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pingClass} opacity-75`} />
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotClass}`} />
                        </span>
                        <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-gray-400 mb-6 text-base leading-relaxed">
                    Let&apos;s discuss how I can help bring your ideas to life with clean, scalable code and innovative solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                    <motion.a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transition-shadow duration-500" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                      Get In Touch
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </motion.a>
                    <motion.a href="/assets/Subash_Singh_Dhami_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/[0.1] text-gray-400 hover:text-white hover:border-white/[0.25] font-semibold rounded-full transition-all duration-300" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                      View Resume
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}>
          <AnimatedCounter target="5" suffix="+" label="Projects Completed" />
          <AnimatedCounter target="3" suffix="+" label="Tech Stacks" />
          <AnimatedCounter target="2" suffix="+" label="Years Experience" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-1">24/7</div>
            <div className="text-gray-500 text-sm">Dedication</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HireMe;
