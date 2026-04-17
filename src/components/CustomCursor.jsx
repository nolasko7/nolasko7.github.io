import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorRef = useRef(null);
  const trailingRef = useRef(null);
  const requestRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const trailing = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detectamos si es un dispositivo táctil
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTouchDevice(true);
      return;
    }

    // Ocultamos el cursor por defecto del sistema
    document.body.classList.add('cursor-none-global');

    // Función de interpolación lineal (Lerp) para suavizar el movimiento a 60fps
    const animate = () => {
      // El trailing sigue al cursor real
      trailing.current.x += (mouse.current.x - trailing.current.x) * 0.15;
      trailing.current.y += (mouse.current.y - trailing.current.y) * 0.15;

      if (cursorRef.current && trailingRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
        trailingRef.current.style.transform = `translate3d(${trailing.current.x}px, ${trailing.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      // Si estamos sobre un enlace o botón, activamos el estado hovering
      if (e.target.closest('a, button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseOut = (e) => {
      if (!e.relatedTarget) {
        setIsVisible(false); // Salir de la pantalla
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('cursor-none-global');
    };
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Capa 1: Punto sólido principal */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-green-800 dark:bg-green-500 transition-all duration-200 ease-out ${
          isHovering ? 'w-0 h-0 opacity-0' : 'w-2 h-2 opacity-100'
        }`}
      />
      
      {/* Capa 2: Anillo expansivo */}
      <div
        ref={trailingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-green-800 dark:bg-green-500 transition-all duration-300 ease-out ${
          isHovering ? 'w-12 h-12 opacity-15' : 'w-8 h-8 opacity-30'
        }`}
      />
    </>
  );
};

export default CustomCursor;