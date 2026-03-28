import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const WEEKS_TO_SHOW = 20;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const levelClasses = ["bg-white/[0.04]", "bg-indigo/20", "bg-indigo/40", "bg-indigo/60", "bg-indigo"];

const GitActivity = ({ username = "mesubash" }) => {
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [totalContribs, setTotalContribs] = useState(0);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Fetch real contribution heatmap
  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) return;
        const data = await res.json();
        setTotalContribs(data.total?.lastYear || 0);

        const days = data.contributions || [];
        // Build weeks grid (last N weeks)
        const totalDays = WEEKS_TO_SHOW * 7;
        const recent = days.slice(-totalDays);
        const weeks = [];
        for (let i = 0; i < recent.length; i += 7) {
          weeks.push(recent.slice(i, i + 7));
        }
        setHeatmap(weeks);
      } catch {
        // Silently fail, heatmap is optional
      }
    };
    fetchHeatmap();
  }, [username]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!repoRes.ok) throw new Error(`${repoRes.status}`);
        const repoData = await repoRes.json();
        if (!Array.isArray(repoData)) throw new Error("Bad data");

        const eventRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
        const eventData = eventRes.ok ? await eventRes.json() : [];

        const totalStars = repoData.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        const totalForks = repoData.reduce((s, r) => s + (r.forks_count || 0), 0);
        const publicRepos = repoData.length;

        const langMap = {};
        repoData.forEach((r) => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const languages = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
        const maxLang = languages.length > 0 ? languages[0][1] : 1;

        const monthMap = {};
        const now = new Date();
        for (let i = 3; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          monthMap[d.toLocaleString("en", { month: "short" })] = 0;
        }
        if (Array.isArray(eventData)) {
          eventData.forEach((ev) => {
            const key = new Date(ev.created_at).toLocaleString("en", { month: "short" });
            if (key in monthMap) monthMap[key]++;
          });
        }
        const months = Object.entries(monthMap);
        const maxMonth = Math.max(...months.map(([, v]) => v), 1);

        const recent = repoData.filter((r) => !r.fork).sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 4);

        setRepos(recent);
        setStats({ publicRepos, totalStars, totalForks, languages, maxLang, months, maxMonth });
      } catch (err) {
        console.warn("GitActivity fetch failed:", err);
        setError(true);
      }
    };
    fetchData();
  }, [username]);

  const langColors = {
    Java: "#b07219", JavaScript: "#f1e05a", Python: "#3572A5", Dart: "#00B4AB",
    TypeScript: "#3178c6", PHP: "#4F5D95", HTML: "#e34c26", CSS: "#563d7c",
    "Jupyter Notebook": "#DA5B0B", Blade: "#f7523f",
  };

  // Always render the card frame, show loading/error/data inside
  return (
    <div ref={ref} className="card-hover rounded-xl p-6 sm:p-7">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4 text-indigo" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <h4 className="text-sm font-semibold text-white">GitHub Activity</h4>
        </div>
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-500 hover:text-indigo transition-colors">
          @{username} &rarr;
        </a>
      </div>

      {/* Contribution Heatmap */}
      {heatmap && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-[11px] text-slate-600 uppercase tracking-wider">Contributions</h5>
            <span className="text-[11px] text-slate-600 font-mono">{totalContribs.toLocaleString()} in the last year</span>
          </div>
          <div className="flex gap-[3px] overflow-x-auto pb-1">
            <div className="flex flex-col gap-[3px] mr-1.5 shrink-0">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="w-[18px] h-[11px] flex items-center">
                  <span className="text-[9px] text-slate-600 leading-none">{label}</span>
                </div>
              ))}
            </div>
            {heatmap.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <motion.div
                    key={di}
                    className={`w-[11px] h-[11px] rounded-[2px] ${levelClasses[day.level] || levelClasses[0]} cursor-default`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: wi * 0.02 + di * 0.005, duration: 0.2, ease: "backOut" }}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-2">
            <span className="text-[9px] text-slate-600">Less</span>
            {levelClasses.map((cls, i) => (
              <div key={i} className={`w-[9px] h-[9px] rounded-[2px] ${cls}`} />
            ))}
            <span className="text-[9px] text-slate-600">More</span>
          </div>
        </div>
      )}

      {/* Loading state */}
      {!stats && !error && (
        <div className="text-xs text-slate-600 py-4">Loading activity...</div>
      )}

      {/* Error/rate-limit fallback */}
      {error && (
        <div className="py-4">
          <p className="text-xs text-slate-600 mb-3">Live data unavailable. Visit my profile directly.</p>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo/70 rounded-lg hover:bg-indigo transition-all">
            View on GitHub
          </a>
        </div>
      )}

      {/* Data loaded */}
      {stats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="space-y-4">
              <h5 className="text-[11px] text-slate-600 uppercase tracking-wider">Overview</h5>
              {[
                { label: "Public Repos", value: stats.publicRepos },
                { label: "Stars Earned", value: stats.totalStars },
                { label: "Forks", value: stats.totalForks },
              ].map((s, i) => (
                <motion.div key={s.label} className="flex items-center justify-between" initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }}>
                  <span className="text-xs text-slate-500">{s.label}</span>
                  <span className="text-sm font-semibold text-white font-mono">{s.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Language bars */}
            <div className="space-y-3">
              <h5 className="text-[11px] text-slate-600 uppercase tracking-wider">Languages</h5>
              {stats.languages.map(([lang, count], i) => (
                <motion.div key={lang} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 + i * 0.06 }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: langColors[lang] || "#6366f1" }} />
                      <span className="text-xs text-slate-400">{lang}</span>
                    </div>
                    <span className="text-[10px] text-slate-600 font-mono">{count}</span>
                  </div>
                  <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: langColors[lang] || "#6366f1" }} initial={{ width: 0 }} animate={isInView ? { width: `${(count / stats.maxLang) * 100}%` } : {}} transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Monthly activity */}
            <div>
              <h5 className="text-[11px] text-slate-600 uppercase tracking-wider mb-3">Recent Activity</h5>
              <div className="flex items-end gap-2 h-24">
                {stats.months.map(([month, count], i) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                    <motion.div className="w-full bg-indigo/70 rounded-sm" initial={{ height: 0 }} animate={isInView ? { height: `${Math.max((count / stats.maxMonth) * 100, 4)}%` } : {}} transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }} />
                    <span className="text-[9px] text-slate-600">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent repos */}
          {repos.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/[0.04]">
              <h5 className="text-[11px] text-slate-600 uppercase tracking-wider mb-3">Recently Updated</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {repos.map((repo, i) => (
                  <motion.a key={repo.name} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-colors group" initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.06 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo/50 shrink-0" />
                    <span className="text-xs text-slate-400 group-hover:text-white truncate transition-colors">{repo.name}</span>
                    {repo.language && <span className="ml-auto text-[10px] text-slate-600 shrink-0">{repo.language}</span>}
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GitActivity;
