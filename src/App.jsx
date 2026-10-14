import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { useScrollReveal } from './hooks/useScrollReveal';
import { portfolioData } from './config/data';
import CustomCursor from './components/CustomCursor';
import AnimatedCounter from './components/AnimatedCounter';
import TechMarquee from './components/TechMarquee';
import Preloader from './components/Preloader';
import SpotlightCard from './components/SpotlightCard';
import StaggeredText from './components/StaggeredText';
import GlitchText from './components/GlitchText';
import TerminalText from './components/TerminalText';
import ContactForm from './components/ContactForm';
import ProjectModal from './components/ProjectModal';
import CertificationModal from './components/CertificationModal';
import CertificationCard from './components/CertificationCard';
import NetworkBackground from './components/NetworkBackground';
import PipelineSection from './components/PipelineSection';
import InteractiveTerminal from './components/InteractiveTerminal';
import SectionRail from './components/SectionRail';
import ScrollStack, { ScrollStackItem } from './components/reactbits/ScrollStack';
import { FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
// Heavy below-the-fold components are loaded on demand to keep the initial bundle small
const FaultyTerminal = lazy(() => import('./components/reactbits/FaultyTerminal'));
const Dock = lazy(() => import('./components/reactbits/Dock'));
import TerminalSkills from './components/TerminalSkills';
import SectionHeader from './components/SectionHeader';
import CvDropdown from './components/CvDropdown';

function App() {
  useScrollReveal();
  const [language, setLanguage] = useState('es');
  const { personalInfo, projects, skills, certifications, nav, hero, sections } = portfolioData[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage) && true);
    }
    return true;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cvDropdownContext, setCvDropdownContext] = useState(null); // 'hero' | 'mobile' | null

  const lenisRef = useRef(null);
  const heroRef = useRef(null);

  // Smooth Scroll Initialization (Lenis)
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current.destroy();
    };
  }, []);

  // Pause/Resume Lenis when modals are open/closed
  useEffect(() => {
    if (isProjectModalOpen || isCertModalOpen || isTerminalOpen) {
      lenisRef.current?.stop();
      document.body.classList.add('lenis-stopped');
    } else {
      lenisRef.current?.start();
      document.body.classList.remove('lenis-stopped');
    }
  }, [isProjectModalOpen, isCertModalOpen, isTerminalOpen]);

  // Open the interactive terminal with ` or Ctrl+K
  useEffect(() => {
    const handleKey = (e) => {
      const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if ((e.key === '`' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsTerminalOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const scrollTo = (target) => {
    lenisRef.current?.scrollTo(target, {
      offset: -80,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      setIsScrolled(winScroll > 20);
      setShowBackToTop(scrolled > 50);

      const progressElement = document.getElementById("scroll-progress");
      if (progressElement) {
        progressElement.style.width = scrolled + "%";
      }

      // Hero parallax: content drifts up slower and fades out
      const hero = heroRef.current;
      if (hero && !reducedMotion && winScroll < 1200) {
        hero.style.translate = `0 ${winScroll * 0.35}px`;
        hero.style.opacity = Math.max(0, 1 - winScroll / 450);
      }
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-warm-gray font-sans selection:bg-green-800 selection:text-[#f7f5f0] relative z-0">
      {/* Decorative Background Elements */}
      <div className="bg-grid"></div>
      <NetworkBackground />

      <Preloader />
      <CustomCursor />
      <div id="scroll-progress"></div>
      <SectionRail
        scrollTo={scrollTo}
        items={[
          { id: 'top', label: language === 'es' ? 'inicio' : 'home' },
          { id: 'proyectos', label: nav.projects },
          { id: 'skills', label: nav.skills },
          { id: 'certificaciones', label: sections.certificationsTitle },
          { id: 'pipeline', label: 'pipeline' },
          { id: 'sobre-mi', label: nav.about },
          { id: 'contacto', label: nav.contact },
        ]}
      />
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50 py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between relative z-50">
          <button onClick={() => scrollTo(0)} className="font-serif text-xl text-dark tracking-tight hover:text-green-800 dark:hover:text-green-500 transition-colors active:scale-95 origin-left">{personalInfo.name}</button>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6 text-xs font-medium uppercase tracking-widest whitespace-nowrap">
            <a href="#proyectos" onClick={(e) => { e.preventDefault(); scrollTo('#proyectos'); }} className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text={nav.projects} /></a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('#skills'); }} className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text={nav.skills} /></a>
            <a href="#sobre-mi" onClick={(e) => { e.preventDefault(); scrollTo('#sobre-mi'); }} className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text={nav.about} /></a>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollTo('#contacto'); }} className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text={nav.contact} /></a>

            <button
              onClick={() => setIsTerminalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg border border-stone-200/60 dark:border-green-500/30 font-mono text-xs text-dark dark:text-green-400 hover:border-green-500 hover:text-green-800 dark:hover:bg-green-500/10 transition-colors normal-case tracking-normal"
              aria-label="Open terminal"
              title="Terminal ( ` / Ctrl+K )"
            >
              &gt;_
            </button>

            <button 
              onClick={() => setLanguage(lang => lang === 'es' ? 'en' : 'es')} 
              className="p-2 rounded-full hover:bg-stone-200/50 text-dark transition-colors group relative"
              aria-label="Toggle Language"
            >
              <svg className="w-5 h-5 text-stone-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>
              <span className="absolute -bottom-1 -right-1 text-[8px] font-mono font-bold bg-stone-100 dark:bg-stone-800 px-1 rounded-sm text-stone-500">{language.toUpperCase()}</span>
            </button>

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
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="px-2 py-1 rounded-lg border border-stone-200/60 dark:border-green-500/30 font-mono text-xs text-dark dark:text-green-400"
              aria-label="Open terminal"
            >
              &gt;_
            </button>
            <button 
              onClick={() => setLanguage(lang => lang === 'es' ? 'en' : 'es')} 
              className="p-2 rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800/50 text-dark dark:text-stone-300 transition-colors group relative"
              aria-label="Toggle Language"
            >
              <svg className="w-5 h-5 text-stone-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>
              <span className="absolute -bottom-1 -right-1 text-[8px] font-mono font-bold bg-stone-100 dark:bg-stone-800 px-1 rounded-sm text-stone-500">{language.toUpperCase()}</span>
            </button>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800/50 text-dark dark:text-stone-300 transition-colors"
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
              className="flex items-center gap-2 px-3 py-1.5 whitespace-nowrap rounded-lg border border-stone-200/50 dark:border-stone-800/50 bg-stone-100/30 dark:bg-[#141410]/30 hover:bg-stone-200/50 dark:hover:border-green-500/50 text-dark dark:text-stone-300 hover:text-green-800 dark:hover:text-green-500 transition-all font-mono text-xs uppercase tracking-widest backdrop-blur-sm relative overflow-hidden group"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? (
                <>
                  <span className="relative z-10">{nav.close}</span>
                  <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </>
              ) : (
                <>
                  <span className="relative z-10">{nav.menu}</span>
                  <div className="grid grid-cols-2 gap-[2px] relative z-10">
                    <div className="w-1.5 h-1.5 bg-current rounded-[1px] group-hover:bg-green-500 transition-colors"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-[1px] group-hover:bg-green-500 transition-colors delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-[1px] group-hover:bg-green-500 transition-colors delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-[1px] group-hover:bg-green-500 transition-colors delay-150"></div>
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Premium Menu */}
        <div className={`fixed inset-0 min-h-screen w-full bg-stone-50/95 dark:bg-[#0a0a08]/95 backdrop-blur-xl z-[100] transform transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] sm:hidden flex flex-col overflow-hidden ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
          
          {/* Header del Menu */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200/50 dark:border-stone-800/50 relative z-10 bg-stone-50/50 dark:bg-[#141410]/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-sm text-dark dark:text-green-500 tracking-widest uppercase">{nav.systemActive}</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-lg border border-stone-200/50 dark:border-stone-800/50 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 text-dark dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 transition-all font-mono text-xs uppercase tracking-widest group"
            >
              [X]
            </button>
          </div>

          {/* Links Principales */}
          <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col justify-center relative z-10">
            <div className="flex flex-col gap-2">
              <a href="#proyectos" onClick={(e) => { e.preventDefault(); scrollTo('#proyectos'); setIsMobileMenuOpen(false); }} className="flex flex-col gap-1 py-4 border-b border-stone-200/50 dark:border-stone-800/50 group relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-4"></div>
                <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-6">
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500">01</span>
                  <span className="text-3xl font-mono text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-500 transition-colors uppercase tracking-tight"><GlitchText text={nav.projects} /></span>
                </div>
              </a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('#skills'); setIsMobileMenuOpen(false); }} className="flex flex-col gap-1 py-4 border-b border-stone-200/50 dark:border-stone-800/50 group relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-4"></div>
                <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-6">
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500">02</span>
                  <span className="text-3xl font-mono text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-500 transition-colors uppercase tracking-tight"><GlitchText text={nav.skills} /></span>
                </div>
              </a>
              <a href="#sobre-mi" onClick={(e) => { e.preventDefault(); scrollTo('#sobre-mi'); setIsMobileMenuOpen(false); }} className="flex flex-col gap-1 py-4 border-b border-stone-200/50 dark:border-stone-800/50 group relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-4"></div>
                <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-6">
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500">03</span>
                  <span className="text-3xl font-mono text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-500 transition-colors uppercase tracking-tight"><GlitchText text={nav.about.replace(' ', '_')} /></span>
                </div>
              </a>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollTo('#contacto'); setIsMobileMenuOpen(false); }} className="flex flex-col gap-1 py-4 border-b border-stone-200/50 dark:border-stone-800/50 group relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-4"></div>
                <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-6">
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500">04</span>
                  <span className="text-3xl font-mono text-dark dark:text-[#f7f5f0] group-hover:text-green-800 dark:group-hover:text-green-500 transition-colors uppercase tracking-tight"><GlitchText text={nav.contact} /></span>
                </div>
              </a>
            </div>
          </div>

          {/* Footer del Menu (Redes y CV) */}
          <div className="p-8 border-t border-stone-200/50 dark:border-stone-800/50 bg-stone-50/50 dark:bg-[#141410]/50 backdrop-blur-md flex flex-col gap-6 relative z-10">
            <div className="relative w-full">
              <button
                onClick={() => setCvDropdownContext(ctx => ctx === 'mobile' ? null : 'mobile')}
                className="w-full flex items-center justify-center gap-2 bg-dark dark:bg-green-500 text-[#f7f5f0] dark:text-[#141410] py-4 rounded-xl font-mono text-sm tracking-widest uppercase transition-colors hover:bg-green-800 dark:hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] dark:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                {personalInfo.downloadCvText}
              </button>
              <CvDropdown
                personalInfo={personalInfo}
                isOpen={cvDropdownContext === 'mobile'}
                onClose={() => setCvDropdownContext(null)}
                position="top"
              />
            </div>
            
            <div className="flex justify-center gap-6">
              <a href={`mailto:${personalInfo.email}`} onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-lg border border-stone-200/50 dark:border-stone-800/50 bg-stone-100/30 dark:bg-stone-800/30 text-stone-600 dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 hover:border-green-500/50 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </a>
              <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-lg border border-stone-200/50 dark:border-stone-800/50 bg-stone-100/30 dark:bg-stone-800/30 text-stone-600 dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 hover:border-green-500/50 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.3l-1.5 5.5 5.5-1.5c1.55.95 3.36 1.5 5.3 1.5 5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.71 14.5c-.24.71-1.39 1.34-1.99 1.41-.53.06-1.18.17-3.83-.93-3.19-1.32-5.18-4.66-5.34-4.88-.16-.22-1.28-1.74-1.28-3.32 0-1.58.82-2.37 1.11-2.68.29-.31.63-.39.84-.39.21 0 .42.01.61.02.21.01.49-.08.76.57.29.71 1 2.45 1.09 2.65.09.2.14.43.01.69-.13.26-.2.43-.39.67-.18.24-.39.51-.55.69-.18.2-.38.41-.16.8 2.21.84 3.72 1.48 5.76 2.31.2.08.32.13.44.03.11-.1.49-.57.62-.77.13-.2.13-.37.09-.41-.04-.04-.15-.07-.31-.15l-1.87-.93c-.31-.15-.54-.25-.62-.41-.07-.16-.07-.32.01-.48z" /></svg>
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-lg border border-stone-200/50 dark:border-stone-800/50 bg-stone-100/30 dark:bg-stone-800/30 text-stone-600 dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 hover:border-green-500/50 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-lg border border-stone-200/50 dark:border-stone-800/50 bg-stone-100/30 dark:bg-stone-800/30 text-stone-600 dark:text-stone-400 hover:text-green-800 dark:hover:text-green-500 hover:border-green-500/50 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-24 sm:pt-40 pb-20 px-6 max-w-[900px] mx-auto min-h-[80vh] flex flex-col justify-center reveal">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-500/10 border-2 border-green-200 dark:border-green-500/30 flex items-center justify-center">
              <span className="font-serif text-lg text-green-800 dark:text-green-400 select-none">VN</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-stone-50 dark:border-[#141410]"></span>
          </div>
          <span className="text-xs font-mono text-stone-400 tracking-widest uppercase">// {personalInfo.name}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <TerminalText 
            delay={300} 
            commands={[
              { type: 'input', text: './init_portfolio.sh', speed: 60, postDelay: 400 },
              { type: 'output', text: `[OK] ${personalInfo.role} ${hero.loaded}`, postDelay: 1000 }
            ]} 
          />
          <a href="#contacto" className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-full hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-green-800 dark:text-green-400 font-semibold">{hero.availability}</span>
          </a>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-dark leading-tight mb-8 max-w-2xl">
          <StaggeredText text={hero.title} highlightWords={hero.titleHighlight} delay={100} />
        </h1>
        <p className="text-lg md:text-2xl font-light mb-12 max-w-xl leading-relaxed">
          {personalInfo.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollTo('#contacto'); }} className="group inline-flex items-center justify-center bg-dark text-white px-8 py-4 rounded-full hover:bg-green-800 transition-colors duration-300">
            <GlitchText text={hero.talkButton} />
          </a>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <button
                onClick={() => setCvDropdownContext(ctx => ctx === 'hero' ? null : 'hero')}
                className="inline-flex items-center justify-center border border-stone-200 text-dark px-6 py-4 rounded-full hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all duration-300 gap-2 text-sm md:text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
                </svg>
                {personalInfo.cvButtonText}
              </button>
              <CvDropdown
                personalInfo={personalInfo}
                isOpen={cvDropdownContext === 'hero'}
                onClose={() => setCvDropdownContext(null)}
                position="bottom"
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="mt-10 w-fit font-mono text-xs text-stone-400 hover:text-green-700 dark:hover:text-green-400 transition-colors"
        >
          <span className="text-green-600 dark:text-green-500">$</span> {language === 'es' ? 'Tip: presioná' : 'Tip: press'}{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-stone-300 dark:border-stone-700">`</kbd>{' '}
          {language === 'es' ? 'o' : 'or'}{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-stone-300 dark:border-stone-700">Ctrl+K</kbd>{' '}
          {language === 'es' ? 'para abrir una terminal real' : 'to open a real terminal'}
          <span className="inline-block w-2 h-3.5 ml-1 align-middle bg-green-500 animate-pulse"></span>
        </button>
      </section>

      {/* Tech Marquee */}
      <TechMarquee />

      {/* Proyectos Section */}
      <section id="proyectos" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto">
        <SectionHeader number="01" title={sections.projectsTitle} />
        <ScrollStack
          useWindowScroll
          smoothScroll={false}
          stackPosition={110}
          itemDistance={60}
          itemStackDistance={22}
          itemScale={0.04}
          baseScale={0.85}
          dimAmount={0.3}
          holdDistance={120}
        >
          {projects.map((project, index) => (
            <ScrollStackItem key={project.title} itemClassName="p-5 sm:p-8 border border-stone-200/60 dark:border-stone-800/70">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedProject(project);
                  setIsProjectModalOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedProject(project);
                    setIsProjectModalOpen(true);
                  }
                }}
                className="group flex flex-col md:flex-row gap-5 md:gap-8 md:items-center cursor-pointer"
              >
                {/* Media */}
                <div className="w-full md:w-[46%] aspect-video flex-shrink-0 rounded-2xl overflow-hidden bg-stone-200/50 dark:bg-stone-800/50 flex justify-center items-center relative">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`w-full h-full group-hover:scale-105 transition-transform duration-700 ${project.videoClass || 'object-cover'}`}
                    />
                  ) : project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/10 to-transparent font-mono text-green-600 dark:text-green-400">
                      <span className="text-4xl">&gt;_</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm font-mono text-[10px] text-green-400">
                    {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-green-700 dark:text-green-500 mb-2 block">{project.type}</span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#141410] dark:text-[#f7f5f0] mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">{project.title}</h3>
                  <p className="font-light text-sm sm:text-base mb-4 line-clamp-3 md:line-clamp-none">{project.description}</p>
                  {project.problemSolved && (
                    <div className="hidden md:block mb-4 pl-3 border-l-2 border-green-500/60">
                      <span className="block text-[10px] uppercase tracking-widest text-green-700 dark:text-green-500 mb-1 font-medium">{sections.problemSolved}</span>
                      <p className="text-sm font-light text-warm-gray leading-relaxed">{project.problemSolved}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 6).map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-stone-50 text-[11px] font-mono rounded-full text-warm-gray border border-stone-200 dark:border-stone-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto">
        <SectionHeader number="02" title={sections.skillsTitle} />
        <div className="reveal reveal-wipe">
          <TerminalSkills skills={skills} language={language} />
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certificaciones" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto">
        <SectionHeader number="02.5" title={sections.certificationsTitle} />
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.title}
              className={`reveal reveal-scale ${cert.images ? 'md:col-span-2' : ''}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <CertificationCard
                certification={cert}
                sections={sections}
                language={language}
                onOpen={() => {
                  setSelectedCert(cert);
                  setIsCertModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CI/CD Pipeline Section */}
      <PipelineSection language={language} />

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto reveal">
        <SectionHeader number="03" title={sections.aboutTitle} />
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-xs font-mono text-green-800 dark:text-green-500 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {personalInfo.currentStatus}
            </div>
            <p className="font-light leading-relaxed">
              {sections.aboutP1}
            </p>
            <p className="font-light leading-relaxed">
              {sections.aboutP2}
            </p>
            <div className="relative border border-green-200/60 dark:border-green-500/20 rounded-xl p-4 bg-green-50/40 dark:bg-green-500/5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-500/15 border border-green-200 dark:border-green-500/30 text-[10px] font-mono text-green-700 dark:text-green-400 uppercase tracking-widest mb-3">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                {sections.aboutBadge}
              </div>
              <p className="font-light leading-relaxed text-sm">
                {sections.aboutP3}
              </p>
            </div>
            <p className="font-light leading-relaxed italic text-green-800">
              {sections.aboutAvailability}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 border-l border-stone-200 pl-8 md:pl-16">
            <div>
              <span className="block text-4xl font-serif text-green-800 mb-2">
                <AnimatedCounter end={3} suffix="+" duration={2000} />
              </span>
              <span className="text-sm font-light uppercase tracking-widest text-warm-gray">{sections.expYears}</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-green-800 mb-2">
                <AnimatedCounter end={5} suffix="+" duration={2500} />
              </span>
              <span className="text-sm font-light uppercase tracking-widest text-warm-gray">{sections.projectsCount}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto & Footer */}
      <section id="contacto" className="relative overflow-hidden bg-[#141410] text-stone-300 pb-8 pt-16 sm:pt-32 px-6">
        {/* CRT terminal background (paused automatically when off-screen) */}
        <div className="absolute inset-0 pointer-events-auto" aria-hidden="true">
          <Suspense fallback={null}>
          <FaultyTerminal
            tint="#22c55e"
            glyphs="characters"
            scale={1.4}
            timeScale={0.35}
            brightness={0.55}
            glitchAmount={0.6}
            flickerAmount={0.5}
            curvature={0.12}
            mouseStrength={0.3}
            vignette={0.4}
            pageLoadAnimation={false}
          />
          </Suspense>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#141410] via-[#141410]/75 to-[#141410]/90" aria-hidden="true"></div>
        <div className="relative z-10 max-w-[900px] mx-auto">
          <div className="mb-24 reveal grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Form */}
            <div>
              <div className="mb-8">
                <span className="text-[10px] font-mono uppercase tracking-[.2em] text-green-500/60 mb-3 block">
                  [ {language === 'es' ? 'disponible' : 'available'} ]
                </span>
                <h2 className="font-serif leading-[0.9] mb-0" style={{ fontSize: 'clamp(52px, 8vw, 88px)' }}>
                  <span className="text-[#f7f5f0] block">{sections.contactTitle}</span>
                  <em className="text-green-400 not-italic block">{sections.contactSubtitle}</em>
                </h2>
              </div>
              <p className="font-light text-lg mb-8 text-stone-400">
                {sections.contactText}
              </p>
              <ContactForm language={language} />
            </div>

            {/* Right: Direct links, as a terminal-style card */}
            <div className="md:self-center">
              <div className="rounded-2xl border border-stone-800 bg-[#0c0c0a]/80 backdrop-blur-md shadow-[0_0_40px_rgba(34,197,94,0.08)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-800 bg-[#141410]/80">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                  <span className="ml-2 font-mono text-[11px] text-stone-500">contact.sh</span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-green-500/70 block">
                    $ {language === 'es' ? 'contactame directo' : 'reach me directly'}
                  </span>
              {/* Desktop: macOS-style dock */}
              <div className="hidden md:block relative h-28">
                <Suspense fallback={null}>
                <Dock
                  theme="dark"
                  accentColor="#22c55e"
                  baseItemSize={52}
                  magnification={78}
                  panelHeight={68}
                  showIndicators={false}
                  showBadges={false}
                  items={[
                    { label: 'Email', icon: <FiMail className="text-[#f7f5f0]" />, onClick: () => { window.location.href = `mailto:${personalInfo.email}`; } },
                    { label: 'WhatsApp', icon: <SiWhatsapp className="text-[#25D366]" />, onClick: () => window.open(personalInfo.whatsapp, '_blank', 'noopener') },
                    { label: 'GitHub', icon: <SiGithub className="text-[#f7f5f0]" />, onClick: () => window.open(personalInfo.github, '_blank', 'noopener') },
                    { label: 'LinkedIn', icon: <FaLinkedin className="text-[#0A66C2]" />, onClick: () => window.open(personalInfo.linkedin, '_blank', 'noopener') },
                  ]}
                />
                </Suspense>
              </div>
              {/* Mobile: no hover, so keep the simple grid */}
              <div className="grid grid-cols-2 gap-4 md:hidden">
                <a href={`mailto:${personalInfo.email}`} className="group flex flex-col justify-center items-center gap-3 border border-stone-800 bg-stone-900/50 hover:border-green-500 p-6 rounded-2xl transition-colors">
                  <svg className="w-6 h-6 text-stone-400 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="font-medium text-sm text-[#f7f5f0]">Email</span>
                </a>

                <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" className="group flex flex-col justify-center items-center gap-3 border border-stone-800 bg-stone-900/50 hover:border-green-500 p-6 rounded-2xl transition-colors">
                  <svg className="w-6 h-6 text-stone-400 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.3l-1.5 5.5 5.5-1.5c1.55.95 3.36 1.5 5.3 1.5 5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.71 14.5c-.24.71-1.39 1.34-1.99 1.41-.53.06-1.18.17-3.83-.93-3.19-1.32-5.18-4.66-5.34-4.88-.16-.22-1.28-1.74-1.28-3.32 0-1.58.82-2.37 1.11-2.68.29-.31.63-.39.84-.39.21 0 .42.01.61.02.21.01.49-.08.76.57.29.71 1 2.45 1.09 2.65.09.2.14.43.01.69-.13.26-.2.43-.39.67-.18.24-.39.51-.55.69-.18.2-.38.41-.16.8 2.21.84 3.72 1.48 5.76 2.31.2.08.32.13.44.03.11-.1.49-.57.62-.77.13-.2.13-.37.09-.41-.04-.04-.15-.07-.31-.15l-1.87-.93c-.31-.15-.54-.25-.62-.41-.07-.16-.07-.32.01-.48z" />
                  </svg>
                  <span className="font-medium text-sm text-[#f7f5f0]">WhatsApp</span>
                </a>

                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="group flex flex-col justify-center items-center gap-3 border border-stone-800 bg-stone-900/50 hover:border-green-500 p-6 rounded-2xl transition-colors">
                  <svg className="w-6 h-6 text-stone-400 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span className="font-medium text-sm text-[#f7f5f0]">GitHub</span>
                </a>

                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="group flex flex-col justify-center items-center gap-3 border border-stone-800 bg-stone-900/50 hover:border-green-500 p-6 rounded-2xl transition-colors">
                  <svg className="w-6 h-6 text-stone-400 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="font-medium text-sm text-[#f7f5f0]">LinkedIn</span>
                </a>
              </div>
                  <div className="mt-6 md:mt-2 pt-5 border-t border-stone-800 space-y-2 font-mono text-xs">
                    <a href={`mailto:${personalInfo.email}`} className="flex gap-3 text-stone-400 hover:text-green-400 transition-colors">
                      <span className="text-green-500/70 w-16 flex-shrink-0">email</span>
                      <span className="truncate">{personalInfo.email}</span>
                    </a>
                    <div className="flex gap-3 text-stone-400">
                      <span className="text-green-500/70 w-16 flex-shrink-0">{language === 'es' ? 'ubicación' : 'location'}</span>
                      <span>Villa Mercedes, AR · UTC-3</span>
                    </div>
                    <div className="flex gap-3 text-stone-400">
                      <span className="text-green-500/70 w-16 flex-shrink-0">status</span>
                      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{language === 'es' ? 'disponible' : 'available'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between text-stone-500 text-sm">
            <p>© {new Date().getFullYear()} {personalInfo.name}. {sections.footerRights}</p>
            <p className="mt-2 md:mt-0 font-light">
              {sections.footerDesigned}
            </p>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        language={language}
      />

      {/* Certification Modal */}
      <CertificationModal 
        certification={selectedCert} 
        isOpen={isCertModalOpen} 
        onClose={() => setIsCertModalOpen(false)} 
        language={language}
      />

      {/* Interactive Terminal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        data={portfolioData[language]}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        scrollTo={scrollTo}
      />

      {/* Back to top */}
      <button 
        onClick={() => scrollTo(0)}
        className={`fixed bottom-6 right-6 z-50 p-3 sm:p-4 rounded-full bg-green-500 text-[#141410] shadow-xl hover:bg-green-400 hover:scale-110 active:scale-95 transition-all duration-500 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
      </button>

    </div>
  );
}

export default App;
