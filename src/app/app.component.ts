import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TecnologyComponent } from "./components/tecnology/tecnology.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { InformacionComponent } from "./components/informacion/informacion.component";
import { SocialMediaComponent } from "./components/social-media/social-media.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [NavComponent, InicioComponent, TecnologyComponent, ProjectsComponent, ExperienceComponent, InformacionComponent, SocialMediaComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'carlosbackdev';
  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }


  initIntersectionObserver(): void {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        (entry.target as HTMLElement).classList.toggle('visible', entry.isIntersecting);
      });
    }, { threshold: 0.15 });

    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const id = (entry.target as HTMLElement).id;
          if(id){
            window.dispatchEvent(new CustomEvent('sectionChange', { detail: id }));
          }
        }
      });
    }, { threshold: 0.5 });

    const sections = document.querySelectorAll('.fade-in-section, #inicio');
    sections.forEach(section => { 
      fadeObserver.observe(section); 
      activeObserver.observe(section); 
    });
  }
}
