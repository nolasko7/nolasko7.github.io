import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { personalInfo, projects, skills } from '../config/data';

function Home() {
  useScrollReveal();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 max-w-[900px] mx-auto min-h-[80vh] flex flex-col justify-center reveal">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-green-800"></div>
          <span className="uppercase tracking-widest text-xs text-green-800 font-medium">{personalInfo.role}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-dark leading-tight mb-8 max-w-2xl">
          Construyendo productos digitales con <span className="italic text-green-800">propósito</span> y buen diseño.
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 max-w-xl leading-relaxed text-warm-gray">
          {personalInfo.description}
        </p>
        <div>
          <a href="/contacts" onClick={(e) => { e.preventDefault(); window.location.href = '/contacts'; }} className="inline-flex items-center justify-center bg-dark text-white px-8 py-4 rounded-full hover:bg-green-800 transition-colors duration-300">
            Hablemos de tu proyecto
          </a>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className="py-24 px-6 max-w-[900px] mx-auto">
        <h2 className="text-3xl font-serif text-dark mb-16 reveal">Proyectos Destacados</h2>
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <a 
              key={index}
              href={project.link} 
              className="reveal block group bg-white p-8 rounded-xl relative overflow-hidden flex flex-col sm:flex-row gap-6 items-start sm:items-center shadow-sm hover:shadow-md transition-shadow duration-500"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Animated Left Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-800 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
              
              {project.video ? (
                <div className="w-full h-48 sm:w-48 sm:h-32 group-hover:h-64 group-hover:sm:w-80 group-hover:sm:h-48 flex-shrink-0 rounded-lg overflow-hidden bg-stone-200/50 flex justify-center items-center relative shadow-sm group-hover:shadow-md transition-all duration-500 ease-out">
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
                <p className="font-light mb-4 text-warm-gray">{project.description}</p>
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
      <section id="skills" className="py-24 px-6 max-w-[900px] mx-auto">
        <h2 className="text-3xl font-serif text-dark mb-16 reveal">Habilidades Técnicas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      <section id="sobre-mi" className="py-24 px-6 max-w-[900px] mx-auto reveal">
        <h2 className="text-3xl font-serif text-dark mb-16">Sobre Mí</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-light leading-relaxed mb-6 text-warm-gray">
              Soy un desarrollador apasionado por crear interfaces limpias y experiencias de usuario excepcionales. Creo firmemente que un buen diseño debe estar respaldado por una base técnica sólida y código mantenible.
            </p>
            <p className="font-light leading-relaxed text-warm-gray">
              Trabajo con tecnologías modernas tanto en frontend como en el backend, permitiéndome tener una visión completa del producto y afrontar desafíos desde la concepción hasta el despliegue.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 border-l border-stone-200 pl-8 md:pl-16">
            <div>
              <span className="block text-4xl font-serif text-green-800 mb-2">4+</span>
              <span className="text-sm font-light uppercase tracking-widest text-warm-gray">Años de Exp.</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-green-800 mb-2">15+</span>
              <span className="text-sm font-light uppercase tracking-widest text-warm-gray">Proyectos</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
