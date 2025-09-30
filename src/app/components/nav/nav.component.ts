import { Component, HostListener } from '@angular/core';
import { NavItemConfig } from '../../interfaces/config/nav-config.interfaces';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-nav',
  imports: [FormsModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  menuOpen: boolean = false;
  // Eliminado soporte de tema y búsqueda
  navItems: NavItemConfig[] = [{
    name: 'INICIO',
    path: 'inicio',
    icon:'bi bi-windows',
    active: true
  },
  {
    name: 'TECNOLOGIAS',
    path: 'tecnology',
    icon:'bi bi-code-square',
    active: false
  },
  {
    name: 'PROYECTOS',
    path: 'projects',
    icon:'bi bi-boxes',
    active: false
  },
  {
    name: 'EXPERIENCIA',
    path: 'experience',
    icon: 'bi bi-briefcase-fill',
    active: false
  },
  {
    name: 'CONÓCEME', 
    path: 'info', 
    icon: 'bi bi-file-person-fill',
    active: false,
  },
  {
    name: 'CONTACTO',
    path: 'social',
    icon:'bi bi-chat-right-heart-fill',
    active: false
  },]

  constructor(private router: Router){}
  ngOnInit(){
    window.addEventListener('sectionChange', (e: any) => {
      const id = e.detail;
      // id 'inicio' en layout corresponde a path 'inicio'
      if(id){
        this.setActiveNavItem(id);
      }
    });
  }
  selectedItem(nav: NavItemConfig){
    this.navItems.forEach((item: NavItemConfig) => {
      item.active = nav.name === item.name;
    });
    this.router.navigateByUrl(nav.path);
  }
  setActiveNavItem(path: string) {
    this.navItems.forEach(item => item.active = (item.path === path));
  }
  homePage() {
    this.setActiveNavItem('home');
    this.router.navigateByUrl('');
    }
    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const menu = document.querySelector('.nav-bar-container ul');
      const menuIcon = document.querySelector('.menu-icon');
  
      if (menu && menuIcon) {
        const isClickInsideMenu = menu.contains(target);
        const isClickOnMenuIcon = menuIcon.contains(target);
  
        if (!isClickInsideMenu && !isClickOnMenuIcon) {
          this.menuOpen = false;
        }
      }
    }
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
    // openSearch eliminado

}
