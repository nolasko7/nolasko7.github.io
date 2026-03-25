import { useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { personalInfo, projects, skills } from './config/data';

function App() {
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressElement = document.getElementById("scroll-progress");
      if (progressElement) {
        progressElement.style.width = scrolled + "%";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-warm-gray font-sans selection:bg-green-800 selection:text-white">
      <div id="scroll-progress"></div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-[900px] mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-serif text-xl text-dark tracking-tight">{personalInfo.name}</span>
          <div className="flex sm:flex gap-4 sm:gap-8 text-[10px] sm:text-sm uppercase tracking-widest overflow-x-auto no-scrollbar whitespace-nowrap py-4 sm:py-0">
            <a href="#proyectos" className="hover:text-dark transition-colors">Proyectos</a>
            <a href="#skills" className="hover:text-dark transition-colors">Skills</a>
            <a href="#sobre-mi" className="hover:text-dark transition-colors">Sobre Mí</a>
            <a href="#contacto" className="hover:text-dark transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-40 pb-20 px-6 max-w-[900px] mx-auto min-h-[80vh] flex flex-col justify-center reveal">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-green-800"></div>
            <span className="uppercase tracking-widest text-xs text-green-800 font-medium">{personalInfo.role}</span>
          </div>
          <a href="#contacto" className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full hover:bg-green-100 transition-colors group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-green-800 font-semibold">Disponible para posiciones part-time o fulltime flexible</span>
          </a>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-dark leading-tight mb-8 max-w-2xl">
          Del problema real al <span className="italic text-green-800">producto en producción</span>.
        </h1>
        <p className="text-lg md:text-2xl font-light mb-12 max-w-xl leading-relaxed">
          {personalInfo.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contacto" className="inline-flex items-center justify-center bg-dark text-white px-8 py-4 rounded-full hover:bg-green-800 transition-colors duration-300">
            Hablemos de tu proyecto
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

      {/* Proyectos Section */}
      <section id="proyectos" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto">
        <h2 className="text-3xl font-serif text-dark mb-16 reveal">Proyectos Destacados</h2>
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="reveal block group bg-white p-8 rounded-xl relative overflow-hidden flex flex-col sm:flex-row gap-6 items-start sm:items-center shadow-sm hover:shadow-md hover-lift transition-all duration-500"
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

              <div className="sm:ml-auto text-warm-gray group-hover:text-green-800 group-hover:-translate-x-1 transition-all mt-4 sm:mt-0 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-24 px-6 max-w-[900px] mx-auto">
        <h2 className="text-3xl font-serif text-dark mb-16 reveal">Habilidades Técnicas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="reveal bg-white p-6 rounded-xl border border-stone-100 flex items-start gap-4"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-2 h-2 rounded-full bg-green-800 mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="text-dark font-medium mb-1">{skill.name}</h4>
                <p className="text-sm font-light text-warm-gray">{skill.subtitle}</p>
              </div>
            </div>
          ))}
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
              Actualmente profundizando en DevOps, infraestructura con Docker y MLOps. Disponible para proyectos freelance y posiciones remotas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 border-l border-stone-200 pl-8 md:pl-16">
            <div>
              <span className="block text-4xl font-serif text-green-800 mb-2">3+</span>
              <span className="text-sm font-light uppercase tracking-widest text-warm-gray">Años de Exp.</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-green-800 mb-2">10+</span>
              <span className="text-sm font-light uppercase tracking-widest text-warm-gray">Proyectos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto & Footer */}
      <section id="contacto" className="bg-[#141410] text-stone-300 pb-8 pt-16 sm:pt-32 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-24 reveal">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              ¿Listo para empezar? <br /><span className="text-green-800 italic text-3xl md:text-4xl">Hablemos ahora.</span>
            </h2>
            <p className="font-light text-lg mb-12 max-w-md text-stone-400">
              Estoy disponible para proyectos freelance o unirme a un gran equipo. Escríbeme y charlemos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-800 p-5 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-green-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="font-medium text-white">Email</span>
                </div>
              </a>

              <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-800 p-6 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-green-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.3l-1.5 5.5 5.5-1.5c1.55.95 3.36 1.5 5.3 1.5 5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.71 14.5c-.24.71-1.39 1.34-1.99 1.41-.53.06-1.18.17-3.83-.93-3.19-1.32-5.18-4.66-5.34-4.88-.16-.22-1.28-1.74-1.28-3.32 0-1.58.82-2.37 1.11-2.68.29-.31.63-.39.84-.39.21 0 .42.01.61.02.21.01.49-.08.76.57.29.71 1 2.45 1.09 2.65.09.2.14.43.01.69-.13.26-.2.43-.39.67-.18.24-.39.51-.55.69-.18.2-.38.41-.16.8 2.21.84 3.72 1.48 5.76 2.31.2.08.32.13.44.03.11-.1.49-.57.62-.77.13-.2.13-.37.09-.41-.04-.04-.15-.07-.31-.15l-1.87-.93c-.31-.15-.54-.25-.62-.41-.07-.16-.07-.32.01-.48z" />
                  </svg>
                  <span className="font-medium text-white">WhatsApp</span>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-800 p-6 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-green-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span className="font-medium text-white">GitHub</span>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-stone-800 bg-stone-900/50 hover:border-green-800 p-6 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-green-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="font-medium text-white">LinkedIn</span>
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
