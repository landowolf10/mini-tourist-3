import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedImageService {
  private selectedImageNameSubject = new BehaviorSubject<string>('');
  selectedImageName$ = this.selectedImageNameSubject.asObservable();

  setSelectedImageName(imageName: string) {
    this.selectedImageNameSubject.next(imageName);
  }
}
