import { Component } from '@angular/core';
import { socialConfig } from '../../interfaces/social-config.interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-social-media',
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  social: socialConfig[]=[];
  
  constructor(private http: HttpClient){}

  this.http.get<socialConfig[]>(/assets)

  copiarEmail() {
    const email = 'carlosbackdev@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      alert('Correo copiado al portapapeles.');
    }).catch(err => {
      console.error('Error al copiar el correo: ', err);
    });
  }
  

}
