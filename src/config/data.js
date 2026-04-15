import courtixVideo from '../assets/Video Courtix.mp4';
import peluqueriaVideo from '../assets/TurnosPeluqueria.mp4';
import almacenVideo from '../assets/Mi Almacen.mp4';

export const personalInfo = {
  name: "Valentin",
  role: "Full Stack Developer · Web & Mobile · Automatizacion",
  description: "Desarrollador enfocado en crear experiencias interactivas y escalables.",
  email: "valentin.nolasco123123@gmail.com", 
  github: "https://github.com/nolasko7", 
  linkedin: "https://www.linkedin.com/in/valentin-nolasco-987249374/", 
  whatsapp: "https://wa.me/5492657359495",
  cvUrlEs: "/CV ESP.pdf",
  cvUrlEn: "/CV EN.pdf" 
};

export const projects = [
  {
    title: "Sistema de Reservas de Cancha",
    video: courtixVideo,
    type: "Web app en producción",
    description: "Plataforma integral de gestión deportiva. Digitaliza reservas y pagos de canchas, optimizando la administración de complejos deportivos reales.",
    problemSolved: "Digitaliza y agiliza el negocio automatizando reservas y pagos, minimizando la sobrecarga de comunicaciones a través de un dashboard de control centralizado.",
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    link: "#",
  },
  {
    title: "Gestión de Turnos con Chatbot",
    video: peluqueriaVideo,
    type: "Web + Bot (IA) en producción",
    description: "Desarrollé un sistema de turnos con bot de WhatsApp que está en producción y lo usa una peluquería real. Maneja reservas automáticamente sin intervención humana.",
    problemSolved: "Optimiza exponencialmente el tiempo del peluquero al delegar la interacción en el bot, asegurando que los turnos estén siempre perfectamente organizados en la agenda de forma automática.",
    tags: ["Next.js", "Node.js", "WhatsApp API", "PostgreSQL", "Docker", "Cloudflare", "Github Actions", "MySQL"],
    link: "#",
  },
  {
    title: "App de Gestión de Stock",
    video: almacenVideo,
    videoClass: "object-contain",
    type: "Mobile app en producción",
    description: "Aplicación móvil para control de inventario utilizada en comercios reales. Implementa escaneo con cámara para sincronizar stock físico con bases de datos en tiempo real.",
    problemSolved: "Agiliza el flujo de ventas e impide quiebres de stock sincronizando la lectura física de productos en el almacén directamente con la base de datos central.",
    tags: ["Dart", "Flutter", "MySQL", "Android Studio"],
    link: "#",
  }
];

export const skills = [
  { name: "React / Next.js / Tailwind CSS", subtitle: "Frontend" },
  { name: "Node.js / Express / REST APIs / WebSockets", subtitle: "Backend APIs" },
  { name: "Flutter / Dart / Android Studio", subtitle: "Mobile Development" },
  { name: "PostgreSQL / SQL", subtitle: "Database" },
  { name: "Docker / Cloudflare / Github Actions", subtitle: "Deployment" },
  { name: "WhatsApp API / LLM", subtitle: "Automation" }
];
