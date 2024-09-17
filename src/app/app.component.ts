import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-tourist-3';
  menuActive: boolean = false;
  submenuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
    console.log('Menu Active State:', this.menuActive);
  }

  hideMenu() {
    this.menuActive = false;
  }

  closeMenu() {
    this.menuActive = false;
  }

  toggleSubmenu(event: Event) {
    event.stopPropagation();  // Prevent event from propagating to other elements
    this.submenuActive = !this.submenuActive;
    console.log('Submenu Active State:', this.submenuActive);
  }

  preventDefault(event: Event) {
    event.preventDefault();  // Prevent the default link behavior
  }
}