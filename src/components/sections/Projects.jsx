import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import NodeBackground from "../ui/NodeBackground";
import projects from "../../data/projects";

const ProjectCard = ({ title, description, image, tags, github, liveUrl, highlight }) => (
  <motion.div
    className={`group card-hover spotlight-card rounded-xl overflow-hidden ${highlight ? "ring-1 ring-indigo/10" : ""}`}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
    onMouseMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    }}
  >
    {/* Image */}
    <div className="relative h-44 sm:h-48 overflow-hidden bg-bg-raised">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/50 to-transparent" />

      {/* Highlight badge */}
      {highlight && (
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-light bg-indigo/10 border border-indigo/20 rounded-md backdrop-blur-sm">
            Featured
          </span>
        </div>
      )}

      {/* Hover actions */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-400 z-10">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-white/[0.08] border border-white/[0.15] rounded-lg backdrop-blur-md hover:bg-white/[0.15] transition-all">
            <Github className="w-3.5 h-3.5" /> Code
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-indigo/70 rounded-lg hover:bg-indigo transition-all">
            <ExternalLink className="w-3.5 h-3.5" /> Live
          </a>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="p-5 sm:p-6">
      <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-indigo-light transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-[11px] text-slate-500 bg-white/[0.03] border border-white/[0.04] rounded">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer status */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
        {liveUrl ? (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/status">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] text-slate-600 group-hover/status:text-emerald-400 transition-colors">Live</span>
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

const Projects = () => (
  <div className="py-28 sm:py-36 px-5 sm:px-6 relative">
    <NodeBackground />
    <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo/[0.02] rounded-full blur-[150px] pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
      <FadeIn>
        <SectionHeading label="02 / Work" description="Systems I've architected and shipped, from backend APIs to mobile apps.">
          Projects
        </SectionHeading>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <FadeIn key={project.title} delay={i * 0.08}>
            <ProjectCard {...project} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.5}>
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

export default Projects;
