import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExperienceData, ExperienceItem } from '../interfaces/config/experience.interfaces';
import { catchError, map, of, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private http = inject(HttpClient);

  private cache$ = this.http.get<ExperienceData>('assets/data/experience.json')
    .pipe(
      map(data => {
        const arr = Array.isArray(data.experience) ? data.experience : [];
        const cleaned: ExperienceItem[] = arr.map(it => ({ ...it })) // shallow clone
          .filter(it => typeof it.company === 'string' && typeof it.role === 'string');
        return { items: cleaned, error: null as string | null };
      }),
      catchError(err => {
        console.error('[ExperienceService] error cargando JSON', err);
        return of({ items: [] as ExperienceItem[], error: 'No se pudo cargar la experiencia' });
      }),
      shareReplay({ bufferSize: 1, refCount: false })
    );

  getExperience(){
    return this.cache$;
  }
}
