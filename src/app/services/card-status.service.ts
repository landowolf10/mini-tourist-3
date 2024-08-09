import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CardStatus {
  clientId: number;
  status: string;
  city: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatusService  {
  private apiUrl = 'http://localhost:9090/api/card/cards';

  constructor(private http: HttpClient) {}

  registerStatus(clientId: number, status: string, city: string, date: string): Observable<CardStatus[]> {
    const payload: CardStatus = {
      clientId,
      status,
      city,
      date
    };
    return this.http.post<CardStatus[]>(this.apiUrl, payload);
  }
}
