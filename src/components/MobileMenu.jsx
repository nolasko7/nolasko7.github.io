import React, { useState, useEffect } from 'react';

const MobileMenu = ({ isOpen, setIsOpen, personalInfo }) => {
  const [touchStartY, setTouchStartY] = useState(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTranslateY(0);
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setTranslateY(0), 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStartY) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;
    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (translateY > 100) {
      setIsOpen(false);
    } else {
      setTranslateY(0);
    }
    setTouchStartY(null);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 min-h-screen bg-stone-900/60 backdrop-blur-sm z-[90] transition-opacity duration-400 sm:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white dark:bg-[#141410] rounded-t-[2.5rem] z-[100] transform transition-transform sm:hidden flex flex-col`}
        style={{ 
          transform: `translateY(${isOpen ? Math.max(0, translateY) : 100}%)`,
          transitionDuration: touchStartY ? '0ms' : '500ms',
          transitionTimingFunction: touchStartY ? 'linear' : 'cubic-bezier(0.19,1,0.22,1)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full flex justify-center pt-5 pb-2 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full"></div>
        </div>

        <div className="px-6 pb-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2 px-2">Navegación</span>
            <a href="#proyectos" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 dark:hover:bg-[#1a1a15] transition-colors group">
              <span className="text-2xl font-serif text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-500 transition-colors">Proyectos</span>
              <svg className="w-5 h-5 text-stone-300 dark:text-stone-700 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
            </a>
            <a href="#skills" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 dark:hover:bg-[#1a1a15] transition-colors group">
              <span className="text-2xl font-serif text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-500 transition-colors">Habilidades</span>
              <svg className="w-5 h-5 text-stone-300 dark:text-stone-700 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
            </a>
            <a href="#sobre-mi" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 dark:hover:bg-[#1a1a15] transition-colors group">
              <span className="text-2xl font-serif text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-500 transition-colors">Sobre Mí</span>
              <svg className="w-5 h-5 text-stone-300 dark:text-stone-700 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
            </a>
            <a href="#contacto" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 dark:hover:bg-[#1a1a15] transition-colors group">
              <span className="text-2xl font-serif text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-500 transition-colors">Contacto</span>
              <svg className="w-5 h-5 text-stone-300 dark:text-stone-700 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>

          <div className="w-full h-[1px] bg-stone-100 dark:bg-stone-800/50"></div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 px-2">Descargar CV</span>
            <div className="grid grid-cols-2 gap-3">
              <a href={personalInfo.cvUrlEs} download className="flex items-center justify-center gap-2 bg-stone-100 dark:bg-stone-800/50 text-dark dark:text-[#f7f5f0] py-3.5 rounded-xl font-medium text-sm hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-800 dark:hover:text-green-500 transition-colors">
                ESPAÑOL
              </a>
              <a href={personalInfo.cvUrlEn} download className="flex items-center justify-center gap-2 bg-stone-100 dark:bg-stone-800/50 text-dark dark:text-[#f7f5f0] py-3.5 rounded-xl font-medium text-sm hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-800 dark:hover:text-green-500 transition-colors">
                INGLÉS
              </a>
            </div>
            
            <div className="flex justify-between items-center px-2 mt-4">
              <a href={`mailto:${personalInfo.email}`} onClick={() => setIsOpen(false)} className="p-3 rounded-full bg-stone-50 dark:bg-stone-800/30 text-stone-500 dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </a>
              <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="p-3 rounded-full bg-stone-50 dark:bg-stone-800/30 text-stone-500 dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.3l-1.5 5.5 5.5-1.5c1.55.95 3.36 1.5 5.3 1.5 5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.71 14.5c-.24.71-1.39 1.34-1.99 1.41-.53.06-1.18.17-3.83-.93-3.19-1.32-5.18-4.66-5.34-4.88-.16-.22-1.28-1.74-1.28-3.32 0-1.58.82-2.37 1.11-2.68.29-.31.63-.39.84-.39.21 0 .42.01.61.02.21.01.49-.08.76.57.29.71 1 2.45 1.09 2.65.09.2.14.43.01.69-.13.26-.2.43-.39.67-.18.24-.39.51-.55.69-.18.2-.38.41-.16.8 2.21.84 3.72 1.48 5.76 2.31.2.08.32.13.44.03.11-.1.49-.57.62-.77.13-.2.13-.37.09-.41-.04-.04-.15-.07-.31-.15l-1.87-.93c-.31-.15-.54-.25-.62-.41-.07-.16-.07-.32.01-.48z" /></svg>
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="p-3 rounded-full bg-stone-50 dark:bg-stone-800/30 text-stone-500 dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="p-3 rounded-full bg-stone-50 dark:bg-stone-800/30 text-stone-500 dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;