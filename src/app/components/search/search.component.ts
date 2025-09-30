import { Component, EventEmitter, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ProjectEntry { title: string; descripcion?: string; tecnology?: { name: string; image: string }[]; link?: string; repository?: string; id?: number; }

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() closed = new EventEmitter<void>();
  query = signal('');
  loading = signal(false);
  projects = signal<ProjectEntry[]>([]);

  results = computed(() => {
    const q = this.query().toLowerCase().trim();
    if(!q) return [];
    return this.projects().filter(p => {
      const hay = [p.title, p.descripcion, ...(p.tecnology?.map(t=>t.name)||[])].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    }).slice(0, 25);
  });

  constructor(private http: HttpClient){ }
  ngOnInit(){
    this.loading.set(true);
    this.http.get<ProjectEntry[]>('/assets/data/project.json').subscribe({
      next: data => { this.projects.set(data); this.loading.set(false); },
      error: err => { console.error('Error loading projects', err); this.loading.set(false); }
    });
    // Pre llenar query desde URL si existe ?s=
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    if(s){ this.query.set(s); }
  }
  onInput(ev: Event){
    const value = (ev.target as HTMLInputElement).value;
    this.query.set(value);
    const url = new URL(window.location.href);
    if(value) url.searchParams.set('s', value); else url.searchParams.delete('s');
    window.history.replaceState({}, '', url.toString());
  }
  close(){ this.closed.emit(); }
  keyHandler(ev: KeyboardEvent){ if(ev.key==='Escape'){ this.close(); } }
}
