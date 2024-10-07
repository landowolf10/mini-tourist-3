import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CardStatus {
  cardid: number;
  status: string;
  city: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatusService  {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/card/register_status';

  constructor(private http: HttpClient) {}

  registerStatus(cardid: number, status: string, city: string, date: string): Observable<CardStatus[]> {
    const payload: CardStatus = {
      cardid,
      status,
      city,
      date
    };
    return this.http.post<CardStatus[]>(this.apiUrl, payload);
  }
}
