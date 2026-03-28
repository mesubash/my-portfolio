import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import NodeBackground from "../ui/NodeBackground";
import { experience, education, certifications } from "../../data/social";

const TimelineItem = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 sm:gap-8"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Node */}
      <div className="relative shrink-0 mt-2 flex flex-col items-center">
        <motion.div
          className="w-3 h-3 rounded-full border-2 border-indigo/40 bg-bg z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.2, type: "spring", stiffness: 300 }}
        >
          <div className="w-full h-full rounded-full bg-indigo scale-50" />
        </motion.div>
      </div>

      {/* Card */}
      <div className="card-hover spotlight-card rounded-xl p-5 sm:p-7 flex-1 mb-2" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
          <div>
            <p className="text-indigo text-[11px] font-semibold uppercase tracking-[0.15em]">{exp.role}</p>
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white mt-1">{exp.company}</h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] text-slate-500 font-mono">{exp.period}</p>
            <p className="text-[11px] text-slate-600">{exp.location}</p>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-4">{exp.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[11px] text-slate-500 bg-white/[0.03] border border-white/[0.04] rounded">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => (
  <div className="py-28 sm:py-36 px-5 sm:px-6 relative">
    <NodeBackground />
    <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyan/[0.02] rounded-full blur-[150px] pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
      <FadeIn>
        <SectionHeading label="03 / Journey">Experience</SectionHeading>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Work Experience */}
        <div className="lg:col-span-7">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[5px] top-0 bottom-0 w-px">
              <motion.div
                className="w-full bg-gradient-to-b from-indigo/40 via-cyan/20 to-transparent"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>

            <div className="space-y-5">
              {experience.map((exp, i) => (
                <TimelineItem key={exp.company} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Education + Certs sidebar */}
        <div className="lg:col-span-5 space-y-5">
          {/* Education */}
          <FadeIn delay={0.2}>
            <div className="card-hover rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-cyan/[0.08] border border-cyan/[0.15] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-cyan" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">Education</h3>
              </div>
              <h4 className="font-heading text-base font-semibold text-white">{education.degree}</h4>
              <p className="text-sm text-slate-400 mt-1">{education.university}</p>
              <p className="text-[11px] text-slate-600 font-mono mt-1">Expected {education.expected}</p>
              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <p className="text-[11px] text-slate-600 uppercase tracking-wider mb-2">Coursework</p>
                <p className="text-xs text-slate-500">{education.coursework}</p>
              </div>
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn delay={0.3}>
            <div className="card-hover rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo/[0.08] border border-indigo/[0.15] flex items-center justify-center">
                  <Award className="w-4 h-4 text-indigo" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">Certifications</h3>
              </div>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-indigo/50 mt-2 shrink-0" />
                    <span className="text-sm text-slate-400">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Volunteering */}
          <FadeIn delay={0.4}>
            <div className="card-hover rounded-xl p-6 sm:p-7">
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">Community</h3>
              <ul className="space-y-3">
                {[
                  "Executive, Nepal Tek Community, NCIT",
                  "NOSKxNCIT Hackathons (multiple)",
                  "Volunteer, Final Year Project Exhibition, NCIT",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-cyan/50 mt-2 shrink-0" />
                    <span className="text-sm text-slate-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

export default Experience;
