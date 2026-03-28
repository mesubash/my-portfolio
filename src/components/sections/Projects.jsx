import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import NodeBackground from "../ui/NodeBackground";
import projects from "../../data/projects";

/* ─── Featured project (Yugo) — full-width hero card ─── */
const FeaturedProject = ({ title, description, image, tags, liveUrl }) => (
  <FadeIn>
    <motion.div
      className="group card-hover spotlight-card rounded-xl overflow-hidden mb-8"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image side */}
        <div className="relative h-56 lg:h-auto lg:min-h-[320px] overflow-hidden bg-bg-raised">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-bg-card via-bg-card/60 to-transparent" />
        </div>

        {/* Content side */}
        <div className="p-7 sm:p-10 flex flex-col justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo mb-3">Featured Project</span>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-indigo-light transition-colors duration-300">
            {title}
          </h3>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
            {description} Built with a 4-member team as a final year project. Features QR/NFC tap-in/out, Khalti wallet integration, trip and route management, and a full admin dashboard.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo rounded-lg hover:bg-indigo-dark shadow-lg shadow-indigo/20 hover:shadow-indigo/30 transition-all hover:-translate-y-[1px]"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Live
              </a>
            )}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500">In Production</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </FadeIn>
);

/* ─── Standard project card ─── */
const ProjectCard = ({ title, description, image, tags, github, liveUrl }) => (
  <motion.div
    className="group card-hover spotlight-card rounded-xl overflow-hidden"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
    onMouseMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    }}
  >
    <div className="relative h-40 overflow-hidden bg-bg-raised">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/50 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-white/[0.08] border border-white/[0.15] rounded-lg backdrop-blur-md hover:bg-white/[0.15] transition-all">
            <Github className="w-3.5 h-3.5" /> Code
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo/70 rounded-lg hover:bg-indigo transition-all">
            <ExternalLink className="w-3.5 h-3.5" /> Live
          </a>
        )}
      </div>
    </div>

    <div className="p-5">
      <h3 className="font-heading text-base font-semibold text-white mb-2 group-hover:text-indigo-light transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-3 line-clamp-2">{description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-[11px] text-slate-500 bg-white/[0.03] border border-white/[0.04] rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
        {liveUrl ? (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/s">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-slate-600 group-hover/s:text-emerald-400 transition-colors">Live</span>
          </a>
        ) : (
          <span className="text-[11px] text-slate-700">In Development</span>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-indigo-light transition-colors">
            <Github className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

/* ─── Section ─── */
const Projects = () => {
  const featured = projects.find((p) => p.highlight);
  const rest = projects.filter((p) => !p.highlight);

  return (
    <div className="py-28 sm:py-36 px-5 sm:px-6 relative">
      <NodeBackground />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <SectionHeading label="02 / Work" description="Systems I've architected and shipped, from backend APIs to mobile apps.">
            Projects
          </SectionHeading>
        </FadeIn>

        {/* Featured (Yugo) */}
        {featured && <FeaturedProject {...featured} />}

        {/* Rest of projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.08}>
              <ProjectCard {...project} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <a href="https://github.com/mesubash" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-light transition-colors group">
              Explore more on GitHub
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Projects;
