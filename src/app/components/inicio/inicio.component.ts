import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoConfig } from '../../interfaces/config/video-config.interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements AfterViewInit {
  @ViewChild('prevVideoButton') prevVideoButton!: ElementRef;
  @ViewChild('nextVideoButton') nextVideoButton!: ElementRef;

  videos: VideoConfig[] = [];
  currentVideoIndex = 0;

  constructor(public sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<VideoConfig[]>('/assets/data/videos.json').subscribe((data) => {
      this.videos = data;
      this.updateButtonVisibility();
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
