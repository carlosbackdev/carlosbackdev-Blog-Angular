import { SkillPrincipal } from "./skill-config.interfaces";

export interface ProjectConfig{
    title: string;
    images: ProjectImages[];
    repository:string;
    link:string;
    descripcion:string;
    tecnology: SkillPrincipal[];
    onClick?: () => any
}
export interface ProjectImages{
    image:string;
}