import React, { useState, useEffect } from 'react';

const CertificationModal = ({ certification, isOpen, onClose, language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const images = certification ? (certification.images || [certification.image]) : [];

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

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

  if (!certification) return null;

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
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-green-800 dark:text-green-500 mb-1">{certification.issuer}</span>
            <h3 className="text-xl sm:text-2xl font-serif text-dark dark:text-[#f7f5f0]">{certification.title}</h3>
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
        <div className="flex-1 overflow-y-auto max-h-[calc(90vh-100px)]" data-lenis-prevent>
          {/* Certificate Image — Full Size */}
          <div 
            className="relative w-full bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-800 flex flex-col items-center justify-center p-8 sm:p-12 group/modal-carousel"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full max-w-[600px] aspect-[4/3] flex items-center justify-center">
              <img 
                src={images[currentImageIndex]} 
                alt={`${certification.title} view ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-all duration-300"
              />
              
              {/* Carousel Controls */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-stone-50/80 dark:bg-black/50 backdrop-blur-md text-dark dark:text-white border border-white/20 hover:bg-white dark:hover:bg-green-500/20 hover:text-green-800 dark:hover:text-green-500 hover:scale-110 transition-all opacity-0 group-hover/modal-carousel:opacity-100 focus:opacity-100"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-stone-50/80 dark:bg-black/50 backdrop-blur-md text-dark dark:text-white border border-white/20 hover:bg-white dark:hover:bg-green-500/20 hover:text-green-800 dark:hover:text-green-500 hover:scale-110 transition-all opacity-0 group-hover/modal-carousel:opacity-100 focus:opacity-100"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-6">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'w-6 bg-green-600 dark:bg-green-500' : 'bg-stone-400 dark:bg-stone-500 hover:bg-stone-600 dark:hover:bg-stone-300'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            {/* Completed Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-xs font-mono text-green-800 dark:text-green-500 w-fit">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
              {language === 'es' ? 'Completado' : 'Completed'} · {certification.date}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-stone-500 mb-3">{language === 'es' ? 'Descripción' : 'Description'}</h4>
              <p className="text-base sm:text-lg font-light text-warm-gray dark:text-stone-300 leading-relaxed">
                {certification.description}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/50 mt-4 flex flex-wrap gap-4">
              <a 
                href={certification.verifyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-dark dark:bg-green-500 text-white dark:text-[#141410] px-8 py-3 rounded-xl hover:bg-green-800 dark:hover:bg-green-400 transition-colors font-medium group flex-1 sm:flex-none"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                {language === 'es' ? 'Verificar en Credly' : 'Verify on Credly'}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationModal;
