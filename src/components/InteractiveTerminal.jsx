import { useEffect, useRef, useState } from 'react';

const PROMPT = 'guest@nolasko7:~$';

const COMMANDS = ['help', 'whoami', 'ls', 'docker ps', 'cat skills', 'certs', 'open', 'cv', 'cd', 'sudo hire-me', 'theme', 'lang', 'date', 'echo', 'clear', 'exit'];

const texts = {
  es: {
    welcome: 'Bienvenido. Escribí `help` para ver los comandos disponibles.',
    help: [
      ['whoami', 'quién soy'],
      ['ls', 'listar proyectos'],
      ['docker ps', 'proyectos como contenedores'],
      ['cat skills', 'stack técnico'],
      ['certs', 'certificaciones'],
      ['open <github|linkedin|whatsapp|email>', 'abrir un link'],
      ['cv', 'descargar mi CV'],
      ['cd <proyectos|skills|sobre-mi|contacto>', 'ir a una sección'],
      ['sudo hire-me', '¿?'],
      ['theme <dark|light>', 'cambiar tema'],
      ['lang <es|en>', 'cambiar idioma'],
      ['clear · exit', 'limpiar · cerrar'],
    ],
    notFound: (cmd) => `command not found: ${cmd}. Probá con \`help\`.`,
    hire: ['[sudo] password for guest: ********', '✓ Permiso concedido. Redirigiendo al formulario de contacto…'],
    rm: '¿rm -rf /? Este sitio es un build estático e inmutable: lo vuelve a desplegar el pipeline 😏',
    opening: (what) => `Abriendo ${what}…`,
    unknownLink: 'Opciones: github, linkedin, whatsapp, email',
    unknownSection: 'Secciones: proyectos, skills, sobre-mi, contacto',
    themeSet: (t) => `Tema: ${t}`,
    langSet: 'Idioma cambiado a español.',
    location: 'Villa Mercedes, Argentina 🇦🇷',
    cvLinks: 'CVs disponibles:',
  },
  en: {
    welcome: 'Welcome. Type `help` to see the available commands.',
    help: [
      ['whoami', 'who am I'],
      ['ls', 'list projects'],
      ['docker ps', 'projects as containers'],
      ['cat skills', 'tech stack'],
      ['certs', 'certifications'],
      ['open <github|linkedin|whatsapp|email>', 'open a link'],
      ['cv', 'download my CV'],
      ['cd <projects|skills|about|contact>', 'go to a section'],
      ['sudo hire-me', '?'],
      ['theme <dark|light>', 'switch theme'],
      ['lang <es|en>', 'switch language'],
      ['clear · exit', 'clear · close'],
    ],
    notFound: (cmd) => `command not found: ${cmd}. Try \`help\`.`,
    hire: ['[sudo] password for guest: ********', '✓ Permission granted. Redirecting to the contact form…'],
    rm: 'rm -rf /? This site is an immutable static build — the pipeline would just redeploy it 😏',
    opening: (what) => `Opening ${what}…`,
    unknownLink: 'Options: github, linkedin, whatsapp, email',
    unknownSection: 'Sections: projects, skills, about, contact',
    themeSet: (t) => `Theme: ${t}`,
    langSet: 'Language switched to English.',
    location: 'Villa Mercedes, Argentina 🇦🇷',
    cvLinks: 'Available CVs:',
  },
};

const sections = {
  proyectos: '#proyectos', projects: '#proyectos',
  skills: '#skills', habilidades: '#skills',
  'sobre-mi': '#sobre-mi', about: '#sobre-mi',
  contacto: '#contacto', contact: '#contacto',
};

const pad = (str, len) => (str.length >= len ? `${str.slice(0, len - 1)}… ` : str.padEnd(len));

const InteractiveTerminal = ({ isOpen, onClose, data, language, setLanguage, isDarkMode, toggleDarkMode, scrollTo }) => {
  const t = texts[language];
  const [lines, setLines] = useState(() => [{ type: 'out', content: texts[language].welcome }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const goTo = (target) => {
    onClose();
    setTimeout(() => scrollTo(target), 250);
  };

  const run = (raw) => {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ').toLowerCase();
    const out = [];
    const print = (content, type = 'out') => out.push({ type, content });
    const { personalInfo, projects, skills, certifications } = data;

    switch (name.toLowerCase()) {
      case '':
        break;
      case 'help':
        t.help.forEach(([c, d]) => print(<><span className="text-green-400">{c.padEnd(40)}</span><span className="text-stone-500">{d}</span></>));
        break;
      case 'whoami':
        print(<span className="text-green-400">Valentin Nolasco</span>);
        print(personalInfo.role);
        print(t.location);
        print(personalInfo.currentStatus);
        break;
      case 'ls':
        projects.forEach((p) => print(<><span className="text-sky-400">drwxr-xr-x</span>  {p.title}</>));
        break;
      case 'docker':
        if (arg !== 'ps') { print(t.notFound(cmd), 'err'); break; }
        print(<span className="text-stone-500">{pad('NAME', 34)}{pad('IMAGE', 26)}STATUS</span>);
        projects.forEach((p) => {
          const inProd = p.live || /producci|production/i.test(p.type);
          print(<>{pad(p.title, 34)}{pad(p.tags.slice(0, 2).join('+').toLowerCase(), 26)}<span className={inProd ? 'text-green-400' : 'text-stone-500'}>{inProd ? 'Up (in production)' : 'Exited (0)'}</span></>);
        });
        break;
      case 'cat':
        if (arg !== 'skills') { print(`cat: ${arg || '?'}: No such file`, 'err'); break; }
        skills.forEach((s) => print(<><span className="text-green-400">{s.subtitle.padEnd(22)}</span>{s.name}</>));
        break;
      case 'certs':
        certifications.forEach((c) => {
          const color = c.status === 'completed' ? 'text-green-400' : c.status === 'in_progress' ? 'text-amber-400' : 'text-stone-500';
          print(<><span className={color}>[{c.status}{c.progress != null ? ` ${c.progress}%` : ''}]</span> {c.title}</>);
        });
        break;
      case 'open': {
        const links = { github: personalInfo.github, linkedin: personalInfo.linkedin, whatsapp: personalInfo.whatsapp, email: `mailto:${personalInfo.email}` };
        if (!links[arg]) { print(t.unknownLink, 'err'); break; }
        print(t.opening(arg));
        window.open(links[arg], '_blank', 'noopener');
        break;
      }
      case 'cv':
        print(t.cvLinks);
        [[personalInfo.cvDeveloperLabel, personalInfo.cvDeveloperUrl], [personalInfo.cvCybersecurityLabel, personalInfo.cvCybersecurityUrl]].forEach(([label, url]) =>
          print(<a href={url} download className="text-sky-400 underline hover:text-sky-300">↓ {label}</a>)
        );
        break;
      case 'cd':
        if (!sections[arg]) { print(t.unknownSection, 'err'); break; }
        goTo(sections[arg]);
        break;
      case 'sudo':
        if (arg !== 'hire-me') { print(`sudo: ${arg || '?'}: command not found`, 'err'); break; }
        t.hire.forEach((l) => print(l));
        setTimeout(() => goTo('#contacto'), 1200);
        // Big wave across the background network once the terminal closes
        setTimeout(() => window.dispatchEvent(new CustomEvent('network:burst', { detail: { type: 'wave' } })), 1400);
        break;
      case 'rm':
        print(t.rm, 'warn');
        break;
      case 'theme':
        if (arg !== 'dark' && arg !== 'light') { print('theme <dark|light>', 'err'); break; }
        if ((arg === 'dark') !== isDarkMode) toggleDarkMode();
        print(t.themeSet(arg));
        break;
      case 'lang':
        if (arg !== 'es' && arg !== 'en') { print('lang <es|en>', 'err'); break; }
        setLanguage(arg);
        print(texts[arg].langSet);
        break;
      case 'date':
        print(new Date().toString());
        break;
      case 'echo':
        print(args.join(' '));
        break;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
        onClose();
        break;
      default:
        print(t.notFound(name), 'err');
    }

    // Every command generates some "traffic" in the background network
    if (cmd) window.dispatchEvent(new CustomEvent('network:burst', { detail: { type: 'packets' } }));
    setLines((prev) => [...prev, { type: 'cmd', content: cmd }, ...out]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      if (input.trim()) setHistory((h) => [...h, input]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const idx = historyIndex + 1;
      if (idx >= history.length) { setHistoryIndex(-1); setInput(''); }
      else { setHistoryIndex(idx); setInput(history[idx]); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()) && input);
      if (match) setInput(match);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-end sm:items-center justify-center sm:p-6 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div
        role="dialog"
        aria-label="Terminal"
        className={`relative w-full sm:max-w-3xl h-full sm:h-[480px] flex flex-col bg-[#0a0a08]/95 border border-green-500/30 sm:rounded-xl shadow-[0_0_60px_rgba(34,197,94,0.15)] overflow-hidden transition-transform duration-300 ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'}`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800 bg-[#141410]">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-125" aria-label="Close terminal"></button>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <span className="font-mono text-xs text-stone-500">guest@nolasko7 — zsh</span>
          <span className="font-mono text-[10px] text-stone-600 hidden sm:block">esc</span>
        </div>

        {/* Output */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-stone-300 whitespace-pre-wrap break-words" data-lenis-prevent>
          {lines.map((line, idx) => (
            <div key={idx} className={line.type === 'err' ? 'text-red-400' : line.type === 'warn' ? 'text-amber-400' : ''}>
              {line.type === 'cmd' ? (<><span className="text-green-500">{PROMPT}</span> {line.content}</>) : line.content}
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-green-500 flex-shrink-0">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 ml-2 bg-transparent outline-none text-[#f7f5f0] caret-green-400"
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
