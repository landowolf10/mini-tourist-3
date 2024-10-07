import { Component } from '@angular/core';

interface Card {
  cardName: string;
  category: string;
  city: string;
  clientId: number;
  creationDate: string;
  image: string;
  premium: string;
  updateDate: string | null;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  cards: Card[] = [
    {
      cardName: 'Card 1',
      category: 'Premium',
      city: 'City 1',
      clientId: 1,
      creationDate: '2024-01-01',
      image: 'http://res.cloudinary.com/dbwgqd2ap/image/upload/v1724134262/cards/Premium/hdqvm7xp1alwewtuulps.jpg',
      premium: 'Yes',
      updateDate: null,
    },
    {
      cardName: 'Card 2',
      category: 'Standard',
      city: 'City 2',
      clientId: 2,
      creationDate: '2024-01-01',
      image: 'http://res.cloudinary.com/dbwgqd2ap/image/upload/v1724170432/cards/Premium/hzjyjcbv63xxjtigoq6y.jpg',
      premium: 'No',
      updateDate: null,
    },
    {
      cardName: 'Card 2',
      category: 'Standard',
      city: 'City 2',
      clientId: 3,
      creationDate: '2024-01-01',
      image: 'http://res.cloudinary.com/dbwgqd2ap/image/upload/v1724170470/cards/Premium/uhnat6t2exbr2bnugopx.jpg',
      premium: 'No',
      updateDate: null,
    },
  ];
  
  currentIndex: number = 0;

  // Navigate to the next image
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  // Navigate to the previous image
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }
}
