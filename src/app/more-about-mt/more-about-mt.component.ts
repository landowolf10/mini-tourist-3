import { AfterViewInit, Component } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-more-about-mt',
  templateUrl: './more-about-mt.component.html',
  styleUrls: ['./more-about-mt.component.css']
})
export class MoreAboutMtComponent implements AfterViewInit {
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
