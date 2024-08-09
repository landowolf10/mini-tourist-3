import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-tourist-3';
  menuActive: boolean = false;

  toggleMenu() {
    const nav = document.querySelector('.contenedor-menu-header nav');
    const hamburger = document.querySelector('.hamburger');
    nav?.classList.toggle('active');
    hamburger?.classList.toggle('active');
  }

  hideMenu() {
    const nav = document.querySelector('.contenedor-menu-header nav');
    const hamburger = document.querySelector('.hamburger');
    nav?.classList.remove('active');
    hamburger?.classList.remove('active');
  }
}
