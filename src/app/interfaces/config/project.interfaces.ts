import { SkillPrincipal } from "./skill-config.interfaces";

export interface ProjectConfig{
    title: string;
    images: ProjecImages[];
    repository:string;
    link:string;
    descripcion:string;
    tecnology: SkillPrincipal[];
}
export interface ProjecImages{
    image:string;
}