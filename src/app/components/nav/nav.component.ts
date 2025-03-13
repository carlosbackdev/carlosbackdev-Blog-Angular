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
  navItems: NavItemConfig[] = [{
    name: 'INICIO',
    path: '',
    icon:'bi bi-film',
    active: true
  },
  {
    name: 'TECNOLOGIAS',
    path: 'discover',
    icon:'bi bi-bar-chart-fill',
    active: false
  },
  {
    name: 'PROYECTOS',
    path: 'list',
    icon:'bi bi-bookmark-plus-fill',
    active: false
  },
  {
    name: 'CONÓCEME', 
    path: 'profile', 
    icon: 'bi bi-person-fill',
    active: false,
  },
  {
    name: 'CONTACTO',
    path: 'contact',
    icon:'bi bi-send-fill',
    active: false
  },]

  constructor(private router: Router){}
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

}
