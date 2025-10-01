import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { socialConfig } from '../../interfaces/config/social-config.interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-social-media',
  imports: [CommonModule],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  social: socialConfig[]=[];
  copying = false;
  copyStatus: string | null = null;
  sending = false;
  sendStatus: string | null = null;
  
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

  enviarMensaje(ev: Event){
    ev.preventDefault();
    if(this.sending) return;
    const form = ev.target as HTMLFormElement;
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value.trim();
    const mensaje = (form.querySelector('[name="mensaje"]') as HTMLTextAreaElement)?.value.trim();
    if(!email || !mensaje){
      this.sendStatus = 'Completa los campos';
      setTimeout(()=> this.sendStatus=null, 2500);
      return;
    }
    this.sending = true;
    this.sendStatus = null;
    // Simulación de envío (podrías integrar un endpoint real / email service)
    setTimeout(()=> {
      this.sending = false;
      this.sendStatus = 'Enviado';
      form.reset();
      setTimeout(()=> this.sendStatus=null, 3000);
    }, 1200);
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
