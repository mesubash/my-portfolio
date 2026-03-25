import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ProjectCard = ({ title, description, image, github, liveUrl, tags = [], featured = false }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos - 0.5);
    y.set(yPos - 0.5);
    setSpotlightPos({ x: xPos * 100, y: yPos * 100 });
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient border for featured cards */}
      {featured && (
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `conic-gradient(from ${isHovered ? '180deg' : '0deg'}, rgba(139,92,246,0.4), rgba(236,72,153,0.3), rgba(6,182,212,0.3), rgba(139,92,246,0.4))`,
            transition: "background 2s linear",
          }}
        />
      )}

      <motion.div
        className={`relative bg-dark-950/80 backdrop-blur-sm border rounded-2xl overflow-hidden transition-colors duration-500 ${
          featured
            ? "border-violet-500/15 hover:border-transparent"
            : "border-white/[0.06] hover:border-white/[0.12]"
        }`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mouse-following spotlight */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(139,92,246,0.1), transparent 60%)`,
          }}
        />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-medium rounded-full border border-violet-500/30 backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />

          {/* Overlay Actions */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-3">
              {github && (
                <motion.a href={github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/20 transition-colors duration-300"
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  Code
                </motion.a>
              )}
              {liveUrl && (
                <motion.a href={liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 backdrop-blur-md border border-violet-500/30 text-violet-200 text-sm font-medium rounded-full hover:bg-violet-500/30 transition-colors duration-300"
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Live
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{description}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-gray-400 text-xs font-medium rounded-lg">{tag}</span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
            {liveUrl ? (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/live">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs text-gray-500 group-hover/live:text-emerald-400 transition-colors duration-300">Live</span>
              </a>
            ) : (
              <span className="text-xs text-gray-600">In Development</span>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-400 transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
