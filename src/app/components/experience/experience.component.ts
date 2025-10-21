import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItem } from '../../interfaces/config/experience.interfaces';
import { ExperienceService } from '../../services/experience.service';
import { Subscription } from 'rxjs';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    });
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }

  trackByExp(index: number, item: ExperienceItem){
    return item.company + '|' + item.role + '|' + item.start;
  }

  trackByTech(index: number, tech: { name: string; image: string }){
    return tech?.name ?? index;
  }

  trackByString(index: number, value: string){
    return value ?? index;
  }
}
