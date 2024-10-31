import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private memberId: number | null = null;
  private memberRole: string | null = null;

  setMemberId(id: number) {
    this.memberId = id;
  }

  getMemberId(): number | null {
    return this.memberId;
  }

  setMemberRole(role: string) {
    this.memberRole = role;
  }

  getMemberRole(): string | null {
    return this.memberRole;
  }
}
