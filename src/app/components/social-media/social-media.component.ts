import { Component } from '@angular/core';
import { socialConfig } from '../../interfaces/config/social-config.interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-social-media',
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  social: socialConfig[]=[];
  copying = false;
  copyStatus: string | null = null;
  
  constructor(private http: HttpClient){}
  ngOnInit(){
    this.http.get<socialConfig[]>('/assets/data/social.json').subscribe({
      next: (data) => {
        this.social=data;
      },error:(error)=>{
        console.error('error al cargar social media',error);
      }
    });
  }


  copiarEmail() {
    if(this.copying) return;
    const email = 'carlosbackdev@gmail.com';
    this.copying = true;
    this.copyStatus = null;
    navigator.clipboard.writeText(email).then(() => {
      this.copyStatus = 'Copiado!';
    }).catch(err => {
      console.error('Error al copiar el correo: ', err);
      this.copyStatus = 'Error';
    }).finally(()=>{
      this.copying = false;
      setTimeout(()=>{ this.copyStatus = null; }, 3000);
    });
  }
  

}
