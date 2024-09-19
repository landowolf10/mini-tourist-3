import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  // Using BehaviorSubject to hold the selected item state
  private selectedItemSource = new BehaviorSubject<string>('premium');
  selectedItem$ = this.selectedItemSource.asObservable();

  // Method to update the selected item
  menuItemClicked(item: string) {
    this.selectedItemSource.next(item);
  }

  getSelectedItem() {
    return this.selectedItemSource.getValue();
  }
}
