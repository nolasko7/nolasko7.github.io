import { useEffect, useState } from 'react';

// Vertical "pipeline" of the page sections (xl screens only):
// the line fills with scroll progress and the current section lights up.
const SectionRail = ({ items, scrollTo }) => {
  const [activeId, setActiveId] = useState('top');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      // Current section = last one whose top passed 40% of the viewport
      let current = 'top';
      for (const item of items) {
        if (item.id === 'top') continue;
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = item.id;
      }
      setActiveId(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <nav aria-label="Sections" className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative flex flex-col gap-7 py-2">
        {/* Track + fill */}
        <div className="absolute left-[5px] top-0 bottom-0 w-px bg-stone-300/60 dark:bg-stone-800">
          <div className="w-full bg-green-500 shadow-[0_0_10px_#22c55e]" style={{ height: `${progress * 100}%` }} />
        </div>

        {items.map((item, idx) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id === 'top' ? 0 : `#${item.id}`)}
              className="group relative flex items-center gap-4 text-left"
              aria-current={isActive ? 'true' : undefined}
            >
              <span className={`relative z-10 w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? 'bg-green-500 border-green-500 shadow-[0_0_12px_#22c55e] scale-125'
                  : 'bg-stone-50 border-stone-300 dark:border-stone-700 group-hover:border-green-500'
              }`} />
              <span className={`font-mono text-[11px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'opacity-100 translate-x-0 text-green-700 dark:text-green-400'
                  : 'opacity-0 -translate-x-2 text-stone-400 group-hover:opacity-100 group-hover:translate-x-0'
              }`}>
                {String(idx).padStart(2, '0')} {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionRail;
