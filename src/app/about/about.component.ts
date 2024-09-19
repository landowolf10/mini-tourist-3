import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Select elements to animate
    const elements = document.querySelectorAll('.transition');
    
    // Add a slight delay to each element
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove('hidden');
        element.classList.add('visible');
      }, index * 150); // Adjust delay as needed
    });
  }
}