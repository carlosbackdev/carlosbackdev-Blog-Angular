import { Component } from '@angular/core';
import { SkillPrincipal } from '../../interfaces/config/skill-config.interfaces';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('/assets/data/skill.json').subscribe({ 
      next: (data: any) =>{ 
      this.skillPrincipal = data.skillPrincipal; 
      this.bases = data.bases; 
      this.interfaces = data.otras; 
      this.sistemas = data.sistemas;
      },error:(error) => { 
        console.error('Error cargando los datos:', error); 
      } 
    }); 
  }

}
