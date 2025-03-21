import { Component } from '@angular/core';
import { ProjectConfig, ProjectImages } from '../../interfaces/config/project.interfaces';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';


@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectDetailComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projectConfig: ProjectConfig[]= [];
  showProjectModal: boolean = false;
  selectedProject: ProjectConfig | null = null;


  constructor(private http: HttpClient){}

  ngOnInit(): void {

    this.http.get<ProjectConfig[]>('/assets/data/project.json').subscribe({ 
      next:(data) => {
        this.projectConfig=data;
      },
      error:(error) => { 
        console.error('Error cargando los datos:', error); 
      } 
    }); 

  }
  openProjectModal(project: ProjectConfig) {
    this.selectedProject = project;  
    this.showProjectModal = true;
  }

  closeProjectModal() {
    this.showProjectModal = false;
    this.selectedProject = null;  
  }

}
