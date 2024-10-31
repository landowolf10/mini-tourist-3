import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { DownloadButtonService } from '../services/download-button.service';
import { AuthService } from '../services/auth.service';

interface Members {
  id: number;
  email: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  memberId: number = 0;
  memberRole: string = '';

  email: string = '';   // Bind email input
  password: string = ''; // Bind password input

  constructor(
    private http: HttpClient, // Inject HttpClient
    private authService: AuthService,
    private downloadButtonService: DownloadButtonService,
  ) {}

  ngAfterViewInit() {
    const elements = document.querySelectorAll('.transition');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove('hidden');
        element.classList.add('visible');
      }, index * 50);
    });
  }

  ngOnInit() {
    this.downloadButtonService.setButtonVisibility(false);
  }

  // Updated login function
  login() {
    const apiUrl = `http://127.0.0.1:8000/api/v1/login`;

    // Construct the payload with email and password
    const loginData = { email: this.email, password: this.password };

    // Send POST request to the API with the email and password
    this.http.post<{ id: number, role: string }>(apiUrl, loginData).subscribe(
      (response) => {
        // Get the id and role from the response
        this.memberId = response.id;
        this.memberRole = response.role;
        console.log('User ID: ', this.memberId);
        console.log('User Role: ', this.memberRole);
      },
      (error) => {
        console.error('Login failed!', error);
      }
    );
  }
}
