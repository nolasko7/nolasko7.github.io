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
import googleCyberCert from '../assets/GoogleCybersecurityCert.png';
import googleCyberCertNew from '../assets/GoogleCybersecurityCertNew.png';
import rainImg0 from '../assets/willitrain0.png';
import rainImg1 from '../assets/willitrain1.png';

export const portfolioData = {
  es: {
    personalInfo: {
      name: "Valentin",
      role: "DevOps & Cloud · Software Developer",
      currentStatus: "2026 · Próximo Analista en Sistemas · Preparando AWS SAA-C03",
      description: "DevOps & Cloud junior de Villa Mercedes, Argentina. Construyo, despliego y opero mis propios proyectos en producción — contenedores con Docker, pipelines de CI/CD con GitHub Actions y Cloudflare — usados por clientes reales.",
      email: "valentin.nolasco123123@gmail.com", 
      github: "https://github.com/nolasko7", 
      linkedin: "https://www.linkedin.com/in/valentin-nolasco-987249374/", 
      whatsapp: "https://wa.me/5492657359495",
      cvDeveloperUrl: "/Valentin_Nolasco_CV_Developer_ES.pdf",
      cvCybersecurityUrl: "/Valentin_Nolasco_CV_Ciberseguridad_ES.pdf",
      cvDeveloperLabel: "Desarrollador",
      cvCybersecurityLabel: "Ciberseguridad",
      downloadCvText: "Descargar_CV",
      cvButtonText: "CV",
      cvSelectTitle: "Seleccionar CV"
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
        type: "Web + Bot (IA) · Infra en producción",
        description: "Sistema de turnos con bot de WhatsApp que usa una peluquería real. Me encargué de punta a punta: la app, los contenedores con Docker, el pipeline de CI/CD con GitHub Actions y Cloudflare.",
        problemSolved: "El negocio recibe turnos 24/7 sin intervención humana, y cada cambio llega a producción automáticamente a través del pipeline, sin deploys manuales ni caídas del servicio.",
        tags: ["Docker", "Github Actions", "Cloudflare", "CI/CD", "Node.js", "Next.js", "WhatsApp API", "PostgreSQL", "MySQL"],
        link: "https://github.com/nolasko7",
        github: "#"
      },
      {
        title: "Este Portfolio · Pipeline CI/CD",
        live: true,
        type: "DevOps · Deploy automatizado",
        description: "Cada push a main dispara un workflow de GitHub Actions que instala dependencias, compila el sitio con Vite inyectando las credenciales como secrets y lo publica en GitHub Pages, sin pasos manuales.",
        problemSolved: "Deploys reproducibles y sin intervención: las claves nunca quedan en el repositorio y cualquier cambio queda online en minutos con trazabilidad completa en el historial del pipeline.",
        tags: ["GitHub Actions", "CI/CD", "GitHub Pages", "Secrets Management", "Vite", "React"],
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
      { name: "AWS / EC2 / S3 / IAM / VPC / CloudFront / Route 53", subtitle: "Cloud (AWS)" },
      { name: "GitHub Actions / Jenkins / Pipelines / Secrets / Deploy automático", subtitle: "CI/CD" },
      { name: "Docker / Docker Compose / Cloudflare", subtitle: "Containers" },
      { name: "Node.js / Express / REST APIs / WebSockets", subtitle: "Backend APIs" },
      { name: "React / Next.js / Tailwind CSS", subtitle: "Frontend" },
      { name: "PostgreSQL / MySQL / SQL", subtitle: "Database" },
      { name: "Flutter / Dart / Android Studio", subtitle: "Mobile Development" },
      { name: "WhatsApp API / LLM", subtitle: "Automation" },
      { name: "Linux / Redes TCP/IP / SIEM / Análisis de Logs / TryHackMe / Google Cybersecurity", subtitle: "Security (DevSecOps)" }
    ],
    certifications: [
      {
        title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
        issuer: "Amazon Web Services",
        date: "En preparación",
        status: "in_progress",
        icon: "cloud",
        description: "Diseño de arquitecturas en AWS resilientes, seguras, de alto rendimiento y costo-eficientes: EC2, S3, VPC, IAM, RDS, CloudFront, Route 53 y el Well-Architected Framework."
      },
      {
        title: "TryHackMe SOC Level 1",
        issuer: "TryHackMe",
        date: "2026",
        status: "discontinued",
        progress: 50,
        icon: "shield",
        verifyUrl: "https://tryhackme.com/p/nolasko7",
        description: "Avancé el 50% del path práctico de analista SOC (triage de alertas, análisis de logs, SIEM y respuesta ante incidentes) antes de reorientar mi carrera hacia DevOps / Cloud."
      },
      {
        title: "Google Cybersecurity Professional Certificate (v.2)",
        issuer: "Coursera · Google",
        date: "Agosto 2026",
        status: "completed",
        image: googleCyberCertNew,
        images: [googleCyberCertNew, googleCyberCert],
        verifyUrl: "https://www.credly.com/go/rEaI6RrH",
        description: "Certificado profesional de 8 cursos que cubre fundamentos de ciberseguridad, gestión de riesgos, seguridad de redes, herramientas SIEM, detección de amenazas, scripting con Python y Linux, y respuesta ante incidentes según el framework NIST."
      }
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
      loaded: "",
      availability: "Disponible para roles de DevOps / Cloud y desarrollo",
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
      aboutP3: "Hoy enfoco mi carrera en DevOps y Cloud: me estoy preparando para la certificación AWS Solutions Architect Associate y ya automatizo el build y deploy de mis proyectos con Docker y GitHub Actions. Mi base en ciberseguridad (Certificado de Google y labs de SOC en TryHackMe) me ayuda a pensar la infraestructura con seguridad desde el diseño: mínimo privilegio, monitoreo y análisis de logs.",
      aboutBadge: "DevOps · Cloud",
      certificationsTitle: "Certificaciones",
      certCompleted: "Completado",
      certInProgress: "En curso",
      certDiscontinued: "Discontinuado",
      aboutAvailability: "Disponible para posiciones remotas, proyectos freelance y roles de DevOps / Cloud.",
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
      role: "DevOps & Cloud · AWS · Software Developer",
      currentStatus: "2026 · Systems Analyst — graduating soon · Preparing AWS SAA-C03",
      description: "Junior DevOps & Cloud engineer from Villa Mercedes, Argentina. I build, deploy and run my own projects in production — Docker containers, CI/CD pipelines with GitHub Actions and Cloudflare — used by real clients.",
      email: "valentin.nolasco123123@gmail.com", 
      github: "https://github.com/nolasko7", 
      linkedin: "https://www.linkedin.com/in/valentin-nolasco-987249374/", 
      whatsapp: "https://wa.me/5492657359495",
      cvDeveloperUrl: "/Valentin_Nolasco_CV_Developer_EN.pdf",
      cvCybersecurityUrl: "/Valentin_Nolasco_CV_Cybersecurity_EN.pdf",
      cvDeveloperLabel: "Developer",
      cvCybersecurityLabel: "Cybersecurity",
      downloadCvText: "Download_CV",
      cvButtonText: "CV",
      cvSelectTitle: "Select CV"
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
        type: "Web + AI Bot · Infra in production",
        description: "Appointment system with a WhatsApp bot used by a real hair salon. I owned it end to end: the app, Docker containers, the CI/CD pipeline with GitHub Actions, and Cloudflare.",
        problemSolved: "The business takes bookings 24/7 with no human intervention, and every change reaches production automatically through the pipeline — no manual deploys, no downtime.",
        tags: ["Docker", "Github Actions", "Cloudflare", "CI/CD", "Node.js", "Next.js", "WhatsApp API", "PostgreSQL", "MySQL"],
        link: "https://github.com/nolasko7",
        github: "#"
      },
      {
        title: "This Portfolio · CI/CD Pipeline",
        live: true,
        type: "DevOps · Automated deploy",
        description: "Every push to main triggers a GitHub Actions workflow that installs dependencies, builds the site with Vite injecting credentials as secrets, and publishes it to GitHub Pages — no manual steps.",
        problemSolved: "Reproducible, hands-off deploys: keys never live in the repository, and any change goes live in minutes with full traceability in the pipeline history.",
        tags: ["GitHub Actions", "CI/CD", "GitHub Pages", "Secrets Management", "Vite", "React"],
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
      { name: "AWS / EC2 / S3 / IAM / VPC / CloudFront / Route 53", subtitle: "Cloud (AWS)" },
      { name: "GitHub Actions / Jenkins / Pipelines / Secrets / Automated Deploy", subtitle: "CI/CD" },
      { name: "Docker / Docker Compose / Cloudflare", subtitle: "Containers" },
      { name: "Node.js / Express / REST APIs / WebSockets", subtitle: "Backend APIs" },
      { name: "React / Next.js / Tailwind CSS", subtitle: "Frontend" },
      { name: "PostgreSQL / MySQL / SQL", subtitle: "Database" },
      { name: "Flutter / Dart / Android Studio", subtitle: "Mobile Development" },
      { name: "WhatsApp API / LLM", subtitle: "Automation" },
      { name: "Linux / TCP/IP Networking / SIEM / Log Analysis / TryHackMe / Google Cybersecurity", subtitle: "Security (DevSecOps)" }
    ],
    certifications: [
      {
        title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
        issuer: "Amazon Web Services",
        date: "In preparation",
        status: "in_progress",
        icon: "cloud",
        description: "Designing resilient, secure, high-performing and cost-optimized architectures on AWS: EC2, S3, VPC, IAM, RDS, CloudFront, Route 53 and the Well-Architected Framework."
      },
      {
        title: "TryHackMe SOC Level 1",
        issuer: "TryHackMe",
        date: "2026",
        status: "discontinued",
        progress: 50,
        icon: "shield",
        verifyUrl: "https://tryhackme.com/p/nolasko7",
        description: "Completed 50% of the hands-on SOC analyst path (alert triage, log analysis, SIEM and incident response) before refocusing my career on DevOps / Cloud."
      },
      {
        title: "Google Cybersecurity Professional Certificate (v.2)",
        issuer: "Coursera · Google",
        date: "August 2026",
        status: "completed",
        image: googleCyberCertNew,
        images: [googleCyberCertNew, googleCyberCert],
        verifyUrl: "https://www.credly.com/go/rEaI6RrH",
        description: "An 8-course professional certificate covering cybersecurity fundamentals, risk management, network security, SIEM tools, threat detection, Python and Linux scripting, and incident response following the NIST framework."
      }
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
      availability: "Available for junior DevOps / Cloud & development roles",
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
      aboutP3: "Today my career is focused on DevOps and Cloud: I'm preparing for the AWS Solutions Architect Associate certification and I already automate the build and deploy of my projects with Docker and GitHub Actions. My cybersecurity background (Google's Certificate and SOC labs on TryHackMe) helps me design infrastructure with security in mind: least privilege, monitoring and log analysis.",
      aboutBadge: "DevOps · Cloud",
      certificationsTitle: "Certifications",
      certCompleted: "Completed",
      certInProgress: "In progress",
      certDiscontinued: "Discontinued",
      aboutAvailability: "Available for remote positions, freelance projects, and junior DevOps / Cloud roles.",
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