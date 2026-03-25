import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";
import GitHubHeatmap from "./GitHubHeatmap";

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const techStack = [
    { category: "Backend", items: ["Java Spring Boot", "Node.js", "PostgreSQL", "Redis", "Docker"], labelClass: "text-violet-400", tagClass: "bg-violet-500/10 border-violet-500/20 text-violet-300" },
    { category: "Mobile", items: ["Flutter", "Android (Java)", "Cross-platform"], labelClass: "text-emerald-400", tagClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"], labelClass: "text-blue-400", tagClass: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
    { category: "ML & Data", items: ["Python", "Scikit-learn", "Data Analysis"], labelClass: "text-amber-400", tagClass: "bg-amber-500/10 border-amber-500/20 text-amber-300" },
    { category: "DevOps", items: ["AWS", "CI/CD", "Nginx", "Git"], labelClass: "text-cyan-400", tagClass: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300" },
  ];

  const whatIBuild = ["RESTful APIs & Microservices", "Cross-platform Mobile Apps", "ML-powered Solutions", "Production-ready Systems"];

  return (
    <section className="section-padding bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Bio Card with tilt */}
          <FadeIn delay={0.1} className="lg:col-span-7">
            <TiltCard tiltStrength={5}>
              <div className="glass-card-hover p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-500/20">
                    <span className="text-violet-400 text-lg font-mono">&#123;&#125;</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Software Engineer</h3>
                </div>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4">
                  Full-stack developer building scalable systems with{" "}
                  <span className="text-violet-400 font-medium">Java Spring Boot</span>,
                  <span className="text-emerald-400 font-medium"> Flutter</span>, and{" "}
                  <span className="text-blue-400 font-medium">React</span>.
                </p>
                <p className="text-gray-500 text-base leading-relaxed">
                  Currently leading <span className="text-violet-400 font-medium">Yugo</span> &mdash; a smart
                  public transport platform serving thousands of users in Nepal.
                </p>
              </div>
            </TiltCard>
          </FadeIn>

          {/* Stats with tilt */}
          <FadeIn delay={0.2} className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full">
              {[
                { val: "3+", label: "Years Coding", cls: "gradient-text" },
                { val: "10+", label: "Projects Built", cls: "text-emerald-400" },
              ].map((s) => (
                <TiltCard key={s.label} tiltStrength={8}>
                  <div className="glass-card-hover p-5 sm:p-6 flex flex-col items-center justify-center text-center h-full">
                    <span className={`text-3xl sm:text-4xl font-bold ${s.cls} mb-1`}>{s.val}</span>
                    <span className="text-gray-500 text-sm">{s.label}</span>
                  </div>
                </TiltCard>
              ))}
              <TiltCard tiltStrength={8} className="col-span-2">
                <div className="glass-card-hover p-5 sm:p-6 flex flex-col items-center justify-center text-center h-full">
                  <span className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-1">5+</span>
                  <span className="text-gray-500 text-sm">Tech Stacks Mastered</span>
                </div>
              </TiltCard>
            </div>
          </FadeIn>

          {/* What I Build with tilt */}
          <FadeIn delay={0.25} className="lg:col-span-5">
            <TiltCard tiltStrength={5}>
              <div className="glass-card-hover p-6 sm:p-8 h-full">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <span className="text-emerald-400 text-sm">&#9654;</span>
                  </div>
                  What I Build
                </h3>
                <ul className="space-y-3">
                  {whatIBuild.map((item) => (
                    <motion.li key={item} className="flex items-center group" whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:scale-[2] group-hover:shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-300" />
                      <span className="text-gray-400 text-sm sm:text-base group-hover:text-gray-200 transition-colors duration-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </FadeIn>

          {/* Quote with tilt */}
          <FadeIn delay={0.3} className="lg:col-span-7">
            <TiltCard tiltStrength={4}>
              <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-violet-500/[0.08] to-purple-500/[0.04] border border-violet-500/10 h-full flex items-center">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(139,92,246,0.4) 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                <div className="relative">
                  <svg className="w-8 h-8 text-violet-500/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                  <p className="text-gray-300 text-lg sm:text-xl font-medium leading-relaxed mb-3">Talk is cheap. Show me the code.</p>
                  <p className="text-violet-400/70 text-sm font-mono">&mdash; Linus Torvalds</p>
                </div>
              </div>
            </TiltCard>
          </FadeIn>

          {/* GitHub Heatmap */}
          <div className="lg:col-span-12">
            <GitHubHeatmap />
          </div>

          {/* Tech Stack */}
          <FadeIn delay={0.4} className="lg:col-span-12">
            <TiltCard tiltStrength={3}>
              <div className="glass-card-hover p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                    <span className="text-violet-400 text-sm font-mono">&lt;/&gt;</span>
                  </div>
                  Tech Stack
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {techStack.map((stack) => (
                    <div key={stack.category}>
                      <h4 className={`text-sm font-semibold mb-3 ${stack.labelClass} font-mono`}>{stack.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {stack.items.map((tech) => (
                          <motion.span key={tech} className={`px-3 py-1.5 ${stack.tagClass} rounded-lg text-xs font-medium border transition-all duration-300 cursor-default`} whileHover={{ scale: 1.1, y: -2 }}>
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
