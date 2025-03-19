import { SkillPrincipal } from "./skill-config.interfaces";

export interface ProjectConfig{
    title: string;
    images: ProjectImages[];
    repository:string;
    link:string;
    descripcion:string;
    tecnology: SkillPrincipal[];
}
export interface ProjectImages{
    image:string;
}