import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ProjectConfig } from '../../interfaces/config/project.interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  @Input() showModal: boolean = false;
  @Input() project: ProjectConfig | null = null; 
  @Output() showModalChange = new EventEmitter<boolean>(); 
  showSkillModal: boolean = false;
  tecnology: string="";
 
  constructor(private http: HttpClient,public sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && this.showModal) {
      console.log(this.project)
    }
  }

  closeModal() {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }

  openSkillModal(name: string ) {
    this.showSkillModal = true;
    this.tecnology= name;
  }

  closeSkillModal() {
    this.showSkillModal = false;
  }

}
