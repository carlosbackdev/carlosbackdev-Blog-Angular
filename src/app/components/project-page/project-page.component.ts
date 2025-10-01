import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectConfig } from '../../interfaces/config/project.interfaces';
import { SeoService } from '../../services/seo.service';
import { MarkdownModule } from 'ngx-markdown';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownModule, CountUpDirective],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPageComponent {
  project?: ProjectConfig;
  loading = true;
  notFound = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private seo: SeoService) {}

  ngOnInit(){
    const slug = this.route.snapshot.paramMap.get('slug');
    if(!slug){ this.notFound = true; this.loading=false; return; }
    this.http.get<ProjectConfig[]>('/assets/data/project.json').subscribe({
      next: projects => {
        const p = projects.find(pr => pr.slug === slug);
        if(!p){ this.notFound = true; } else { this.project = p; this.setSeo(p); }
        this.loading = false;
      },
      error: _ => { this.notFound = true; this.loading=false; }
    });
  }

  private setSeo(p: ProjectConfig){
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type':'ListItem','position':1,'name':'Inicio','item': '/' },
        { '@type':'ListItem','position':2,'name':'Proyectos','item': '/proyectos' },
        { '@type':'ListItem','position':3,'name': p.title }
      ]
    };
    const software = {
      '@context':'https://schema.org',
      '@type':'SoftwareSourceCode',
      'name': p.title,
      'codeRepository': p.repository,
      'programmingLanguage': p.tecnology?.map(t=>t.name).join(', '),
      'about': p.descripcion,
      'applicationCategory': 'DeveloperApplication',
      ...(p.metrics?.length ? {
        'additionalProperty': p.metrics.map(m => ({
          '@type': 'PropertyValue',
          'name': m.name,
          'value': m.current || m.target,
          ...(m.description ? { 'description': m.description } : {})
        }))
      } : {})
    };
    const article = {
      '@context':'https://schema.org',
      '@type':'Article',
      'headline': p.title,
      'about': p.descripcion,
      'articleBody': (p.explication||'').slice(0,4000)
    };
    this.seo.update({
      title: p.title + ' | Proyecto',
      description: p.descripcion?.slice(0,160),
      keywords: [p.title,'proyecto','portfolio','software','arquitectura'],
      jsonLd: [breadcrumb, software, article]
    });
  }
}
