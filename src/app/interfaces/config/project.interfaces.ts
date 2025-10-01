import { SkillPrincipal } from "./skill-config.interfaces";

export interface ProjectConfig{
    slug?: string;
    title: string;
    video: string;
    images: ProjectImages[];
    repository:string;
    link:string;
    descripcion:string;
    explication:string;
    tecnology: SkillPrincipal[];
    dos?: string[];
    donts?: string[];
    tradeoffs?: string[];
    diferenciacion?: string[];
    metrics?: ProjectMetric[]; // métricas clave del proyecto (latencia, disponibilidad, etc.)
    onClick?: () => any
    id?: number;
}
export interface ProjectImages{
    image:string;
}
export interface ProjectMetric {
    name: string; // Nombre corto (Latency p95, OCR Accuracy, Uptime)
    target?: string; // Objetivo o SLA previsto (e.g. "<8s", ">99.5%")
    current?: string; // Valor actual observado (opcional)
    unit?: string; // Unidad si procede (ms, %, rps)
    description?: string; // Contexto breve opcional
}