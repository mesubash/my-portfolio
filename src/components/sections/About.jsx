import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import NodeBackground from "../ui/NodeBackground";
import GitActivity from "../ui/GitActivity";
import techStack, { groupColors } from "../../data/techStack";
import { motion } from "framer-motion";

const groupLabels = { backend: "Backend", frontend: "Frontend", mobile: "Mobile", ml: "ML & Data", devops: "DevOps" };

const About = () => {
  const grouped = {};
  techStack.forEach((t) => { if (!grouped[t.group]) grouped[t.group] = []; grouped[t.group].push(t.label); });

  return (
    <div className="py-28 sm:py-36 px-5 sm:px-6 relative">
      <NodeBackground />
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <SectionHeading label="01 / About">About</SectionHeading>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Bio */}
          <FadeIn delay={0.1} className="lg:col-span-7">
            <div className="card-hover spotlight-card p-7 sm:p-9 h-full rounded-xl" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`); }}>
              <h3 className="font-heading text-xl font-semibold text-white mb-5">Who I am</h3>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
                I&apos;m a software engineer from Kathmandu, Nepal, focused on
                building backend systems that handle real-world complexity.
                My core stack is <span className="text-indigo-light font-medium">Java</span> and
                <span className="text-indigo-light font-medium"> Spring Boot</span>,
                but I work across the full stack, from
                <span className="text-indigo-light font-medium"> Flutter</span> mobile apps to
                <span className="text-indigo-light font-medium"> React</span> frontends
                to CI/CD pipelines on AWS.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Right now I&apos;m a backend engineer at Himalayan Guardian Nepal. Before that I interned at
                Neoyaan and InnoByte, shipping APIs, designing databases, and deploying
                containerized services. I also built <span className="text-slate-300 font-medium">Yugo</span>,
                a microservices-based public transport platform that&apos;s live and serving users.
              </p>
            </div>
          </FadeIn>

          {/* What I Build */}
          <FadeIn delay={0.2} className="lg:col-span-5">
            <div className="card-hover spotlight-card p-7 sm:p-9 h-full rounded-xl blueprint-corner" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`); }}>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-[0.15em] mb-6">
                Systems I Build
              </h3>
              <ul className="space-y-4">
                {["RESTful APIs & Microservices", "Cross-platform Mobile Apps", "ML-powered Pipelines", "Production Infrastructure"].map((item, i) => (
                  <motion.li key={item} className="flex items-center group" whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                    <span className="w-6 h-[1px] bg-indigo/40 mr-3 group-hover:w-10 group-hover:bg-indigo transition-all duration-300" />
                    <span className="text-slate-400 text-sm group-hover:text-slate-200 transition-colors duration-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Tech Stack with group colors matching 3D graph */}
          <FadeIn delay={0.3} className="lg:col-span-12">
            <div className="card-hover p-7 sm:p-9 rounded-xl">
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-[0.15em] mb-8">
                Technology Graph
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full" style={{ background: groupColors[group] }} />
                      <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: groupColors[group] }}>
                        {groupLabels[group]}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-2.5 py-1 text-xs text-slate-400 bg-white/[0.03] border border-white/[0.05] rounded-md hover:border-white/[0.12] hover:text-slate-200 transition-all duration-300 cursor-default"
                          whileHover={{ scale: 1.05, y: -1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* GitHub Activity */}
          <FadeIn delay={0.35} className="lg:col-span-12">
            <GitActivity />
          </FadeIn>

        </div>
      </div>
    </div>
  );
};

export default About;
