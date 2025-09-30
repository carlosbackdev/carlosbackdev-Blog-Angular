export interface ExperienceTechnology {
  name: string;         // Nombre de la tecnología (Java, Kafka, etc.)
  image: string;        // Ruta al logo
}

export interface ExperienceItem {
  company: string;               // Empresa: Gestamp
  role: string;                  // Rol principal: Desarrollador de back-end
  mode: string;                  // Jornada completa / Híbrido
  location: string;              // Ubicación
  start: string;                 // Fecha inicio (ISO o texto)
  end?: string;                  // Fecha fin opcional ("actualidad")
  summary: string;               // Resumen breve
  responsibilities: string[];    // Lista de responsabilidades
  technologies: ExperienceTechnology[]; // Tecnologías claves
  skills: string[];              // Lista de skills/aptitudes
  logo: string;                  // Logo empresa
}

export interface ExperienceData {
  experience: ExperienceItem[];
}
