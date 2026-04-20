import React, { useState, useEffect } from 'react';

const TerminalText = ({ commands, delay = 0 }) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, delay + 2500); // Start slightly after preloader finishes

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted || currentCommandIndex >= commands.length) return;

    const currentCommand = commands[currentCommandIndex];
    let charIndex = 0;
    
    // Si el comando debe ser tipeado
    if (currentCommand.type === 'input') {
      setIsTyping(true);
      const typingInterval = setInterval(() => {
        if (charIndex <= currentCommand.text.length) {
          setText(currentCommand.text.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          // Wait before moving to next command
          setTimeout(() => {
            setCurrentCommandIndex(prev => prev + 1);
          }, currentCommand.postDelay || 500);
        }
      }, currentCommand.speed || 50);

      return () => clearInterval(typingInterval);
    } 
    // Si el comando es una salida directa de consola (ej: "[OK] Sistema iniciado")
    else if (currentCommand.type === 'output') {
      setIsTyping(false);
      setText(currentCommand.text);
      const outputTimer = setTimeout(() => {
        setCurrentCommandIndex(prev => prev + 1);
      }, currentCommand.postDelay || 800);
      
      return () => clearTimeout(outputTimer);
    }

  }, [currentCommandIndex, hasStarted, commands]);

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  if (!hasStarted) return <div className="h-4"></div>;

  const currentCommand = commands[Math.min(currentCommandIndex, commands.length - 1)];

  return (
    <div className="font-mono text-xs sm:text-sm text-green-800 flex items-center h-4 sm:h-5">
      {currentCommand?.type === 'input' && (
        <span className="mr-2 text-stone-400">~</span>
      )}
      <span>{currentCommand?.type === 'output' ? currentCommand.text : text}</span>
      {(isTyping || currentCommandIndex < commands.length) && (
        <span className={`inline-block w-2 h-3 ml-1 bg-green-800 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
      )}
    </div>
  );
};

export default TerminalText;