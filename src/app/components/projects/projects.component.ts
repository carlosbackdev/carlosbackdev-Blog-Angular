import { Component, ElementRef, ViewChild } from '@angular/core';
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
  clickCount: number = 0; // Contador de clics
  maxClicks: number=4; 
  isAtStart: boolean = true;
  isAtEnd: boolean = false;
  @ViewChild('projectList', { static: false }) projectList!: ElementRef;



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
  scrollProjects(direction: number) {
    if (this.projectList) {
      const scrollContainer = this.projectList.nativeElement;
      const scrollAmount = 400;
  
      scrollContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  
      this.clickCount += direction; // Aumenta o disminuye según la dirección
  
      setTimeout(() => {
        this.isAtStart = this.clickCount <= 0; 
        this.isAtEnd = this.clickCount >= this.maxClicks; // Si llega al máximo de clics, estamos al final
      }, 50);
    }
  }

}
