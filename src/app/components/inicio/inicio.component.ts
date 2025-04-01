import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoConfig } from '../../interfaces/config/video-config.interfaces';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  animations: [
    trigger('iframeFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),  // Comienza con opacidad 0 y desplazado
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))  // Aparece de manera suave
      ])
    ]),
    trigger('buttonFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),  // Comienza un poco desplazado
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))  // Se muestra suavemente
      ])
    ])
  ]
})
export class InicioComponent implements AfterViewInit {
  @ViewChild('prevVideoButton') prevVideoButton!: ElementRef;
  @ViewChild('nextVideoButton') nextVideoButton!: ElementRef;

  videos: VideoConfig[] = [];
  currentVideoIndex = 0;

  constructor(public sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<VideoConfig[]>('/assets/data/videos.json').subscribe({ 
      next: (data) => { 
      this.videos = data; 
      this.updateButtonVisibility(); 
      },error:(error) =>{ 
        console.error("erro a cargar los videos",error); 
      } 
    }); 
  }

  ngAfterViewInit() {
    this.updateButtonVisibility();
  }

  nextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
    this.updateButtonVisibility();
  }

  prevVideo() {
    this.currentVideoIndex = (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
    this.updateButtonVisibility();
  }

  updateButtonVisibility() {
    if (!this.prevVideoButton || !this.nextVideoButton) return; // Evita errores si aún no están disponibles

    if (this.currentVideoIndex === 0) {
      this.prevVideoButton.nativeElement.style.opacity = '0';
      this.prevVideoButton.nativeElement.style.cursor = 'default';
    } else {
      this.prevVideoButton.nativeElement.style.opacity = '1';
      this.prevVideoButton.nativeElement.style.cursor = 'pointer';
    }

    if (this.currentVideoIndex === this.videos.length - 1) {
      this.nextVideoButton.nativeElement.style.opacity = '0';
      this.nextVideoButton.nativeElement.style.cursor = 'default';
    } else {
      this.nextVideoButton.nativeElement.style.opacity = '1';
      this.nextVideoButton.nativeElement.style.cursor = 'pointer';
    }
  }
}
