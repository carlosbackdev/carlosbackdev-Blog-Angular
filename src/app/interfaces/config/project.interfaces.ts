import { SkillPrincipal } from "./skill-config.interfaces";

export interface ProjectConfig{
    title: string;
    video: string;
    images: ProjectImages[];
    repository:string;
    link:string;
    descripcion:string;
    explication:string;
    tecnology: SkillPrincipal[];
    onClick?: () => any
    id?: number;
}
export interface ProjectImages{
    image:string;
}