import React, { useEffect } from 'react';
import { personalInfo } from '../config/data';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Contacts() {
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#141410] text-stone-300 min-h-screen flex flex-col justify-center pt-32 pb-8 px-6">
      <div className="max-w-[900px] mx-auto w-full flex-grow flex flex-col justify-center">
        <div className="mb-24 reveal">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            ¿Listo para empezar? <br/><span className="text-green-800 italic text-3xl md:text-4xl">Hablemos ahora.</span>
          </h2>
          <p className="font-light text-lg mb-12 max-w-md text-stone-400">
            Estoy disponible para proyectos freelance o unirme a un gran equipo. Escríbeme y charlemos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <a href={`mailto:${personalInfo.email}`} className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-800 p-6 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5 text-stone-400 group-hover:text-green-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-medium text-white">Email</span>
                  <span className="text-xs text-stone-400 truncate w-32 sm:w-48">{personalInfo.email}</span>
                </div>
              </div>
            </a>
            
            {/* WhatsApp */}
            <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-800 p-6 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5 text-stone-400 group-hover:text-green-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.3l-1.5 5.5 5.5-1.5c1.55.95 3.36 1.5 5.3 1.5 5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.71 14.5c-.24.71-1.39 1.34-1.99 1.41-.53.06-1.18.17-3.83-.93-3.19-1.32-5.18-4.66-5.34-4.88-.16-.22-1.28-1.74-1.28-3.32 0-1.58.82-2.37 1.11-2.68.29-.31.63-.39.84-.39.21 0 .42.01.61.02.21.01.49-.08.76.57.29.71 1 2.45 1.09 2.65.09.2.14.43.01.69-.13.26-.2.43-.39.67-.18.24-.39.51-.55.69-.18.2-.38.41-.16.8 2.21.84 3.72 1.48 5.76 2.31.2.08.32.13.44.03.11-.1.49-.57.62-.77.13-.2.13-.37.09-.41-.04-.04-.15-.07-.31-.15l-1.87-.93c-.31-.15-.54-.25-.62-.41-.07-.16-.07-.32.01-.48z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-medium text-white">WhatsApp</span>
                  <span className="text-xs text-stone-400">+54 9 2657 359495</span>
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-800 p-6 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5 text-stone-400 group-hover:text-green-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-medium text-white">GitHub</span>
                  <span className="text-xs text-stone-400">@nolasko7</span>
                </div>
              </div>
            </a>
            
            {/* LinkedIn */}
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-800 p-6 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5 text-stone-400 group-hover:text-green-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-medium text-white">LinkedIn</span>
                  <span className="text-xs text-stone-400 truncate w-32 sm:w-48">/in/valentin-nolasco</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
