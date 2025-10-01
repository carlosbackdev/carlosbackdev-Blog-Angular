import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ExperienceData, ExperienceItem } from '../../interfaces/config/experience.interfaces';
import { validateObject } from '../../utils/validation';

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
        if (!Array.isArray(data.experience)) {
          console.warn('Formato experiencia no es un array');
          this.experience = [];
        } else {
          // Aceptamos technologies como array de objetos sin validar su shape aquí
          this.experience = data.experience.filter(item => {
            const valid = validateObject(item, {
              company: 'string',
              role: 'string',
              mode: 'string',
              location: 'string',
              start: 'string',
              end: 'optional:string',
              summary: 'string',
              responsibilities: 'array:string',
              skills: 'array:string',
              logo: 'string',
              impact: 'optional:string',
              metrics: 'optional:array:string'
            } as any);
            if (!valid) console.warn('Item experiencia inválido omitido:', item);
            return valid;
          });
        }
        this.loading = false;
        if (this.experience.length) setTimeout(()=> this.initObserver(), 0);
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
