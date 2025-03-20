import { Component } from '@angular/core';
import { ProjectConfig, ProjectImages } from '../../interfaces/config/project.interfaces';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projectConfig: ProjectConfig[]= [];

  ngOnInit(): void {
    fetch('/assets/data/project.json')
    .then(response => response.json())
    .then((data) => {
      this.projectConfig = data;
      console.log(this.projectConfig);
    })
    .catch(error => console.error('Error cargando los datos:', error));
    

  }

}
