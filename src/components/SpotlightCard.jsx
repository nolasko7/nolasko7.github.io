import React, { useRef, useState } from 'react';

const SpotlightCard = ({ children, className = '', innerClassName = '', style = {}, as = 'div', ...props }) => {
  const Component = as;
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Component
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(42, 92, 69, 0.08), transparent 40%)`,
        }}
      />
      <div className={`relative z-10 ${innerClassName}`}>
        {children}
      </div>
    </Component>
  );
};

export default SpotlightCard;