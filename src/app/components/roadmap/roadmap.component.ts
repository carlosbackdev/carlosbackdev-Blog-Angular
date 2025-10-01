import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { RevealDirective } from '../../directives/reveal.directive';

interface RoadmapItem { quarter: string; focus: string; status: 'done' | 'in-progress' | 'next'; detail: string; }

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss'
})
export class RoadmapComponent {
  roadmap: RoadmapItem[] = [
    { quarter: '2024 Q4', focus: 'Pipelines streaming IoT', status: 'done', detail: 'Integración Kafka + Flink y persistencia analítica.' },
    { quarter: '2025 Q1', focus: 'Optimización latencia APIs', status: 'done', detail: 'Refactor en capas y caching selectivo.' },
    { quarter: '2025 Q2', focus: 'Observabilidad avanzada', status: 'in-progress', detail: 'Trazas distribuidas + métricas unificadas.' },
    { quarter: '2025 Q3', focus: 'Schema evolution & contracts', status: 'next', detail: 'Avro / Protobuf + versionado formal.' },
    { quarter: '2025 Q4', focus: 'Feature store streaming', status: 'next', detail: 'Materialización incremental de atributos.' }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'Roadmap Técnico',
      description: 'Evolución planificada: streaming, observabilidad, contracts y feature store.',
      keywords: ['roadmap','streaming','observabilidad','contratos','evolución'],
      type: 'website',
      jsonLd: [
        {
          '@context':'https://schema.org',
          '@type':'ItemList',
          'name':'Roadmap Técnico',
          'itemListElement': this.roadmap.map((r,i)=>({
            '@type':'ListItem',
            'position': i+1,
            'name': r.focus,
            'description': r.detail
          }))
        }
      ]
    });

    setTimeout(()=>{
      this.initProgress();
    },0);
  }

  private initProgress(){
    const bar = document.getElementById('roadmapBar');
    if(!bar) return;
    const list = document.querySelector('.roadmap-list');
    if(!list) return;
    const onScroll = () => {
      const rect = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh * 0.4; // start filling after small offset
      const scrolled = Math.min(Math.max((vh*0.6 - rect.top), 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = pct.toFixed(2)+'%';
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }
}
