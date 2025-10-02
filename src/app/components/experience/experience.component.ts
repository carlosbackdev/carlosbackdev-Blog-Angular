import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItem } from '../../interfaces/config/experience.interfaces';
import { ExperienceService } from '../../services/experience.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ExperienceComponent {
  experience: ExperienceItem[] = [];
  loading = true;
  error: string | null = null;
  private sub?: Subscription;

  constructor(private expService: ExperienceService) {}

  ngOnInit(): void {
    this.sub = this.expService.getExperience().subscribe(state => {
      this.experience = state.items;
      this.error = state.error;
      this.loading = false;
      if(!this.error && this.experience.length){
        setTimeout(()=> this.initObserver(), 0);
      }
    });
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
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
