import courtixVideo from '../assets/Video Courtix.mp4';

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
    description: "Plataforma integral para la gestión de reservas deportivas con panel de administración.",
    problemSolved: "Simplificamos el trabajo del propietario automatizando reservas y pagos, eliminando la sobrecarga de llamadas y mensajes mediante un dashboard automatizado.",
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    link: "#",
  },
  {
    title: "Gestión de Turnos con Chatbot",
    type: "Web + Bot",
    description: "Sistema automatizado de reservas vía WhatsApp sincronizado con calendario web.",
    problemSolved: "Automatiza la atención al cliente 24/7 de forma natural, reduciendo tiempos de espera y organizando la agenda sin intervención humana.",
    tags: ["Next.js", "Node.js", "WhatsApp API", "PostgreSQL", "Docker"],
    link: "#",
  },
  {
    title: "App de Gestión de Stock",
    type: "Mobile",
    description: "Aplicación móvil para el control de inventario en almacenes en tiempo real.",
    problemSolved: "Evita quiebres o excesos de stock logrando una sincronización multi-sucursal instantánea escaneando desde el teléfono.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
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
