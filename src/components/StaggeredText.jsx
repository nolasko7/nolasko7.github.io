import React, { useEffect, useState } from 'react';

const StaggeredText = ({ text, highlightWords = [], delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // El preloader toma exactamente 2200ms aprox en subir el telón.
    // Damos un margen generoso (2800ms) para asegurarnos de que la animación
    // ocurra a la vista del usuario.
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay + 2800);
    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(" ").filter(w => w !== "");

  return (
    <span className="inline-block">
      {words.map((word, i) => {
        // Extraemos puntuación para no separarla de la palabra destacada
        const match = word.match(/^(.*?)([.?,!]*)$/);
        const cleanWord = match[1];
        const punctuation = match[2];
        const isHighlight = highlightWords.includes(cleanWord);

        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.25em] pb-1 -mb-1">
            <span
              className={`inline-block transform transition-all duration-[800ms] ease-out ${
                isVisible ? 'translate-y-0 rotate-0 opacity-100' : 'translate-y-[100%] rotate-[5deg] opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {isHighlight ? (
                <span className="italic text-green-800">
                  {cleanWord}{punctuation}
                </span>
              ) : (
                <span>
                  {cleanWord}{punctuation}
                </span>
              )}
            </span>
          </span>
        );
      })}
    </span>
  );
};

export default StaggeredText;