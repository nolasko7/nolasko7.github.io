import {
  SiDocker, SiGithubactions, SiJenkins, SiLinux, SiCloudflare,
  SiGit, SiNodedotjs, SiPostgresql, SiReact, SiNextdotjs,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import LogoLoop from './reactbits/LogoLoop';

// DevOps first, then development. `color` is the brand color shown on hover.
const technologies = [
  { title: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { title: 'GitHub Actions', Icon: SiGithubactions, color: '#2088FF' },
  { title: 'Jenkins', Icon: SiJenkins, color: '#D24939' },
  { title: 'AWS', Icon: FaAws, color: '#FF9900' },
  { title: 'Linux', Icon: SiLinux, color: '#FCC624' },
  { title: 'Cloudflare', Icon: SiCloudflare, color: '#F38020' },
  { title: 'Git', Icon: SiGit, color: '#F05032' },
  { title: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  { title: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { title: 'React', Icon: SiReact, color: '#61DAFB' },
  { title: 'Next.js', Icon: SiNextdotjs, color: 'currentColor' },
];

const renderTech = (tech) => (
  <span
    className="flex items-center gap-3 text-stone-400 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-[var(--brand)]"
    style={{ '--brand': tech.color }}
    title={tech.title}
  >
    <tech.Icon className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
    <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] whitespace-nowrap">{tech.title}</span>
  </span>
);

const TechMarquee = () => {
  return (
    <div
      className="relative z-20 w-full border-y border-stone-200/50 bg-stone-50/80 backdrop-blur-sm py-6 sm:py-8"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
    >
      <LogoLoop
        logos={technologies}
        speed={50}
        direction="left"
        logoHeight={32}
        gap={64}
        hoverSpeed={12}
        scaleOnHover
        renderItem={renderTech}
        ariaLabel="Technologies"
      />
    </div>
  );
};

export default TechMarquee;
