import { AfterViewInit, Component } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  constructor(
    private downloadButtonService: DownloadButtonService,
  ) {}

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
    this.downloadButtonService.setButtonVisibility(false);
  }

  email: string = '';
  password: string = '';

  login(email: string, password: string) {
    console.log('Email: ', email, ', password: ', password)
  }
}
