import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../config/data';

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50">
      <div className="max-w-[900px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl text-dark tracking-tight">{personalInfo.name}.</Link>
        <div className="hidden sm:flex gap-8 text-sm uppercase tracking-widest">
          <Link to="/#proyectos" className="hover:text-dark transition-colors">Proyectos</Link>
          <Link to="/#skills" className="hover:text-dark transition-colors">Skills</Link>
          <Link to="/#sobre-mi" className="hover:text-dark transition-colors">Sobre Mí</Link>
          <Link to="/contacts" className="hover:text-dark transition-colors">Contacto</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
