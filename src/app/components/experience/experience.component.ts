import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ExperienceData, ExperienceItem } from '../../interfaces/config/experience.interfaces';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experience: ExperienceItem[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ExperienceData>('/assets/data/experience.json').subscribe({
      next: (data) => {
        this.experience = data.experience;
        this.loading = false;
        setTimeout(()=> this.initObserver(), 0);
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar la experiencia';
        this.loading = false;
      }
    });
  }

  private initObserver(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = document.querySelectorAll('.timeline-item .card');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('reveal');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .15 });
    items.forEach((el, idx) => {
      (el as HTMLElement).style.animationDelay = (idx * 120)+'ms';
      obs.observe(el);
    });
  }
}
