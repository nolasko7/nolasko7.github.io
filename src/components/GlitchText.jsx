import React, { useState, useEffect, useRef } from 'react';

// Caracteres que se usarán para el efecto de encriptación/glitch
const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const GlitchText = ({ text, className = "", ...props }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isHovered) {
      clearInterval(intervalRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          // Si es un espacio, lo respetamos siempre
          if (letter === ' ') return ' ';
          
          // Si la iteración ya pasó esta letra, mostramos la letra real
          if (index < iteration) {
            return text[index];
          }
          
          // Si no, mostramos un caracter aleatorio
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("")
      );
      
      // Cuando ya resolvimos todas las letras, detenemos el intervalo
      if (iteration >= text.length) { 
        clearInterval(intervalRef.current);
      }
      
      // La velocidad a la que se van revelando las letras reales. 
      // Números menores hacen el efecto más duradero.
      iteration += 1 / 3; 
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [isHovered, text]);

  return (
    <span 
      className={`inline-block font-mono sm:font-sans ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;