import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");
  const videoRef = useRef(null);

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Video setup
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Feature-detect WebM support, fallback to MP4
    try {
      const canPlayWebm =
        typeof vid.canPlayType === "function" &&
        (vid.canPlayType('video/webm; codecs="vp8, vorbis"') || vid.canPlayType("video/webm"));

      if (!canPlayWebm) {
        while (vid.firstChild) vid.removeChild(vid.firstChild);
        const src = document.createElement("source");
        src.src = "/assets/loader/12345.mp4";
        src.type = "video/mp4";
        vid.appendChild(src);
        vid.load();
      }
    } catch {
      // Proceed with default sources
    }

    if (prefersReduced) {
      try { vid.pause(); } catch { /* ignore */ }
    } else {
      vid.muted = true;
      const p = vid.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    }

    const onError = () => {
      const hasMp4 = Array.from(vid.querySelectorAll("source")).some(
        (s) => s.type === "video/mp4" || /\.mp4$/.test(s.src)
      );
      if (!hasMp4) {
        while (vid.firstChild) vid.removeChild(vid.firstChild);
        const src = document.createElement("source");
        src.src = "/assets/loader/12345.mp4";
        src.type = "video/mp4";
        vid.appendChild(src);
        vid.load();
        const p2 = vid.play();
        if (p2 && typeof p2.then === "function") p2.catch(() => {});
      }
    };
    vid.addEventListener("error", onError);
    return () => vid.removeEventListener("error", onError);
  }, [prefersReduced]);

  // Progress bar animation
  useEffect(() => {
    const duration = 2400;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(eased * 100, 100));

      if (step >= steps) {
        clearInterval(timer);
        setPhase("complete");
        setTimeout(() => {
          setPhase("exit");
          if (onComplete) onComplete();
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#030712" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/[0.04] rounded-full blur-[120px]" />
          </div>

          {/* Video loader in circle */}
          <motion.div
            className="relative z-10 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white shadow-2xl shadow-violet-500/10 border border-white/10 p-0.5">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-full"
                playsInline
                autoPlay={!prefersReduced}
                muted
                loop
                preload="auto"
                aria-hidden="true"
              >
                <source src="/assets/loader/12345.webm" type="video/webm" />
                <source src="/assets/loader/12345.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Spinning ring around the video */}
            <div className="absolute -inset-2 rounded-full border-2 border-transparent border-t-violet-500/40 animate-spin" style={{ animationDuration: "2s" }} />
          </motion.div>

          {/* Brand */}
          <motion.div
            className="relative z-10 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-white font-mono text-lg font-medium tracking-wider">
              subash<span className="text-violet-400">.dev</span>
            </span>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="relative z-10 w-48 sm:w-56"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-gray-600 font-mono">
                {phase === "complete" ? "Ready" : "Loading"}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
