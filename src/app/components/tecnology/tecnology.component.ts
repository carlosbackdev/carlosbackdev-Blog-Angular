import { Component } from '@angular/core';
import { SkillPrincipal } from '../../interfaces/config/skill-config.interfaces';

@Component({
  selector: 'app-tecnology',
  imports: [],
  templateUrl: './tecnology.component.html',
  styleUrl: './tecnology.component.scss'
})
export class TecnologyComponent {
  skillPrincipal: SkillPrincipal[] = [];
  bases: SkillPrincipal[] = [];
  interfaces: SkillPrincipal[] = [];
  sistemas: SkillPrincipal[] = [];

  ngOnInit(): void {
    fetch('/assets/data/skill.json')
      .then(response => response.json())
      .then((data) => {
        this.skillPrincipal = data.skillPrincipal;
        this.bases = data.bases;
        this.interfaces = data.otras;
        this.sistemas = data.sistemas;
      })
      .catch(error => console.error('Error cargando los datos:', error));
  }

}
