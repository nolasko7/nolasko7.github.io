import courtixVideo from '../assets/Video Courtix.mp4';
import peluqueriaVideo from '../assets/TurnosPeluqueria.mp4';
import almacenVideo from '../assets/Mi Almacen.mp4';

export const personalInfo = {
  name: "Valentin",
  role: "Desarrollador Web",
  description: "Desarrollador enfocado en crear experiencias interactivas y escalables.",
  email: "tuemail@ejemplo.com", // Cambiar por tu correo
  github: "https://github.com/tu-usuario", // Cambiar por tu GitHub
  linkedin: "https://linkedin.com/in/tu-usuario", // Cambiar por tu LinkedIn
  whatsapp: "https://wa.me/numerodewi" // Cambiar por tu número de WhatsApp
};

export const projects = [
  {
    title: "Sistema de Reservas de Cancha",
    video: courtixVideo,
    type: "Web",
    description: "Plataforma integral orientada a la gestión eficiente de reservas deportivas y administración de instalaciones.",
    problemSolved: "Digitaliza y agiliza el negocio automatizando reservas y pagos, minimizando la sobrecarga de comunicaciones a través de un dashboard de control centralizado.",
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    link: "#",
  },
  {
    title: "Gestión de Turnos con Chatbot",
    video: peluqueriaVideo,
    type: "Web + Bot",
    description: "Asistente virtual impulsado por IA diseñado para la atención y agendamiento interactivo y autónomo de clientes.",
    problemSolved: "Optimiza exponencialmente el tiempo del peluquero al delegar la interacción en el bot, asegurando que los turnos estén siempre perfectamente organizados en la agenda de forma automática.",
    tags: ["Next.js", "Node.js", "WhatsApp API", "PostgreSQL", "Docker", "Cloudflare"],
    link: "#",
  },
  {
    title: "App de Gestión de Stock",
    video: almacenVideo,
    videoClass: "object-contain",
    type: "Mobile",
    description: "Solución móvil avanzada para el control integral de inventarios mediante sistema de escaneo incorporado utilizando la cámara del dispositivo.",
    problemSolved: "Agiliza el flujo de ventas e impide quiebres de stock sincronizando la lectura física de productos en el almacén directamente con la base de datos central.",
    tags: ["Dart", "Flutter", "MySQL"],
    link: "#",
  }
];

export const skills = [
  { name: "React / Next.js", subtitle: "Frontend & SSR" },
  { name: "Node.js / Express", subtitle: "Backend APIs" },
  { name: "React Native", subtitle: "Mobile Development" },
  { name: "PostgreSQL / SQL", subtitle: "Database" },
  { name: "Docker / DevOps", subtitle: "Deployment" },
  { name: "WhatsApp API / Bots", subtitle: "Automation" }
];
