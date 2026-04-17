import { useEffect, useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { personalInfo, projects, skills } from './config/data';
import CustomCursor from './components/CustomCursor';
import AnimatedCounter from './components/AnimatedCounter';
import TechMarquee from './components/TechMarquee';
import Preloader from './components/Preloader';
import SpotlightCard from './components/SpotlightCard';
import StaggeredText from './components/StaggeredText';
import GlitchText from './components/GlitchText';
import TerminalText from './components/TerminalText';

function App() {
  useScrollReveal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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

      const progressElement = document.getElementById("scroll-progress");
      if (progressElement) {
        progressElement.style.width = scrolled + "%";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-warm-gray font-sans selection:bg-green-800 selection:text-[#f7f5f0] relative z-0">
      {/* Decorative Background Elements */}
      <div className="bg-grid"></div>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      <Preloader />
      <CustomCursor />
      <div id="scroll-progress"></div>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50 py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between">
          <span className="font-serif text-xl text-dark tracking-tight">{personalInfo.name}</span>
          <div className="flex items-center gap-2 sm:gap-6 text-[10px] sm:text-xs font-medium uppercase tracking-widest overflow-x-auto no-scrollbar whitespace-nowrap">
            <a href="#proyectos" className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text="Proyectos" /></a>
            <a href="#skills" className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text="Skills" /></a>
            <a href="#sobre-mi" className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text="Sobre Mí" /></a>
            <a href="#contacto" className="px-3 py-2 rounded-full hover:bg-stone-200/50 hover:text-green-800 transition-colors"><GlitchText text="Contacto" /></a>

            <button 
              onClick={toggleDarkMode} 
              className="ml-2 p-2 rounded-full hover:bg-stone-200/50 text-dark transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-40 pb-20 px-6 max-w-[900px] mx-auto min-h-[80vh] flex flex-col justify-center reveal">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <TerminalText 
            delay={300} 
            commands={[
              { type: 'input', text: './init_portfolio.sh', speed: 60, postDelay: 400 },
              { type: 'output', text: `[OK] ${personalInfo.role} cargado.`, postDelay: 1000 }
            ]} 
          />
          <a href="#contacto" className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full hover:bg-green-100 transition-colors group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-green-800 font-semibold">Disponible para posiciones part-time o fulltime flexible</span>
          </a>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-dark leading-tight mb-8 max-w-2xl">
          <StaggeredText text="Del problema real al producto en producción." highlightWords={["producto", "en", "producción"]} delay={100} />
        </h1>
        <p className="text-lg md:text-2xl font-light mb-12 max-w-xl leading-relaxed">
          {personalInfo.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contacto" className="group inline-flex items-center justify-center bg-dark text-white px-8 py-4 rounded-full hover:bg-green-800 transition-colors duration-300">
            <GlitchText text="Hablemos de tu proyecto" />
          </a>
          <div className="flex flex-wrap gap-3">
            <a
              href={personalInfo.cvUrlEs}
              download
              className="inline-flex items-center justify-center border border-stone-200 text-dark px-6 py-4 rounded-full hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all duration-300 gap-2 text-sm md:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
              </svg>
              CV (ES)
            </a>
            <a
              href={personalInfo.cvUrlEn}
              download
              className="inline-flex items-center justify-center border border-stone-200 text-dark px-6 py-4 rounded-full hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all duration-300 gap-2 text-sm md:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
              </svg>
              CV (EN)
            </a>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <TechMarquee />

      {/* Proyectos Section */}
      <section id="proyectos" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto">
        <h2 className="text-3xl font-serif text-dark mb-16 reveal">Proyectos Destacados</h2>
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <SpotlightCard
              key={index}
              as="a"
              href={project.link}
              className="reveal block group bg-white rounded-xl shadow-sm hover:shadow-md hover-lift transition-all duration-500"
              innerClassName="p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full h-full"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Animated Left Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-800 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>

              {project.video ? (
                <div className="w-full h-56 sm:w-64 sm:h-40 group-hover:sm:w-80 group-hover:sm:h-48 flex-shrink-0 rounded-lg overflow-hidden bg-stone-200/50 flex justify-center items-center relative shadow-sm group-hover:shadow-md transition-all duration-500 ease-out">
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-700 ${project.videoClass || 'object-cover'}`}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center flex-shrink-0 text-green-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
              )}

              <div className="flex-grow">
                <span className="text-xs uppercase tracking-widest text-warm-gray mb-2 block">{project.type}</span>
                <h3 className="text-2xl font-serif text-dark mb-2 group-hover:text-green-800 transition-colors">{project.title}</h3>
                <p className="font-light mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-50 text-xs rounded-full text-warm-gray border border-stone-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Solución / Impacto animado en hover */}
                {project.problemSolved && (
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <div className="pt-4 mt-4 border-t border-stone-100">
                        <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-green-800 mb-1 font-medium">El Problema Resuelto</span>
                        <p className="text-sm font-light text-warm-gray leading-relaxed">
                          {project.problemSolved}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto">
        <h2 className="text-3xl font-serif text-dark mb-16 reveal">Habilidades Técnicas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((skill, index) => {
            let icon;
            switch (skill.subtitle) {
              case 'Frontend':
                icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
                break;
              case 'Backend APIs':
                icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
                break;
              case 'Mobile Development':
                icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>;
                break;
              case 'Database':
                icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>;
                break;
              case 'Deployment':
                icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>;
                break;
              default:
                icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" /></svg>;
            }

            return (
              <SpotlightCard
                key={index}
                className="reveal bg-white rounded-xl border border-stone-100 hover:border-stone-200 transition-all duration-500"
                innerClassName="p-6 flex flex-col h-full"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-stone-50 flex items-center justify-center text-green-800 border border-stone-100 mb-6">
                  {icon}
                </div>
                <div className="mt-auto">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-warm-gray mb-2 block">{skill.subtitle}</span>
                  <h4 className="text-dark font-medium text-[15px] leading-relaxed">{skill.name.split(' / ').join(' • ')}</h4>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto reveal">
        <h2 className="text-3xl font-serif text-dark mb-16">Sobre Mí</h2>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <p className="font-light leading-relaxed">
              Soy desarrollador Full Stack de Villa Mercedes, Argentina. Estoy por recibirme de Analista en Sistemas y terminando mi carrera como Ingeniero en Sistemas. Me especializo en construir productos que resuelven problemas reales: sistemas de turnos, automatizaciones con WhatsApp y aplicaciones móviles que la gente usa todos los días.
            </p>
            <p className="font-light leading-relaxed">
              Algunos de mis proyectos están en producción y los usan clientes reales. Eso me enseñó más que cualquier curso — a tomar decisiones bajo presión, a priorizar lo que funciona y a iterar rápido cuando algo falla.
            </p>
            <p className="font-light leading-relaxed italic text-green-800">
              Disponible para proyectos freelance y posiciones remotas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 border-l border-stone-200 pl-8 md:pl-16">
            <div>
              <span className="block text-4xl font-serif text-green-800 mb-2">
                <AnimatedCounter end={3} suffix="+" duration={2000} />
              </span>
              <span className="text-sm font-light uppercase tracking-widest text-warm-gray">Años de Exp.</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-green-800 mb-2">
                <AnimatedCounter end={10} suffix="+" duration={2500} />
              </span>
              <span className="text-sm font-light uppercase tracking-widest text-warm-gray">Proyectos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto & Footer */}
      <section id="contacto" className="bg-[#141410] text-stone-300 pb-8 pt-16 sm:pt-32 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-24 reveal">
            <h2 className="text-4xl md:text-5xl font-serif text-[#f7f5f0] mb-6">
              ¿Listo para empezar? <br /><span className="text-green-500 italic text-3xl md:text-4xl">Hablemos ahora.</span>
            </h2>
            <p className="font-light text-lg mb-12 max-w-md text-stone-400">
              Estoy disponible para proyectos freelance o unirme a un gran equipo. Escríbeme y charlemos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-500 p-5 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="font-medium text-[#f7f5f0]">Email</span>
                </div>
              </a>

              <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-500 p-6 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.3l-1.5 5.5 5.5-1.5c1.55.95 3.36 1.5 5.3 1.5 5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.71 14.5c-.24.71-1.39 1.34-1.99 1.41-.53.06-1.18.17-3.83-.93-3.19-1.32-5.18-4.66-5.34-4.88-.16-.22-1.28-1.74-1.28-3.32 0-1.58.82-2.37 1.11-2.68.29-.31.63-.39.84-.39.21 0 .42.01.61.02.21.01.49-.08.76.57.29.71 1 2.45 1.09 2.65.09.2.14.43.01.69-.13.26-.2.43-.39.67-.18.24-.39.51-.55.69-.18.2-.38.41-.16.8 2.21.84 3.72 1.48 5.76 2.31.2.08.32.13.44.03.11-.1.49-.57.62-.77.13-.2.13-.37.09-.41-.04-.04-.15-.07-.31-.15l-1.87-.93c-.31-.15-.54-.25-.62-.41-.07-.16-.07-.32.01-.48z" />
                  </svg>
                  <span className="font-medium text-[#f7f5f0]">WhatsApp</span>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-500 p-6 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span className="font-medium text-[#f7f5f0]">GitHub</span>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-500 p-6 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="font-medium text-[#f7f5f0]">LinkedIn</span>
                </div>
              </a>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between text-stone-500 text-sm">
            <p>© {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.</p>
            <p className="mt-2 md:mt-0 font-light">
              Diseñado y desarrollado con dedicación.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
