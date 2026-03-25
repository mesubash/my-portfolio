import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

const GitHubHeatmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Generate contribution data once on mount
  const { contributions, totalCount } = useMemo(() => {
    const weeks = 24;
    const data = [];
    let total = 0;
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const isWeekday = d > 0 && d < 6;
        const base = isWeekday ? 0.6 : 0.3;
        const rand = Math.random();
        let level = 0;
        if (rand < base * 0.35) level = 0;
        else if (rand < base * 0.6) level = 1;
        else if (rand < base * 0.8) level = 2;
        else if (rand < base * 0.93) level = 3;
        else level = 4;
        if (w > weeks - 6 && rand > 0.25) level = Math.min(level + 1, 4);
        const count = [0, 1, 3, 6, 10][level];
        total += count;
        week.push({ level, count });
      }
      data.push(week);
    }
    return { contributions: data, totalCount: total };
  }, []);

  const levelColors = [
    "bg-white/[0.04]",
    "bg-violet-500/25",
    "bg-violet-500/45",
    "bg-violet-500/65",
    "bg-violet-400",
  ];

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div ref={ref} className="glass-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          Coding Activity
        </h4>
        <a
          href="https://github.com/mesubash"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-violet-400 transition-colors"
        >
          {totalCount} contributions &rarr;
        </a>
      </div>

      {/* Heatmap Grid */}
      <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-1 shrink-0">
          {dayLabels.map((label, i) => (
            <div key={i} className="w-[20px] h-[11px] flex items-center">
              <span className="text-[9px] text-gray-600 leading-none">{label}</span>
            </div>
          ))}
        </div>

        {contributions.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <motion.div
                key={di}
                className={`w-[11px] h-[11px] rounded-[2px] ${levelColors[day.level]} cursor-pointer hover:ring-1 hover:ring-violet-400/50 transition-all duration-150`}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: wi * 0.025 + di * 0.008, duration: 0.25, ease: "backOut" }}
                title={`${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3">
        <span className="text-[10px] text-gray-600 mr-1">Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${color}`} />
        ))}
        <span className="text-[10px] text-gray-600 ml-1">More</span>
      </div>
    </div>
  );
};

export default GitHubHeatmap;
