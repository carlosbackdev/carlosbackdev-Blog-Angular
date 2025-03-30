export interface Experience {
    title: string;
    functions: string[];
  }
  
  export interface Education {
    title: string;
    details: string[];
  }
  
  export interface UserProfile {
    name: string;
    resume: string;
    image:string;
    experience: Experience[];
    education: Education[];
  }
  