import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ProjectConfig } from '../../interfaces/config/project.interfaces';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-skill-detail',
  standalone: true,
  imports: [CommonModule, ProjectDetailComponent],
  templateUrl: './skill-detail.component.html',
  styleUrl: './skill-detail.component.scss'
})
export class SkillDetailComponent {
  @Input() showModal: boolean = false;
  @Input() tecnology: string = "";
  @Output() showModalChange = new EventEmitter<boolean>();
  projectConfig: ProjectConfig[]= [];
  selectedProject: ProjectConfig | null = null;
  showProjectModal: boolean = false;
  projectIds: number[]=[];
  projects: any[] = [];
  techImage: string="";
  resumen:string="";
  

constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && this.showModal) {
      this.loadProjectsByTechnology();
    }
  }
  loadProjectsByTechnology() {
    if (!this.tecnology) return;
    this.http.get<any>('/assets/data/skillproject.json').subscribe(Data => {
      const techInfo = Data[this.tecnology];
      if (techInfo && techInfo.projects) {
        this.projectIds = techInfo.projects.map((p: any) => Number(p.id));
        this.techImage=techInfo.image;
        this.resumen=techInfo.resume;
        console.log("IDs obtenidos:", this.projectIds);

        // 2. Obtener todos los proyectos y filtrarlos por los IDs obtenidos
        this.http.get<any[]>('/assets/data/project.json').subscribe(projectsData => {
          this.projects = projectsData.filter(project => this.projectIds.includes(project.id));
          console.log("skill prube"+this.projects);
        });
      }
    });
  }

  openProjectModal(project: ProjectConfig) {
      this.selectedProject = project;  
      this.showProjectModal = true;
      this.closeModal();
    }
  

  closeModal() {
    this.showModal = false;
    this.projectIds=[];
    this.projects=[];
    this.showModalChange.emit(this.showModal);
  }

}
