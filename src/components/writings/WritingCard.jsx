import { motion } from "framer-motion";
import { Clock, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const categoryColors = {
  Essay: "text-indigo-light border-indigo/30",
  Journal: "text-amber-400 border-amber-400/30",
  Engineering: "text-cyan border-cyan/30",
  "Project Lessons": "text-emerald-400 border-emerald-400/30",
  Startup: "text-violet-400 border-violet-400/30",
  Travel: "text-rose-400 border-rose-400/30",
  Philosophy: "text-purple-400 border-purple-400/30",
  Personal: "text-sky-400 border-sky-400/30",
};

const WritingCard = ({ writing, index = 0 }) => {
  const colorClass = categoryColors[writing.category] || "text-slate-400 border-slate-400/30";

  const handleSpotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/writings/${writing.slug}`}>
        <motion.article
          className="group card-hover spotlight-card p-6 sm:p-7 rounded-xl relative"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          onMouseMove={handleSpotlight}
        >
          {/* Featured badge */}
          {writing.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-medium text-amber-400/80 uppercase tracking-wider">
              <Star className="w-3 h-3 fill-amber-400/60" />
              Featured
            </div>
          )}

          {/* Category badge */}
          <span className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${colorClass} mb-4`}>
            {writing.category}
          </span>

          {/* Title */}
          <h3 className="font-heading text-lg sm:text-xl font-semibold text-white leading-snug mb-2.5 group-hover:text-indigo-light transition-colors duration-300">
            {writing.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">
            {writing.excerpt}
          </p>

          {/* Meta */}
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

          {/* Hover line accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo to-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-xl" />
        </motion.article>
      </Link>
    </motion.div>
  );
};

export default WritingCard;
