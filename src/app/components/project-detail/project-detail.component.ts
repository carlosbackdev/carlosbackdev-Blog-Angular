import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ProjectConfig } from '../../interfaces/config/project.interfaces';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  @Input() showModal: boolean = false;
  @Input() project: ProjectConfig | null = null; 
  @Output() showModalChange = new EventEmitter<boolean>(); 
 
  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && this.showModal) {
    }
  }

  closeModal() {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }

}
