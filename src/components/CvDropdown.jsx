import { useEffect, useRef } from 'react';

export default function CvDropdown({ personalInfo, isOpen, onClose, position = 'bottom' }) {
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Small delay to prevent immediate close from the same click that opens it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const positionClasses = position === 'top'
    ? 'bottom-full mb-3 left-1/2 -translate-x-1/2'
    : 'top-full mt-3 left-0 sm:left-1/2 sm:-translate-x-1/2';

  const cvOptions = [
    {
      label: personalInfo.cvDeveloperLabel,
      url: personalInfo.cvDeveloperUrl,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      subtitle: '< / >',
    },
    {
      label: personalInfo.cvCybersecurityLabel,
      url: personalInfo.cvCybersecurityUrl,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      subtitle: '🔒',
    },
  ];

  return (
    <div
      ref={dropdownRef}
      className={`absolute ${positionClasses} z-[200] w-64 transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isOpen
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white/90 dark:bg-[#1a1a16]/90 backdrop-blur-xl border border-stone-200/60 dark:border-stone-800/60 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-stone-200/40 dark:border-stone-800/40 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500">
            {personalInfo.cvSelectTitle}
          </span>
        </div>

        {/* Options */}
        <div className="p-2 flex flex-col gap-1">
          {cvOptions.map((option, idx) => (
            <a
              key={idx}
              href={option.url}
              download
              onClick={onClose}
              className="group flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-green-50/80 dark:hover:bg-green-500/10 border border-transparent hover:border-green-200/60 dark:hover:border-green-500/20 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800/80 flex items-center justify-center text-stone-500 dark:text-stone-400 group-hover:bg-green-100 dark:group-hover:bg-green-500/20 group-hover:text-green-700 dark:group-hover:text-green-400 transition-all duration-200 flex-shrink-0">
                {option.icon}
              </div>
              <div className="flex-grow min-w-0">
                <span className="block text-sm font-medium text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors truncate">
                  {option.label}
                </span>
                <span className="block text-[10px] font-mono text-stone-400 dark:text-stone-500">
                  {option.subtitle}
                </span>
              </div>
              <svg className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-green-500 transition-all duration-200 flex-shrink-0 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
