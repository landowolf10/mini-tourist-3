import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent {
  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout(); // Call the logout method in AuthService
    this.router.navigate(['/login']); // Redirect to login page
  }
}
