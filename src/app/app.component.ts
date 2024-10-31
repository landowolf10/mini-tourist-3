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
  isMenuActive: boolean = false;
  categoriasModalActive: boolean = false;
  isModalVisible: boolean = false;
  selectedItem: string = 'premium';
  showCategoriasButton: boolean = false;
  showFeatureContainer: boolean = false;
  secondSliderImages: any[] = [
    { url: '../assets/playa.jpg' },
    { url: '../assets/cancha.jpg' },
    { url: '../assets/info-carousel-1.jpg' },
    { url: '../assets/delfiniti.jpg' },
    // Add more image URLs
  ];
  currentSlideIndex: number = 0;
  autoSlideInterval: any;

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
      this.showFeatureContainer = this.router.url === '/home';
    });

    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  menuItemClicked(event: Event, item: string) {
    event.preventDefault();
    // Use the service to update the selected item
    this.sharedService.menuItemClicked(item);
    this.categoriasModalActive = false;
    this.isModalVisible = false;
  }

  toggleCategorias() {
    if (this.categoriasModalActive) {
      this.slideUpModal();
    } else {
      this.isModalVisible = true; // Ensure modal is visible
      setTimeout(() => {
        this.categoriasModalActive = true; // Trigger slide down
      }, 20); // Slight delay for transition
    }
  }

  private slideUpModal() {
    this.categoriasModalActive = false; // Slide up
    setTimeout(() => {
      this.isModalVisible = false; // After transition, hide modal
    }, 500); // Match CSS transition timing
  }

  prevSlide() {
    // Decrease the index, wrap around if at the first slide
    this.currentSlideIndex = (this.currentSlideIndex > 0) ? this.currentSlideIndex - 1 : this.secondSliderImages.length - 1;
    this.updateSliderPosition();
  }

  nextSlide() {
    // Increase the index, wrap around if at the last slide
    this.currentSlideIndex = (this.currentSlideIndex < this.secondSliderImages.length - 1) ? this.currentSlideIndex + 1 : 0;
    this.updateSliderPosition();
  }

  updateSliderPosition() {
    // Access the slider DOM element and apply the transform
    const slider = document.querySelector('.slider');
    if (slider) {
      const offset = this.currentSlideIndex * -100; // Assuming each slide takes up 100% of the width
      slider.setAttribute('style', `transform: translateX(${offset}%);`);
    }
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    console.log('Menu Active State:', this.isMenuActive);
  }

  hideMenu() {
    this.isMenuActive = false;
  }

  closeMenu() {
    this.isMenuActive = false;
  }
}