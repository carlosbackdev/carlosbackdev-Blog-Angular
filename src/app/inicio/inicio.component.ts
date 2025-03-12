import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  videos: string[] = [
    'https://player.vimeo.com/video/1065072327?badge=0&autopause=0&player_id=0&app_id=58479',
    'https://player.vimeo.com/video/1065067394?badge=0&autopause=0&player_id=0&app_id=58479'
  ];
  currentVideoIndex = 0;

  constructor(public sanitizer: DomSanitizer) {}

  nextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
  }

  prevVideo() {
    this.currentVideoIndex = (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
  }

}
