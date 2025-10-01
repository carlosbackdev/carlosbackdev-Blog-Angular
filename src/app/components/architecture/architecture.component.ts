import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { RevealDirective } from '../../directives/reveal.directive';

interface Decision {
  title: string;
  problem: string;
  decision: string;
  tradeoffs: string;
  impact: string;
}

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss'
})
export class ArchitectureComponent {
  decisions: Decision[] = [
    {
      title: 'Kafka + Flink para procesamiento streaming',
      problem: 'Necesidad de transformar eventos IoT y mantener baja latencia con escalabilidad horizontal.',
      decision: 'Uso de Kafka como log distribuido + Flink para ventanas y enriquecimiento.',
      tradeoffs: 'Mayor complejidad operativa que soluciones simples basadas en colas; requiere monitoreo de lag y estados.',
      impact: 'Pipeline estable, procesamiento casi en tiempo real y manejo robusto de picos.'
    },
    {
      title: 'Arquitectura hexagonal en microservicios',
      problem: 'Acoplamiento a frameworks dificultaba pruebas y evolución.',
      decision: 'Definir puertos y adaptadores, aislar dominio puro de infraestructura.',
      tradeoffs: 'Curva inicial de explicación al equipo y más clases estructurales.',
      impact: 'Evolución de capas sin romper dominio y pruebas más rápidas.'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'Decisiones de Arquitectura',
      description: 'Resumen de decisiones técnicas clave: streaming, arquitectura hexagonal, resiliencia y observabilidad.',
      keywords: ['arquitectura','kafka','flink','hexagonal','microservicios'],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': 'Decisiones de Arquitectura',
            'itemListElement': this.decisions.map((d,i)=>({
              '@type':'ListItem',
              'position': i+1,
              'name': d.title,
              'description': d.decision
            }))
        }
      ]
    });
  }
}
