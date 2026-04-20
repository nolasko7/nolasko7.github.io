import courtixVideo from '../assets/Video Courtix.mp4';
import peluqueriaVideo from '../assets/TurnosPeluqueria.mp4';
import almacenVideo from '../assets/Mi Almacen.mp4';

export const portfolioData = {
  es: {
    personalInfo: {
      name: "Valentin",
      role: "Full Stack Developer · Web & Mobile · Automatizacion",
      description: "Full Stack de Villa Mercedes, Argentina. Tres proyectos en producción usados por clientes reales — desde bots de WhatsApp hasta apps móviles de gestión de stock.",
      email: "valentin.nolasco123123@gmail.com", 
      github: "https://github.com/nolasko7", 
      linkedin: "https://www.linkedin.com/in/valentin-nolasco-987249374/", 
      whatsapp: "https://wa.me/5492657359495",
      cvUrlEs: "/CV ESP.pdf",
      cvUrlEn: "/CV EN.pdf",
      downloadCvText: "Descargar_CV",
      cvButtonText: "CV"
    },
    projects: [
      {
        title: "Sistema de Reservas de Cancha",
        video: courtixVideo,
        type: "Web app",
        description: "Plataforma integral de gestión deportiva. Digitaliza reservas y pagos de canchas, optimizando la administración de complejos deportivos reales.",
        problemSolved: "Digitaliza y agiliza el negocio automatizando reservas y pagos, minimizando la sobrecarga de comunicaciones a través de un dashboard de control centralizado.",
        tags: ["Node.js", "Express", "PostgreSQL", "React"],
        link: "#"
      },
      {
        title: "Gestión de Turnos con Chatbot",
        video: peluqueriaVideo,
        type: "Web + Bot (IA) en producción",
        description: "Desarrollé un sistema de turnos con bot de WhatsApp que está en producción y lo usa una peluquería real. Maneja reservas automáticamente sin intervención humana.",
        problemSolved: "Optimiza exponencialmente el tiempo del peluquero al delegar la interacción en el bot, asegurando que los turnos estén siempre perfectamente organizados en la agenda de forma automática.",
        tags: ["Next.js", "Node.js", "WhatsApp API", "PostgreSQL", "Docker", "Cloudflare", "Github Actions", "MySQL"],
        link: "#"
      },
      {
        title: "App de Gestión de Stock",
        video: almacenVideo,
        videoClass: "object-contain",
        type: "Mobile app en producción",
        description: "Aplicación móvil para control de inventario utilizada en comercios reales. Implementa escaneo con cámara para sincronizar stock físico con bases de datos en tiempo real.",
        problemSolved: "Agiliza el flujo de ventas e impide quiebres de stock sincronizando la lectura física de productos en el almacén directamente con la base de datos central.",
        tags: ["Dart", "Flutter", "MySQL", "Android Studio"],
        link: "#"
      }
    ],
    skills: [
      { name: "React / Next.js / Tailwind CSS", subtitle: "Frontend" },
      { name: "Node.js / Express / REST APIs / WebSockets", subtitle: "Backend APIs" },
      { name: "Flutter / Dart / Android Studio", subtitle: "Mobile Development" },
      { name: "PostgreSQL / SQL", subtitle: "Database" },
      { name: "Docker / Cloudflare / Github Actions", subtitle: "Deployment" },
      { name: "WhatsApp API / LLM", subtitle: "Automation" }
    ],
    nav: {
      projects: "Proyectos",
      skills: "Habilidades",
      about: "Sobre Mí",
      contact: "Contacto",
      systemActive: "Sistema_Activo",
      close: "[ Cerrar ]",
      menu: "[ Menu ]"
    },
    hero: {
      loaded: "cargado.",
      availability: "Disponible para posiciones part-time o fulltime flexible",
      titleHighlight: ["producto", "en", "producción"],
      title: "Del problema real al producto en producción.",
      talkButton: "Hablemos de tu proyecto"
    },
    sections: {
      projectsTitle: "Proyectos Destacados",
      problemSolved: "El Problema Resuelto",
      skillsTitle: "Habilidades Técnicas",
      aboutTitle: "Sobre Mí",
      aboutP1: "Soy desarrollador Full Stack de Villa Mercedes, Argentina. Estoy por recibirme de Analista en Sistemas y terminando mi carrera como Ingeniero en Sistemas. Me especializo en construir productos que resuelven problemas reales: sistemas de turnos, automatizaciones con WhatsApp y aplicaciones móviles que la gente usa todos los días.",
      aboutP2: "Algunos de mis proyectos están en producción y los usan clientes reales. Eso me enseñó más que cualquier curso — a tomar decisiones bajo presión, a priorizar lo que funciona y a iterar rápido cuando algo falla.",
      aboutAvailability: "Disponible para proyectos freelance y posiciones remotas.",
      expYears: "Años de Exp.",
      projectsCount: "Proyectos",
      contactTitle: "¿Listo para empezar?",
      contactSubtitle: "Hablemos ahora.",
      contactText: "Estoy disponible para proyectos freelance o unirme a un gran equipo. Escríbeme y charlemos.",
      footerRights: "Todos los derechos reservados.",
      footerDesigned: "Diseñado y desarrollado con dedicación."
    }
  },
  en: {
    personalInfo: {
      name: "Valentin",
      role: "Full Stack Developer · Web & Mobile · Automation",
      description: "Full Stack Developer from Villa Mercedes, Argentina. Three projects in production used by real clients — from WhatsApp bots to mobile inventory apps.",
      email: "valentin.nolasco123123@gmail.com", 
      github: "https://github.com/nolasko7", 
      linkedin: "https://www.linkedin.com/in/valentin-nolasco-987249374/", 
      whatsapp: "https://wa.me/5492657359495",
      cvUrlEs: "/CV ESP.pdf",
      cvUrlEn: "/CV EN.pdf",
      downloadCvText: "Download_CV",
      cvButtonText: "CV"
    },
    projects: [
      {
        title: "Court Reservation System",
        video: courtixVideo,
        type: "Web app",
        description: "Comprehensive sports management platform. Digitalizes court reservations and payments, optimizing the administration of real sports complexes.",
        problemSolved: "Digitalizes and speeds up the business by automating reservations and payments, minimizing communication overhead through a centralized control dashboard.",
        tags: ["Node.js", "Express", "PostgreSQL", "React"],
        link: "#"
      },
      {
        title: "Appointment Management with Chatbot",
        video: peluqueriaVideo,
        type: "Web + AI Bot in production",
        description: "Developed an appointment system with a WhatsApp bot currently in production, used by a real hair salon. Handles reservations automatically without human intervention.",
        problemSolved: "Exponentially optimizes the hairdresser's time by delegating interactions to the bot, ensuring appointments are perfectly and automatically organized in the agenda.",
        tags: ["Next.js", "Node.js", "WhatsApp API", "PostgreSQL", "Docker", "Cloudflare", "Github Actions", "MySQL"],
        link: "#"
      },
      {
        title: "Inventory Management App",
        video: almacenVideo,
        videoClass: "object-contain",
        type: "Mobile app in production",
        description: "Mobile application for inventory control used in real retail stores. Implements camera scanning to synchronize physical stock with databases in real-time.",
        problemSolved: "Speeds up the sales flow and prevents stockouts by synchronizing physical product scanning in the warehouse directly with the central database.",
        tags: ["Dart", "Flutter", "MySQL", "Android Studio"],
        link: "#"
      }
    ],
    skills: [
      { name: "React / Next.js / Tailwind CSS", subtitle: "Frontend" },
      { name: "Node.js / Express / REST APIs / WebSockets", subtitle: "Backend APIs" },
      { name: "Flutter / Dart / Android Studio", subtitle: "Mobile Development" },
      { name: "PostgreSQL / SQL", subtitle: "Database" },
      { name: "Docker / Cloudflare / Github Actions", subtitle: "Deployment" },
      { name: "WhatsApp API / LLM", subtitle: "Automation" }
    ],
    nav: {
      projects: "Projects",
      skills: "Skills",
      about: "About Me",
      contact: "Contact",
      systemActive: "System_Active",
      close: "[ Close ]",
      menu: "[ Menu ]"
    },
    hero: {
      loaded: "loaded.",
      availability: "Available for flexible part-time or full-time positions",
      titleHighlight: ["product", "in", "production"],
      title: "From real problem to product in production.",
      talkButton: "Let's talk about your project"
    },
    sections: {
      projectsTitle: "Featured Projects",
      problemSolved: "The Problem Solved",
      skillsTitle: "Technical Skills",
      aboutTitle: "About Me",
      aboutP1: "I am a Full Stack Developer from Villa Mercedes, Argentina. I am about to graduate as a Systems Analyst and finishing my degree as a Systems Engineer. I specialize in building products that solve real problems: appointment systems, WhatsApp automations, and mobile applications that people use every day.",
      aboutP2: "Some of my projects are in production and used by real clients. That taught me more than any course — how to make decisions under pressure, prioritize what works, and iterate fast when something fails.",
      aboutAvailability: "Available for freelance projects and remote positions.",
      expYears: "Years Exp.",
      projectsCount: "Projects",
      contactTitle: "Ready to start?",
      contactSubtitle: "Let's talk now.",
      contactText: "I am available for freelance projects or to join a great team. Reach out and let's chat.",
      footerRights: "All rights reserved.",
      footerDesigned: "Designed and developed with dedication."
    }
  }
};

// Default exports to maintain compatibility just in case
export const personalInfo = portfolioData.es.personalInfo;
export const projects = portfolioData.es.projects;
export const skills = portfolioData.es.skills;
