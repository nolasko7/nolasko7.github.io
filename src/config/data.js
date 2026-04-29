import courtixVideo from '../assets/Video Courtix.mp4';
import peluqueriaVideo from '../assets/TurnosPeluqueria.mp4';
import almacenVideo from '../assets/Mi Almacen.mp4';

import courtixImg0 from '../assets/Courtix0.png';
import courtixImg1 from '../assets/Courtix1.png';
import courtixImg2 from '../assets/Courtix2.png';
import courtixImg3 from '../assets/Courtix3.png';
import courtixImg4 from '../assets/Courtix4.png';

import citaxImg0 from '../assets/Citax0.png';
import citaxImg1 from '../assets/Citax1.png';
import citaxImg2 from '../assets/Citax2.png';
import citaxImg3 from '../assets/Citax3.png';
import citaxImg4 from '../assets/Citax4.png';
import citaxImg5 from '../assets/Citax5.png';

import almacenImg0 from '../assets/Almacen0.png';
import almacenImg1 from '../assets/Almacen1.png';
import almacenImg2 from '../assets/Almacen2.png';
import almacenImg3 from '../assets/Almacen3.png';

import nasaCert from '../assets/CertificadoNASA.jpg';
import rainImg0 from '../assets/willitrain0.png';
import rainImg1 from '../assets/willitrain1.png';

export const portfolioData = {
  es: {
    personalInfo: {
      name: "Valentin",
      role: "Software Developer · Web & Mobile · Automatizacion",
      currentStatus: "2026 · Próximo Analista en Sistemas",
      description: "Software Developer de Villa Mercedes, Argentina. Tres proyectos en producción usados por clientes reales — desde bots de WhatsApp hasta apps móviles de gestión de stock.",
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
        images: [courtixImg0, courtixImg1, courtixImg2, courtixImg3, courtixImg4],
        type: "Web app",
        description: "Plataforma integral de gestión deportiva. Digitaliza reservas y pagos de canchas, optimizando la administración de complejos deportivos reales.",
        problemSolved: "Digitaliza y agiliza el negocio automatizando reservas y pagos, minimizando la sobrecarga de comunicaciones a través de un dashboard de control centralizado.",
        tags: ["Node.js", "Express", "PostgreSQL", "React"],
        link: "https://github.com/nolasko7",
        github: "#"
      },
      {
        title: "Gestión de Turnos con Chatbot",
        video: peluqueriaVideo,
        images: [citaxImg0, citaxImg1, citaxImg2, citaxImg3, citaxImg4, citaxImg5],
        type: "Web + Bot (IA) en producción",
        description: "Desarrollé un sistema de turnos con bot de WhatsApp que está en producción y lo usa una peluquería real. Maneja reservas automáticamente sin intervención humana.",
        problemSolved: "Optimiza exponencialmente el tiempo del peluquero al delegar la interacción en el bot, asegurando que los turnos estén siempre perfectamente organizados en la agenda de forma automática.",
        tags: ["Next.js", "Node.js", "WhatsApp API", "PostgreSQL", "Docker", "Cloudflare", "Github Actions", "MySQL"],
        link: "https://github.com/nolasko7",
        github: "#"
      },
      {
        title: "App de Gestión de Stock",
        video: almacenVideo,
        videoClass: "object-contain",
        images: [almacenImg0, almacenImg1, almacenImg2, almacenImg3],
        type: "Mobile app en producción",
        description: "Aplicación móvil para control de inventario utilizada en comercios reales. Implementa escaneo con cámara para sincronizar stock físico con bases de datos en tiempo real.",
        problemSolved: "Agiliza el flujo de ventas e impide quiebres de stock sincronizando la lectura física de productos en el almacén directamente con la base de datos central.",
        tags: ["Dart", "Flutter", "MySQL", "Android Studio"],
        link: "https://github.com/nolasko7",
        github: "#"
      },
      {
        title: "NASA Space Apps Challenge",
        images: [nasaCert, rainImg0, rainImg1],
        type: "Hackathon Internacional · 2025",
        description: "Participación en el hackathon más grande del mundo organizado por la NASA, ESA y otras agencias espaciales. Desarrollamos 'Will it rain', una solución para la predicción y visualización meteorológica.",
        problemSolved: "Desarrollo de una solución tecnológica grupal bajo presión de tiempo, enfocada en el trabajo colaborativo, la resolución de problemas complejos y la comunicación efectiva en un equipo internacional.",
        tags: ["NASA API", "Data Visualization", "Teamwork", "Problem Solving"],
        link: "https://github.com/nolasko7",
        github: "#"
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
      aboutP1: "Soy desarrollador de software de Villa Mercedes, Argentina. Estoy por recibirme de Analista en Sistemas y terminando mi carrera como Ingeniero en Sistemas. Me especializo en construir productos que resuelven problemas reales: sistemas de turnos, automatizaciones con WhatsApp y aplicaciones móviles que la gente usa todos los días.",
      aboutP2: "Algunos de mis proyectos están en producción y los usan clientes reales. Eso me enseñó más que cualquier curso — a tomar decisiones bajo presión, a priorizar lo que funciona y a iterar rápido cuando algo falla.",
      aboutAvailability: "Disponible para proyectos freelance and remote positions.",
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
      role: "Software Developer · Web & Mobile · Automation",
      currentStatus: "2026 · Systems Analyst — graduating soon",
      description: "Software Developer from Villa Mercedes, Argentina. Three projects in production used by real clients — from WhatsApp bots to mobile inventory apps.",
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
        images: [courtixImg0, courtixImg1, courtixImg2, courtixImg3, courtixImg4],
        type: "Web app",
        description: "Comprehensive sports management platform. Digitalizes court reservations and payments, optimizing the administration of real sports complexes.",
        problemSolved: "Digitalizes and speeds up the business by automating reservations and payments, minimizing communication overhead through a centralized control dashboard.",
        tags: ["Node.js", "Express", "PostgreSQL", "React"],
        link: "https://github.com/nolasko7",
        github: "#"
      },
      {
        title: "Appointment Management with Chatbot",
        video: peluqueriaVideo,
        images: [citaxImg0, citaxImg1, citaxImg2, citaxImg3, citaxImg4, citaxImg5],
        type: "Web + AI Bot in production",
        description: "Developed an appointment system with a WhatsApp bot currently in production, used by a real hair salon. Handles reservations automatically without human intervention.",
        problemSolved: "Exponentially optimizes the hairdresser's time by delegating interactions to the bot, ensuring appointments are perfectly and automatically organized in the agenda.",
        tags: ["Next.js", "Node.js", "WhatsApp API", "PostgreSQL", "Docker", "Cloudflare", "Github Actions", "MySQL"],
        link: "https://github.com/nolasko7",
        github: "#"
      },
      {
        title: "Inventory Management App",
        video: almacenVideo,
        videoClass: "object-contain",
        images: [almacenImg0, almacenImg1, almacenImg2, almacenImg3],
        type: "Mobile app in production",
        description: "Mobile application for inventory control used in real retail stores. Implements camera scanning to synchronize physical stock with databases in real-time.",
        problemSolved: "Speeds up the sales flow and prevents stockouts by synchronizing physical product scanning in the warehouse directly with the central database.",
        tags: ["Dart", "Flutter", "MySQL", "Android Studio"],
        link: "https://github.com/nolasko7",
        github: "#"
      },
      {
        title: "NASA Space Apps Challenge",
        images: [nasaCert, rainImg0, rainImg1],
        type: "International Hackathon · 2025",
        description: "Participation in the world's largest hackathon organized by NASA, ESA, and other space agencies. We developed 'Will it rain', a solution for weather prediction and visualization.",
        problemSolved: "Developed a group technological solution under time pressure, focusing on collaborative work, complex problem solving, and effective communication in an international team.",
        tags: ["NASA API", "Data Visualization", "Teamwork", "Problem Solving"],
        link: "https://github.com/nolasko7",
        github: "#"
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
      aboutP1: "I am a Software Developer from Villa Mercedes, Argentina. I am about to graduate as a Systems Analyst and finishing my degree as a Systems Engineer. I specialize in building products that solve real problems: appointment systems, WhatsApp automations, and mobile applications that people use every day.",
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