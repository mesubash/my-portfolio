import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  LinkIcon,
} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getWritingBySlug, getAdjacentWritings, getRelatedWritings } from "../../lib/writings";
import FadeIn from "../ui/FadeIn";

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

const WritingDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articleRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const writing = useMemo(() => getWritingBySlug(slug), [slug]);
  const { prev, next } = useMemo(() => getAdjacentWritings(slug), [slug]);
  const related = useMemo(() => getRelatedWritings(slug), [slug]);

  // Reading progress
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Update document title
  useEffect(() => {
    if (writing) {
      document.title = `${writing.title} — Subash Singh Dhami`;
    }
    return () => {
      document.title = "Subash Singh Dhami — Software Engineer";
    };
  }, [writing]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: writing.title, text: writing.excerpt, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!writing) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-2xl font-bold text-white mb-4">Writing not found</h1>
          <p className="text-slate-500 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/writings"
            className="inline-flex items-center gap-2 text-sm text-indigo hover:text-indigo-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to writings
          </Link>
        </div>
      </div>
    );
  }

  const colorClass = categoryColors[writing.category] || "text-slate-400 border-slate-400/30";

  return (
    <div ref={articleRef} className="min-h-screen">
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-indigo z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="pt-28 pb-20 px-5 sm:px-6">
        <div className="max-w-[680px] mx-auto">
          {/* Back button */}
          <FadeIn>
            <Link
              to="/writings"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to writings
            </Link>
          </FadeIn>

          {/* Article header */}
          <FadeIn delay={0.05}>
            <header className="mb-10">
              <span
                className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${colorClass} mb-5`}
              >
                {writing.category}
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.15] tracking-tight mb-5">
                {writing.title}
              </h1>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6">
                {writing.excerpt}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
                <div className="flex items-center gap-5 text-[13px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(writing.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {writing.readingTime} min read
                  </span>
                </div>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-3.5 h-3.5" />
                      Share
                    </>
                  )}
                </button>
              </div>
            </header>
          </FadeIn>

          {/* Article body */}
          <FadeIn delay={0.1}>
            <article className="writing-prose">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    if (!inline && match) {
                      return (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            background: "#0c0d12",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "0.75rem",
                            padding: "1.25rem",
                            fontSize: "0.85rem",
                            margin: "1.75rem 0",
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      );
                    }
                    return (
                      <code
                        className="bg-bg-card border border-white/[0.06] text-indigo-light px-1.5 py-0.5 rounded text-[0.85em] font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  // Skip the first h1 since we render the title separately
                  h1: ({ children }) => null,
                }}
              >
                {writing.content}
              </Markdown>
            </article>
          </FadeIn>

          {/* Tags */}
          {writing.tags.length > 0 && (
            <FadeIn delay={0.15}>
              <div className="mt-12 pt-8 border-t border-white/[0.04]">
                <div className="flex flex-wrap gap-2">
                  {writing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-slate-600 bg-bg-card border border-white/[0.04] px-2.5 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Related posts */}
          {related.length > 0 && (
            <FadeIn delay={0.2}>
              <div className="mt-14 pt-8 border-t border-white/[0.04]">
                <h3 className="font-heading text-sm font-semibold text-slate-400 uppercase tracking-[0.15em] mb-5">
                  Related Writings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {related.map((r) => {
                    const rColor = categoryColors[r.category] || "text-slate-400 border-slate-400/30";
                    return (
                      <Link
                        key={r.slug}
                        to={`/writings/${r.slug}`}
                        className="group card-hover spotlight-card p-4 rounded-xl"
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          e.currentTarget.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
                          e.currentTarget.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
                        }}
                      >
                        <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border ${rColor} mb-2.5`}>
                          {r.category}
                        </span>
                        <h4 className="text-[13px] font-medium text-slate-300 group-hover:text-white transition-colors leading-snug line-clamp-2 mb-2">
                          {r.title}
                        </h4>
                        <span className="flex items-center gap-1 text-[11px] text-slate-600">
                          <Clock className="w-2.5 h-2.5" />
                          {r.readingTime} min
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Previous / Next navigation */}
          <FadeIn delay={0.25}>
            <nav className="mt-12 pt-8 border-t border-white/[0.04] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  to={`/writings/${prev.slug}`}
                  className="group card-hover p-5 rounded-xl text-left"
                >
                  <span className="flex items-center gap-1 text-[11px] text-slate-600 mb-2">
                    <ChevronLeft className="w-3 h-3" /> Previous
                  </span>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors line-clamp-1">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to={`/writings/${next.slug}`}
                  className="group card-hover p-5 rounded-xl text-right"
                >
                  <span className="flex items-center justify-end gap-1 text-[11px] text-slate-600 mb-2">
                    Next <ChevronRight className="w-3 h-3" />
                  </span>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors line-clamp-1">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default WritingDetail;
