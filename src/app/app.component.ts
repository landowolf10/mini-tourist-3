import { Component } from '@angular/core';
import { CategoryServiceService } from './services/category-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  title = 'mini-tourist-3';
  menuActive: boolean = false;
  categoriasModalActive: boolean = false;
  modalVisible: boolean = false;
  selectedItem: string = '';
  showCategoriasButton: boolean = false;

  constructor(private sharedService: CategoryServiceService, private router: Router) {}

  ngAfterViewInit() {
    // Select elements to animate
    const elements = document.querySelectorAll('.transition');
    
    // Add a slight delay to each element
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove('hidden');
        element.classList.add('visible');
      }, index * 50); // Adjust delay as needed
    });
  }

  ngOnInit() {
    // Subscribe to the selectedItem from the service
    this.sharedService.selectedItem$.subscribe((item: string) => {
      this.selectedItem = item;
      console.log('Selected item in AppComponent:', this.selectedItem);
    });

    // Check the current route to toggle button visibility
    this.router.events.subscribe(() => {
      this.showCategoriasButton = this.router.url === '/home';
    });
  }

  menuItemClicked(event: Event, item: string) {
    event.preventDefault();
    // Use the service to update the selected item
    this.sharedService.menuItemClicked(item);
    this.categoriasModalActive = false;
  }

  toggleCategorias() {
    if (this.categoriasModalActive) {
      this.slideUpModal();
    } else {
      this.modalVisible = true; // Ensure modal is visible
      setTimeout(() => {
        this.categoriasModalActive = true; // Trigger slide down
      }, 50); // Slight delay for transition
    }
  }

  private slideUpModal() {
    this.categoriasModalActive = false; // Slide up
    setTimeout(() => {
      this.modalVisible = false; // After transition, hide modal
    }, 500); // Match CSS transition timing
  }

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
}