import { Routes } from '@angular/router';
import { ArchitectureComponent } from './components/architecture/architecture.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { ObservabilityComponent } from './components/observability/observability.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    { path: 'architecture', loadComponent: () => import('./components/architecture/architecture.component').then(m => m.ArchitectureComponent) },
    { path: 'roadmap', loadComponent: () => import('./components/roadmap/roadmap.component').then(m => m.RoadmapComponent) },
    { path: 'observability', loadComponent: () => import('./components/observability/observability.component').then(m => m.ObservabilityComponent) },
    { path: 'proyectos/:slug', loadComponent: () => import('./components/project-page/project-page.component').then(m => m.ProjectPageComponent) }
];
