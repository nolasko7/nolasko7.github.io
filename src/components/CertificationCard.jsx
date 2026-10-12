import { useState } from 'react';
import SpotlightCard from './SpotlightCard';

const icons = {
  cloud: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
};

const statusStyles = {
  completed: {
    chip: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-800 dark:text-green-500',
    dot: 'bg-green-500',
    bar: 'bg-green-500',
    label: 'certCompleted',
  },
  in_progress: {
    chip: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400',
    dot: 'bg-amber-500 animate-pulse',
    bar: 'bg-amber-500',
    label: 'certInProgress',
  },
  discontinued: {
    chip: 'bg-stone-100 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400',
    dot: 'bg-stone-400',
    bar: 'bg-stone-400 dark:bg-stone-500',
    label: 'certDiscontinued',
  },
};

const StatusChip = ({ certification, sections }) => {
  const style = statusStyles[certification.status] || statusStyles.in_progress;
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4 w-fit ${style.chip}`}>
      {certification.status === 'completed' ? (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ) : (
        <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
      )}
      {sections[style.label]}
      {certification.progress != null && ` · ${certification.progress}%`}
    </div>
  );
};

const CertificationCard = ({ certification, sections, language, onOpen }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const images = certification.images || (certification.image ? [certification.image] : []);

  // Compact card for certifications without images (in progress)
  if (images.length === 0) {
    return (
      <SpotlightCard
        as="div"
        className="block bg-white rounded-2xl shadow-sm hover:shadow-md hover-lift transition-all duration-500 overflow-hidden h-full"
        innerClassName="w-full h-full p-6 md:p-8 flex flex-col"
      >
        <div className="flex items-start justify-between gap-4">
          <StatusChip certification={certification} sections={sections} />
          <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800/80 flex items-center justify-center text-stone-500 dark:text-stone-400 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[certification.icon] || icons.shield}</svg>
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-serif text-dark mb-2">{certification.title}</h3>
        <p className="text-sm font-mono text-warm-gray mb-1">{certification.issuer}</p>
        <p className="text-xs font-mono text-stone-400 mb-4">{certification.date}</p>
        <p className="font-light leading-relaxed text-warm-gray text-sm flex-grow">{certification.description}</p>
        {certification.progress != null && (
          <div className="mt-6">
            <div className="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div className={`h-full rounded-full ${(statusStyles[certification.status] || statusStyles.in_progress).bar}`} style={{ width: `${certification.progress}%` }}></div>
            </div>
          </div>
        )}
        {certification.verifyUrl && (
          <a href={certification.verifyUrl} target="_blank" rel="noreferrer" className="mt-6 text-sm font-medium text-green-800 dark:text-green-500 hover:underline w-fit">
            {language === 'es' ? 'Ver perfil' : 'View profile'} →
          </a>
        )}
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard
      as="div"
      onClick={onOpen}
      className="block bg-white rounded-2xl shadow-sm hover:shadow-xl hover-lift transition-all duration-500 overflow-hidden cursor-pointer group"
      innerClassName="w-full h-full"
    >
      <div className="flex flex-col md:flex-row">
        {/* Badge Image */}
        <div className="md:w-2/5 p-6 md:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900/50 dark:to-stone-800/30 border-b md:border-b-0 md:border-r border-stone-200/50 dark:border-stone-700/50 relative group/carousel">
          <div className="relative w-full max-w-[280px] aspect-[4/3] flex items-center justify-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <img
              src={images[currentImgIndex]}
              alt={certification.title}
              className="relative max-w-full max-h-full object-contain rounded-xl shadow-lg group-hover/carousel:shadow-2xl transition-all duration-500"
            />

            {/* Arrow Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm text-dark dark:text-white border border-stone-200/50 dark:border-stone-800/50 shadow-md hover:bg-white dark:hover:bg-green-500/20 hover:text-green-800 dark:hover:text-green-500 transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm text-dark dark:text-white border border-stone-200/50 dark:border-stone-800/50 shadow-md hover:bg-white dark:hover:bg-green-500/20 hover:text-green-800 dark:hover:text-green-500 transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          {images.length > 1 && (
            <div className="flex gap-1.5 mt-4 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentImgIndex === idx ? 'w-4 bg-green-600 dark:bg-green-500' : 'bg-stone-300 dark:bg-stone-600 hover:bg-stone-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        {/* Cert Info */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
          <StatusChip certification={certification} sections={sections} />
          <h3 className="text-2xl md:text-3xl font-serif text-dark mb-2">{certification.title}</h3>
          <p className="text-sm font-mono text-warm-gray mb-1">{certification.issuer}</p>
          <p className="text-xs font-mono text-stone-400 mb-4">{certification.date}</p>
          <p className="font-light leading-relaxed text-warm-gray mb-6">{certification.description}</p>
          {certification.verifyUrl && (
            <a
              href={certification.verifyUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-full text-sm font-medium text-green-800 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              {language === 'es' ? 'Verificar en Credly' : 'Verify on Credly'}
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default CertificationCard;
