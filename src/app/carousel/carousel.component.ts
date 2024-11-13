import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { SelectedImageService } from '../services/selected-image.service';
import { DownloadButtonService } from '../services/download-button.service';
import { StatusService } from '../services/card-status.service';
import { CategoryServiceService } from '../services/category-service.service';

interface Card {
  cardName: string;
  category: string;
  city: string;
  cardid: number;
  creationDate: string;
  image: string;
  back_image: string,
  premium: string;
  updateDate: string | null;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  /*cards: Card[] = [
    {
      cardName: 'Fishers',
      category: 'Premium',
      city: 'City 1',
      cardid: 1,
      creationDate: '2024-01-01',
      image: 'http://res.cloudinary.com/dbwgqd2ap/image/upload/v1724134262/cards/Premium/hdqvm7xp1alwewtuulps.jpg',
      premium: 'Yes',
      updateDate: null,
    },
    {
      cardName: 'La Isla Ixtapa',
      category: 'Standard',
      city: 'City 2',
      cardid: 2,
      creationDate: '2024-01-01',
      image: 'http://res.cloudinary.com/dbwgqd2ap/image/upload/v1724170432/cards/Premium/hzjyjcbv63xxjtigoq6y.jpg',
      premium: 'No',
      updateDate: null,
    },
    {
      cardName: 'La Ropa',
      category: 'Standard',
      city: 'City 2',
      cardid: 3,
      creationDate: '2024-01-01',
      image: 'http://res.cloudinary.com/dbwgqd2ap/image/upload/v1724170470/cards/Premium/uhnat6t2exbr2bnugopx.jpg',
      premium: 'No',
      updateDate: null,
    },
    {
      cardName: 'Las Gatas',
      category: 'Standard',
      city: 'City 2',
      cardid: 4,
      creationDate: '2024-01-01',
      image: 'http://res.cloudinary.com/dbwgqd2ap/image/upload/v1724170494/cards/Premium/d7dkoohxvvzxv16gzmdy.jpg',
      premium: 'No',
      updateDate: null,
    },
    {
      cardName: 'Buffalo Xtreme',
      category: 'Standard',
      city: 'City 2',
      cardid: 5,
      creationDate: '2024-01-01',
      image: 'http://res.cloudinary.com/dbwgqd2ap/image/upload/v1728082446/cards/Premium/et462dftkf29e3byvdm4.jpg',
      premium: 'No',
      updateDate: null,
    }
  ];*/
  cards: Card[] = [];
  isExpanded = false;
  selectedItem: string = '';
  hasImages: boolean = false; //change to false when using api call.
  currentIndex: number = 0;
  intervalId: any;
  startX: number = 0;
  startY: number = 0;
  categoriasModalActive: boolean = false;
  isModalVisible: boolean = false;
  menuActive: boolean = false;

  @ViewChild('carouselContainer', { static: true }) carouselContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private selectedImageService: SelectedImageService,
    private downloadButtonService: DownloadButtonService,
    private statusService: StatusService,
    private sharedService: CategoryServiceService
  ) {}

  ngOnInit() {
    // Subscribing to selected item changes
    this.sharedService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
      console.log('Selected item in Carousel:', this.selectedItem);
      this.fetchImageNames(); //Uncomment this when calling from API
    });
    this.addSwipeListeners();
    this.downloadButtonService.setButtonVisibility(false);
  }
  
  fetchImageNames() {
    const apiUrl = `http://127.0.0.1:8000/api/v1/cards/category?category=${this.selectedItem}`;
    this.http.get<Card[]>(apiUrl).subscribe(data => {
      this.cards = data;
      console.log('Cards: ', this.cards);

      if (this.cards.length > 0) { 
        this.hasImages = true;
        //this.initializeCarousel();
      }
    });
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000); // Change image every 5 seconds
  }

  // Navigate to the next image
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }
  
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Add swipe gesture listeners
addSwipeListeners() {
  const carousel = this.carouselContainer.nativeElement;
  
  // Touch events for mobile
  carousel.addEventListener('touchstart', (event: TouchEvent) => {
    const touch = event.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  });

  carousel.addEventListener('touchmove', (event: TouchEvent) => {
    if (!this.startX || !this.startY) {
      return;
    }

    const touch = event.touches[0];
    const diffX = this.startX - touch.clientX;
    const diffY = this.startY - touch.clientY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        this.nextImage(); // Swipe left
      } else {
        this.prevImage(); // Swipe right
      }
    }

    // Reset values
    this.startX = 0;
    this.startY = 0;
  });

  // Mouse events for desktop
  carousel.addEventListener('mousedown', (event: MouseEvent) => {
    this.startX = event.clientX;
    this.startY = event.clientY;

    // Add mousemove event to track dragging
    const onMouseMove = (moveEvent: MouseEvent) => {
      const diffX = this.startX - moveEvent.clientX;
      const diffY = this.startY - moveEvent.clientY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          this.nextImage(); // Drag left
        } else {
          this.prevImage(); // Drag right
        }
        // Remove mousemove event after swipe
        carousel.removeEventListener('mousemove', onMouseMove);
      }
    };

    // Add the mousemove and mouseup events
    carousel.addEventListener('mousemove', onMouseMove);
    
    // Clean up events on mouseup
    carousel.addEventListener('mouseup', () => {
      carousel.removeEventListener('mousemove', onMouseMove);
      this.startX = 0;
      this.startY = 0;
    }, { once: true });

    // Clean up if the mouse leaves the carousel area
    carousel.addEventListener('mouseleave', () => {
      carousel.removeEventListener('mousemove', onMouseMove);
      this.startX = 0;
      this.startY = 0;
    }, { once: true });
  });
}

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  toggleCategorias() {
    console.log('Toggle categorias called');
    
    if (this.categoriasModalActive) {
      console.log('Is modal visible?', this.isModalVisible);
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

  menuItemClicked(event: Event, item: string, isFromModal: boolean) {
    console.log('menuItemClicked function called');
    event.preventDefault();
    event.stopPropagation();
    this.selectedItem = item; // Set the selected item
    console.log('Selected item:', item);
    
    this.fetchImageNames();

    if(isFromModal)
      this.toggleCategorias();
  }
  

  openImageModal(event: Event, card: Card): void {
    event.preventDefault();
    this.selectedImageService.setSelectedImageName(card.image);
    this.downloadButtonService.setButtonVisibility(true);

    console.log('Selected image name: ', card);

    const dialogRef = this.dialog.open(ImageModalComponent, {
      //This is used in the image-modal.component.html file
      data: { 
        card: card,
        frontImageSrc: card.image,
        backImageSrc: card.back_image
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.downloadButtonService.setButtonVisibility(false);
    });

    //Call status API (Visited)
    const status = 'Visited';
    const date = new Date().toISOString().split('T')[0];

    console.log('Card Id: ', card.cardid);

    this.statusService.registerStatus(card.cardid, status, card.city, date).subscribe(
      data => {
        console.log('Status registered: ', data);
      },
      error => {
        console.error('Error registering status: ', error);
      }
    );
  }
}
