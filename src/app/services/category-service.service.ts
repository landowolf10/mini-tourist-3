import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private selectedItemSource = new BehaviorSubject<string>('premium'); // Default value
  selectedItem$ = this.selectedItemSource.asObservable();

  constructor() {}

  // Method to set selected item
  setSelectedItem(item: string) {
    this.selectedItemSource.next(item);
  }

  // Method to simulate menu item click if needed
  menuItemClicked(item: string) {
    this.setSelectedItem(item);
  }
}
