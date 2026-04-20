const fs = require('fs');

const filepath = "D:\\Users\\valen\\OneDrive\\Desktop\\Proyectos\\Portfolio\\src\\App.jsx";
let content = fs.readFileSync(filepath, "utf-8");

const importStatement = `import MobileMenu from './components/MobileMenu';\n`;
if (!content.includes('MobileMenu')) {
  content = content.replace(`import TerminalText from './components/TerminalText';`, `import TerminalText from './components/TerminalText';\nimport MobileMenu from './components/MobileMenu';`);
}

const new_nav = `      <nav className={\`fixed top-0 w-full z-50 transition-all duration-300 \${isScrolled || isMobileMenuOpen ? 'bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50 py-2' : 'bg-transparent py-4'}\`}>
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between relative z-50">
          <span className="font-serif text-xl text-dark tracking-tight">{personalInfo.name}</span>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6 text-xs font-medium uppercase tracking-widest whitespace-nowrap">
            <a href="#proyectos" className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text="Proyectos" /></a>
            <a href="#skills" className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text="Skills" /></a>
            <a href="#sobre-mi" className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text="Sobre Mí" /></a>
            <a href="#contacto" className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text="Contacto" /></a>

            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-stone-200/50 text-dark transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex sm:hidden items-center gap-1">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-stone-200/50 text-dark transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="relative w-10 h-10 flex flex-col items-end justify-center gap-[5px] p-2 rounded-full hover:bg-stone-200/50 transition-colors z-[110]"
              aria-label="Toggle Mobile Menu"
            >
              <span className={\`h-[2px] bg-dark dark:bg-[#f7f5f0] rounded-full transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] \${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}\`}></span>
              <span className={\`h-[2px] bg-dark dark:bg-[#f7f5f0] rounded-full transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] \${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}\`}></span>
              <span className={\`h-[2px] bg-dark dark:bg-[#f7f5f0] rounded-full transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] \${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5'}\`}></span>
            </button>
          </div>
        </div>

        <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} personalInfo={personalInfo} />
      </nav>`;

content = content.replace(/      {/\* Navigation \*\/}[\s\S]*?      <\/nav>/, new_nav);

fs.writeFileSync(filepath, content, "utf-8");
