import { useEffect, useRef, useState } from 'react';
import SectionHeader from './SectionHeader';

const REPO = 'nolasko7/nolasko7.github.io';

const texts = {
  es: {
    title: 'Cómo se despliega este sitio',
    subtitle: 'Cada push a main recorre este pipeline de GitHub Actions y llega a producción sin pasos manuales.',
    stages: [
      { name: 'git push', detail: 'main' },
      { name: 'Install', detail: 'npm install' },
      { name: 'Build', detail: 'vite build + secrets' },
      { name: 'Artifact', detail: 'upload ./dist' },
      { name: 'Deploy', detail: 'GitHub Pages' },
    ],
    live: 'Live',
    lastDeploy: 'Último deploy',
    running: 'En ejecución',
    viewRun: 'Ver run en GitHub',
  },
  en: {
    title: 'How this site gets deployed',
    subtitle: 'Every push to main runs through this GitHub Actions pipeline and reaches production with no manual steps.',
    stages: [
      { name: 'git push', detail: 'main' },
      { name: 'Install', detail: 'npm install' },
      { name: 'Build', detail: 'vite build + secrets' },
      { name: 'Artifact', detail: 'upload ./dist' },
      { name: 'Deploy', detail: 'GitHub Pages' },
    ],
    live: 'Live',
    lastDeploy: 'Last deploy',
    running: 'Running',
    viewRun: 'View run on GitHub',
  },
};

const timeAgo = (date, language) => {
  const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
  const seconds = Math.round((new Date(date) - Date.now()) / 1000);
  const units = [['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60]];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return rtf.format(seconds, 'second');
};

const PipelineSection = ({ language }) => {
  const t = texts[language];
  const [activeStage, setActiveStage] = useState(-1);
  const [lastRun, setLastRun] = useState(null);
  const sectionRef = useRef(null);
  const totalSteps = t.stages.length + 1; // stages + "live"

  // Light up the stages one by one when the section enters the viewport
  useEffect(() => {
    let interval = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let step = 0;
      interval = setInterval(() => {
        setActiveStage(step);
        // Deploy reached "Live": send a wave through the background network
        if (step === totalSteps - 1) window.dispatchEvent(new CustomEvent('network:burst', { detail: { type: 'wave' } }));
        step++;
        if (step >= totalSteps) clearInterval(interval);
      }, 550);
    }, { threshold: 0.4 });
    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [totalSteps]);

  // Real status of the last deploy (public API, no token). Hidden if it fails.
  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/actions/runs?per_page=1&branch=main`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        const run = data.workflow_runs?.[0];
        if (run) setLastRun(run);
      })
      .catch(() => {});
  }, []);

  const isLive = activeStage >= t.stages.length;
  const progress = Math.max(0, Math.min(activeStage, t.stages.length) / t.stages.length) * 100;

  const runOk = lastRun?.conclusion === 'success';
  const runFailed = lastRun?.conclusion && !runOk;
  const runInProgress = lastRun && !lastRun.conclusion;

  return (
    <section id="pipeline" ref={sectionRef} className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto">
      <SectionHeader number="02.7" title={t.title} />
      <p className="font-light leading-relaxed mb-12 max-w-xl -mt-8">{t.subtitle}</p>

      <div className="reveal relative rounded-2xl border border-stone-200/50 dark:border-stone-800/60 bg-white/60 dark:bg-[#0a0a08]/60 backdrop-blur-sm p-6 sm:p-10 overflow-hidden">
        {/* Track */}
        <div className="relative">
          <div className="hidden sm:block absolute left-[10%] right-[10%] top-6 h-px bg-stone-200 dark:bg-stone-800">
            <div className="h-full bg-green-500 shadow-[0_0_12px_#22c55e] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            {!isLive && activeStage >= 0 && (
              <div
                className="absolute -top-[3px] w-[7px] h-[7px] rounded-full bg-green-400 shadow-[0_0_14px_#4ade80] transition-all duration-500 ease-out"
                style={{ left: `calc(${progress}% - 3px)` }}
              />
            )}
          </div>

          <ol className="relative grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2">
            {t.stages.map((stage, idx) => {
              const done = activeStage > idx || isLive;
              const running = activeStage === idx;
              return (
                <li key={stage.name} className="flex sm:flex-col items-center gap-4 sm:gap-3 sm:text-center">
                  <div className={`relative z-10 w-12 h-12 flex-shrink-0 rounded-xl border flex items-center justify-center font-mono text-xs transition-all duration-500 ${
                    done
                      ? 'border-green-500/60 bg-green-500/10 text-green-600 dark:text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.25)]'
                      : running
                        ? 'border-amber-400/60 bg-amber-400/10 text-amber-500'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#141410] text-stone-400'
                  }`}>
                    {done ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    ) : running ? (
                      <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    ) : (
                      String(idx + 1).padStart(2, '0')
                    )}
                  </div>
                  <div>
                    <div className={`font-mono text-sm transition-colors ${done || running ? 'text-dark' : 'text-stone-400'}`}>{stage.name}</div>
                    <div className="font-mono text-[11px] text-stone-400">{stage.detail}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Live badge */}
        <div className={`mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-stone-200/50 dark:border-stone-800/60 transition-opacity duration-700 ${isLive ? 'opacity-100' : 'opacity-30'}`}>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              {isLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-green-500' : 'bg-stone-400'}`}></span>
            </span>
            <span className="font-mono text-sm text-dark">{t.live} · nolasko7.github.io</span>
          </div>

          {lastRun && (
            <a
              href={lastRun.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-stone-500 hover:text-green-700 dark:hover:text-green-400 transition-colors"
              title={t.viewRun}
            >
              <span className={runOk ? 'text-green-600 dark:text-green-400' : runFailed ? 'text-red-500' : 'text-amber-500'}>
                {runOk ? '✓ success' : runFailed ? `✗ ${lastRun.conclusion}` : `● ${t.running}`}
              </span>
              <span>{t.lastDeploy}: {timeAgo(runInProgress ? lastRun.run_started_at : lastRun.updated_at, language)}</span>
              <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800/80">{lastRun.head_sha.slice(0, 7)}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
