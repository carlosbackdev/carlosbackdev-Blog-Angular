import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TecnologyComponent } from "./components/tecnology/tecnology.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, InicioComponent, TecnologyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'carlosbackdev';
}
