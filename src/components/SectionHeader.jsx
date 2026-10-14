import { useEffect, useRef, useState } from 'react';

const GLYPHS = '#%&$@01<>/\\[]{}*+=';
const DURATION = 700;

const SectionHeader = ({ number, title }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(title);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.6 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Scramble → decrypt the title once visible (and again when the language changes)
  useEffect(() => {
    if (!isVisible) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;
    const start = performance.now();
    const tick = (now) => {
      const progress = reduced ? 1 : Math.min(1, (now - start) / DURATION);
      const revealed = Math.floor(progress * title.length);
      setDisplay(
        title
          .split('')
          .map((char, i) => (i < revealed || char === ' ' ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, title]);

  return (
    // Mobile: number + line on top, title below (avoids the title wrapping next to the number)
    <div ref={ref} className="flex flex-col items-start gap-3 mb-10 sm:flex-row sm:items-center sm:gap-6 sm:mb-16 reveal">
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="text-sm font-mono text-green-700 dark:text-green-500 flex items-center gap-1">
          {number}
          <span className="inline-block w-1.5 h-3.5 bg-current animate-pulse"></span>
        </span>
        <div className="h-[1px] w-10 bg-gradient-to-r from-green-500/60 to-stone-200 dark:to-stone-800"></div>
      </div>
      <h2 className="text-[28px] leading-tight sm:text-3xl font-serif text-[#141410] dark:text-[#f7f5f0] transition-colors" aria-label={title}>
        <span aria-hidden="true">{isVisible ? display : title}</span>
      </h2>
    </div>
  );
};

export default SectionHeader;
