import { AfterViewInit, Component, HostListener } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-where-is-mt',
  templateUrl: './where-is-mt.component.html',
  styleUrls: ['./where-is-mt.component.css']
})
export class WhereIsMtComponent implements AfterViewInit {
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
}