import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Star } from "lucide-react";
import { getAllWritings } from "../../lib/writings";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import NodeBackground from "../ui/NodeBackground";

const categoryColors = {
  Essay: "text-indigo-light border-indigo/30",
  Journal: "text-amber-400 border-amber-400/30",
  Engineering: "text-cyan border-cyan/30",
  "Project Lessons": "text-emerald-400 border-emerald-400/30",
  Startup: "text-violet-400 border-violet-400/30",
  Travel: "text-rose-400 border-rose-400/30",
  Philosophy: "text-purple-400 border-purple-400/30",
  Personal: "text-sky-400 border-sky-400/30",
  Reflection: "text-orange-400 border-orange-400/30",
};

const Writings = () => {
  const preview = useMemo(() => {
    const all = getAllWritings();
    // Prioritize featured, then latest — show up to 3
    const featured = all.filter((w) => w.featured);
    const rest = all.filter((w) => !w.featured);
    return [...featured, ...rest].slice(0, 3);
  }, []);

  if (preview.length === 0) return null;

  const handleSpotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="py-28 sm:py-36 px-5 sm:px-6 relative">
      <NodeBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <SectionHeading label="Writings" description="Ideas, lessons, reflections, and systems thinking.">
            Recent Writings
          </SectionHeading>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {preview.map((writing, i) => {
            const colorClass = categoryColors[writing.category] || "text-slate-400 border-slate-400/30";
            return (
              <FadeIn key={writing.slug} delay={0.1 + i * 0.08}>
                <Link to={`/writings/${writing.slug}`}>
                  <motion.article
                    className="group card-hover spotlight-card p-6 rounded-xl relative h-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    onMouseMove={handleSpotlight}
                  >
                    {writing.featured && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-medium text-amber-400/80 uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-amber-400/60" />
                        Featured
                      </div>
                    )}

                    <span className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${colorClass} mb-4`}>
                      {writing.category}
                    </span>

                    <h3 className="font-heading text-lg font-semibold text-white leading-snug mb-2.5 group-hover:text-indigo-light transition-colors duration-300 line-clamp-2">
                      {writing.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">
                      {writing.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-[12px] text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(writing.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {writing.readingTime} min read
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-xl" />
                  </motion.article>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* View all button */}
        <FadeIn delay={0.35}>
          <div className="mt-10 flex justify-center">
            <Link to="/writings">
              <motion.span
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-medium text-slate-400 hover:text-white border border-white/[0.06] hover:border-indigo/30 rounded-full transition-all duration-300"
                whileHover={{ y: -1 }}
              >
                View all writings <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Writings;
