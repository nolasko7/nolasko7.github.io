import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef(null);
  const trailingRef = useRef(null);
  const requestRef = useRef(null);

  // Mantenemos la posición real (mouse) y la retrasada (trailing)
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
      // El trailing sigue al cursor real a un ritmo del 15% por frame (genera un "delay" súper suave)
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
      // Expandir en enlaces y botones (y tarjetas con as="a")
      if (e.target.closest('a') || e.target.closest('button')) {
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

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('cursor-none-global');
    };
  }, [isVisible, isTouchDevice]); // Removed isHovering from deps to maintain loop stability

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Capa 1: Punto sólido principal */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full mix-blend-difference"
        style={{
          width: isHovering ? '0px' : '8px',
          height: isHovering ? '0px' : '8px',
          backgroundColor: 'white',
          transition: 'width 0.3s cubic-bezier(0.76, 0, 0.24, 1), height 0.3s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      />
      
      {/* Capa 2: Anillo expansivo que se adapta al fondo */}
      <div
        ref={trailingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          width: isHovering ? '44px' : '36px',
          height: isHovering ? '44px' : '36px',
          backgroundColor: 'white',
          opacity: isHovering ? 0.15 : 0.3,
          transition: 'width 0.4s cubic-bezier(0.76, 0, 0.24, 1), height 0.4s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      />
    </>
  );
};

export default CustomCursor;