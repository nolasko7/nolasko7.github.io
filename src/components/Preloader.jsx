import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  
  const fullText = "Valentin Nolasco.";

  useEffect(() => {
    // Bloquear el scroll durante la pantalla de carga
    document.body.style.overflow = 'hidden';
    
    let currentIndex = 0;
    // Efecto de tipeo
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        setProgress(Math.round((currentIndex / fullText.length) * 100));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Esperamos un momento para que el usuario lea el nombre y luego subimos el telón
        setTimeout(() => {
          setIsLeaving(true);
        }, 800);
      }
    }, 80); // Velocidad de tipeo, 80ms por letra da un buen ritmo

    return () => {
      clearInterval(typingInterval);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (isLeaving) {
      // Remover el componente del DOM después de la animación (1000ms)
      const timer = setTimeout(() => {
        setIsRemoved(true);
        document.body.style.overflow = '';
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [isLeaving]);

  if (isRemoved) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#141410] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isLeaving ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-lg px-6">
        <div className="w-full flex justify-between items-end mb-4 overflow-hidden">
          <span className="font-mono text-[10px] sm:text-xs text-stone-500 uppercase tracking-widest opacity-80">
            System Initializing
          </span>
          <span className="font-mono text-sm sm:text-base text-green-500 font-medium">
            {progress.toString().padStart(3, '0')}%
          </span>
        </div>
        
        <div className="flex items-center w-full justify-center relative">
          <span className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#f7f5f0] tracking-tight whitespace-nowrap">
            {text}
          </span>
          {/* Cursor parpadeante verde */}
          <span 
            className={`w-[3px] sm:w-[4px] h-10 sm:h-12 md:h-16 ml-2 bg-green-800 ${
              isTyping ? 'animate-pulse' : 'opacity-0 transition-opacity duration-500'
            }`}
          ></span>
        </div>
        
        {/* Barra de progreso decorativa en la parte inferior */}
        <div className="absolute bottom-12 w-48 h-[1px] bg-stone-800 overflow-hidden">
          <div 
            className="h-full bg-green-800 transition-all ease-out"
            style={{ 
              width: `${progress}%`,
              transitionDuration: '80ms'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;