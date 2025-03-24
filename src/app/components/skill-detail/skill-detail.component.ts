import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skill-detail',
  imports: [CommonModule],
  templateUrl: './skill-detail.component.html',
  styleUrl: './skill-detail.component.scss'
})
export class SkillDetailComponent {
  @Input() showModal: boolean = false;
  @Output() showModalChange = new EventEmitter<boolean>();

constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && this.showModal) {

    }
  }

  closeModal() {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }

}
