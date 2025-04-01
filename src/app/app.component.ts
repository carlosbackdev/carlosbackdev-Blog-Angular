import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TecnologyComponent } from "./components/tecnology/tecnology.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { InformacionComponent } from "./components/informacion/informacion.component";
import { SocialMediaComponent } from "./components/social-media/social-media.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, InicioComponent, TecnologyComponent, ProjectsComponent, InformacionComponent, SocialMediaComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'carlosbackdev';
  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }

  initIntersectionObserver(): void {
    const observerOptions = {
      root: null, // significa que se observa el viewport
      rootMargin: '0px',
      threshold: 0.1 // 10% de visibilidad
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Cuando la sección entra en la vista
          entry.target.classList.add('visible');
        } else {
          // Cuando la sección sale de la vista
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    // Observamos todas las secciones con la clase fade-in-section
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => observer.observe(section));
  }
}
