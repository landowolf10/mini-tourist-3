import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { DownloadButtonService } from '../services/download-button.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  errorMessage: string = '';

  constructor(
    private http: HttpClient, // Inject HttpClient
    private authService: AuthService,
    private downloadButtonService: DownloadButtonService,
    private router: Router
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
  login(loginForm: NgForm) {
    const apiUrl = `http://127.0.0.1:8000/api/v1/login`;
  
    const loginData = { email: this.email, password: this.password };
  
    if (loginForm.invalid) {
      loginForm.controls['email']?.markAsTouched();
      loginForm.controls['password']?.markAsTouched();
      return;
    }
  
    this.http.post<{ id: number, card_id: number, role: string, token: string }>(apiUrl, loginData).subscribe(
      (response) => {
        const { id, card_id, role, token } = response;
        this.authService.setMemberId(id);
        this.authService.login(token, role); // Store token and role
        this.authService.setCardId(card_id);
  
        // Redirect to the appropriate dashboard based on role
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          localStorage.setItem('card_id', card_id.toString());
          this.router.navigate(['/member-dashboard']);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Incorrect email or password. Please try again.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
        console.error('Login failed!', error);
      }
    );
  }     
}
