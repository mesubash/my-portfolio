import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, PenLine } from "lucide-react";
import { getAllWritings, CATEGORIES } from "../../lib/writings";
import WritingCard from "./WritingCard";
import FadeIn from "../ui/FadeIn";
import NodeBackground from "../ui/NodeBackground";

const WritingsPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const allWritings = useMemo(() => getAllWritings(), []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return allWritings.filter((w) => {
      const matchesSearch =
        !search ||
        w.title.toLowerCase().includes(search.toLowerCase()) ||
        w.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        w.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === "All" || w.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allWritings, search, activeCategory]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-5 sm:px-6 relative">
      <NodeBackground />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo/10 border border-indigo/20 flex items-center justify-center">
                <PenLine className="w-4 h-4 text-indigo" />
              </div>
              <p className="text-indigo text-xs font-medium uppercase tracking-[0.2em]">Writings</p>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Ideas & Reflections
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed">
              Essays, lessons, reflections, and systems thinking — from engineering to philosophy.
            </p>
          </div>
        </FadeIn>

        {/* Search + Filters */}
        <FadeIn delay={0.1}>
          <div className="mb-10 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="text"
                placeholder="Search writings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-bg-card border border-white/[0.06] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo/30 focus:ring-1 focus:ring-indigo/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-3.5 py-1.5 text-[12px] font-medium rounded-full transition-all duration-300 ${
                    activeCategory === cat
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-300 border border-white/[0.04] hover:border-white/[0.08]"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="cat-active"
                      className="absolute inset-0 bg-indigo/15 border border-indigo/30 rounded-full"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Results count */}
        <FadeIn delay={0.15}>
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-slate-600">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
              {activeCategory !== "All" && ` in ${activeCategory}`}
              {search && ` matching "${search}"`}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <SlidersHorizontal className="w-3 h-3" />
              Latest first
            </div>
          </div>
        </FadeIn>

        {/* Writing cards */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {filtered.map((writing, i) => (
                <WritingCard key={writing.slug} writing={writing} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-slate-600 text-sm">No writings found.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-3 text-indigo text-xs hover:text-indigo-light transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WritingsPage;
