import React from 'react';
import { personalInfo } from '../config/data';

function Footer() {
  return (
    <footer className="bg-[#141410] text-stone-500 text-sm py-8 px-6 border-t border-stone-800">
      <div className="max-w-[900px] mx-auto flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.</p>
        <p className="mt-2 md:mt-0 font-light text-stone-500">
          Diseñado y desarrollado con dedicación.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
