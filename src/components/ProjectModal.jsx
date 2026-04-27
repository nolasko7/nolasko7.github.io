import React, { useState, useEffect } from 'react';

const ProjectModal = ({ project, isOpen, onClose, language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Reset index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  const images = project.images || [];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDotClick = (index) => {
    if (isAnimating || currentImageIndex === index) return;
    setIsAnimating(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/80 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-4xl bg-stone-50 dark:bg-[#0a0a08] border border-stone-200/50 dark:border-stone-800/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-200/50 dark:border-stone-800/50 bg-white/50 dark:bg-[#141410]/50 backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-green-800 dark:text-green-500 mb-1">{project.type}</span>
            <h3 className="text-xl sm:text-2xl font-serif text-dark dark:text-[#f7f5f0]">{project.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800/50 text-dark dark:text-stone-400 hover:text-red-500 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body Container (Scrollable) */}
        <div className="flex-1 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Image Carousel */}
          <div 
            className="relative w-full aspect-video bg-stone-200 dark:bg-stone-900 group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {images.length > 0 ? (
              <>
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain bg-black/5 dark:bg-transparent transition-opacity duration-300"
                />
                
                {/* Carousel Controls Overlay */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-stone-50/80 dark:bg-black/50 backdrop-blur-md text-dark dark:text-white border border-white/20 hover:bg-white dark:hover:bg-green-500/20 hover:text-green-800 dark:hover:text-green-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button 
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-stone-50/80 dark:bg-black/50 backdrop-blur-md text-dark dark:text-white border border-white/20 hover:bg-white dark:hover:bg-green-500/20 hover:text-green-800 dark:hover:text-green-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-50/50 dark:bg-black/50 backdrop-blur-md border border-white/10">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDotClick(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'w-6 bg-green-600 dark:bg-green-500' : 'bg-stone-400 dark:bg-stone-500 hover:bg-stone-600 dark:hover:bg-stone-300'}`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
               <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 dark:text-stone-600">
                  <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                  <p className="font-mono text-sm">No images available</p>
               </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-stone-500 mb-3">{language === 'es' ? 'Descripción' : 'Description'}</h4>
              <p className="text-base sm:text-lg font-light text-warm-gray dark:text-stone-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.problemSolved && (
              <div>
                <h4 className="text-sm font-mono uppercase tracking-widest text-green-800 dark:text-green-500 mb-3">{language === 'es' ? 'El Problema Resuelto' : 'The Problem Solved'}</h4>
                <p className="text-base sm:text-lg font-light text-warm-gray dark:text-stone-300 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-stone-500 mb-3">{language === 'es' ? 'Tecnologías' : 'Technologies'}</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-stone-100 dark:bg-stone-900/50 text-sm rounded-full text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-800/50 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.link && project.link !== '#' && (
              <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/50 mt-4">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-dark dark:bg-green-500 text-white dark:text-[#141410] px-8 py-3 rounded-xl hover:bg-green-800 dark:hover:bg-green-400 transition-colors font-medium group"
                >
                  {language === 'es' ? 'Visitar Proyecto' : 'Visit Project'}
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;