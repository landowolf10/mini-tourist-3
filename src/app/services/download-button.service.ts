import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadButtonService {
  private isButtonVisibleSubject = new BehaviorSubject<boolean>(true);
  isButtonVisible$ = this.isButtonVisibleSubject.asObservable();

  setButtonVisibility(isVisible: boolean) {
    this.isButtonVisibleSubject.next(isVisible);
  }
}
