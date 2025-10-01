import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';

interface Practice { area: string; description: string; tools: string[]; maturity: 'estable' | 'en progreso' | 'experimento'; }

@Component({
  selector: 'app-observability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observability.component.html',
  styleUrl: './observability.component.scss'
})
export class ObservabilityComponent {
  practices: Practice[] = [
    { area: 'Métricas', description: 'Monitorización de throughput, lag, error rate y percentiles de latencia.', tools: ['Grafana','Prometheus','Azure Monitor'], maturity: 'estable' },
    { area: 'Logging estructurado', description: 'Correlación de eventos con IDs de trazas y niveles normalizados.', tools: ['Log aggregation','Tracing IDs'], maturity: 'estable' },
    { area: 'Trazas distribuidas', description: 'Propagación de contexto entre microservicios para detectar cuellos de botella.', tools: ['OpenTelemetry'], maturity: 'en progreso' },
    { area: 'Alertado', description: 'Umbrales dinámicos y reducción de ruido en incidencias repetitivas.', tools: ['Alert rules','Silencing'], maturity: 'en progreso' },
    { area: 'Experimentos rendimiento', description: 'Pruebas controladas de backpressure y benchmarking sintético.', tools: ['JMeter','Custom load scripts'], maturity: 'experimento' }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(){
    this.seo.update({
      title: 'Observabilidad & Calidad',
      description: 'Prácticas de métricas, logging, trazas y alertado aplicadas en entornos de streaming y microservicios.',
      keywords: ['observabilidad','métricas','trazas','logging','alertas'],
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': 'Prácticas de Observabilidad',
        'itemListElement': this.practices.map((p,i)=>({
          '@type':'ListItem',
          'position': i+1,
          'name': p.area,
          'description': p.description
        }))
      }
    });
  }
}
