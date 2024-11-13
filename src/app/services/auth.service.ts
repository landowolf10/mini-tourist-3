import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private memberId: number | null = null;

  setMemberId(id: number) {
    this.memberId = id;
  }

  getMemberId(): number | null {
    return this.memberId;
  }

  setMemberRole(role: string) {
    localStorage.setItem('memberRole', role); // Store the role in localStorage
  }

  getMemberRole(): string | null {
    return localStorage.getItem('memberRole');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(token: string, role: string): void {
    localStorage.setItem('authToken', token);
    this.setMemberRole(role); // Store role on login
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('memberRole'); // Clear role on logout
    sessionStorage.clear();
  }
}