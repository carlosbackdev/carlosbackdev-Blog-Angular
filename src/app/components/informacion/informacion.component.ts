import { Component } from '@angular/core';
import { Education, Experience, UserProfile } from '../../interfaces/config/profile-config.iterfaces';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion',
  imports: [CommonModule],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent {
  profile: UserProfile | null = null;
  education: Education[]=[];
  experience: Experience[]=[];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.http.get<any>('assets/data/profile.json').subscribe({
      next: (data)=>{
        this.profile=data;
        this.education=data.education;
        this.experience=data.experience;
        console.log("educacuin:",this.education);
        console.log("expereivcia:",this.experience);
        console.log("perfil:",this.profile)
      },error:(error)=>{
        console.error("error a cargar el pefil",error); 
      }
    });
  }

}
