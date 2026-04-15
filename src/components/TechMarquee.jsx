import React from 'react';

const technologies = [
  "React", "Next.js", "Tailwind CSS", "Node.js", "Express", 
  "PostgreSQL", "Flutter", "Docker", "Cloudflare", 
  "Github Actions", "WhatsApp API", "Dart"
];

const TechMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-stone-200/50 bg-stone-50 py-6 sm:py-8 flex">
      {/* Gradients for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-max animate-marquee">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12 sm:gap-24 px-6 sm:px-12 items-center justify-around">
            {technologies.map((tech, index) => (
              <div key={`${i}-${index}`} className="flex items-center gap-12 sm:gap-24">
                <span className="text-sm sm:text-base font-medium text-stone-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  {tech}
                </span>
                {/* Dot separator */}
                {index !== technologies.length - 1 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                )}
                {/* Add a dot after the last item of the first list too, so the seamless loop looks perfect */}
                {index === technologies.length - 1 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;