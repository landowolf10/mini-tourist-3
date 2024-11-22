import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';
import { CardService } from '../services/card.service';
import { CardStatusCount } from './card-status-count.model';
import { HttpClient } from '@angular/common/http';
import { CardStatusDateCount } from './card-status-date-count.model';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-admin-dashboard.component.html',
  styleUrls: ['./member-admin-dashboard.component.css']
})
export class MemberAdminDashboardComponent implements OnInit {
  cardid: number | null = null;
  visitedCardsCount: number = 0;
  downloadedCardsCount: number = 0;
  visitedCardsCountDate: number = 0;
  downloadedCardsCountDate: number = 0;
  visitedCardsCountRange: number = 0;
  downloadedCardsCountRange: number = 0;
  selectedDate: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  rangeStartDate: string | null = null;
  rangeEndDate: string | null = null;
  currentDate: Date | null = null;
  cardName: string | null = null;
  cards: { cardid: number; cardname: string }[] = [];

  constructor(
    private http: HttpClient,
    public router: Router,
    private cardService: CardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cardService.selectedCardId$.subscribe(cardid => {
      this.cardid = cardid;
      console.log('Received Card ID:', this.cardid);

      this.cardService.cards$.subscribe(cards => {
        this.cards = cards;
        console.log('Received cards in DashboardComponent:', this.cards);
      });

      if (this.cardid == null)
        this.router.navigate(['/dashboard']);
      else {
        this.getVisitedAndDownloadedCardsById(this.cardid);
        this.getVisitedAndDownloadedCardsByIdAndDate(this.cardid, this.setCurrentDate())
      }
        
    });
  }

  getVisitedAndDownloadedCardsById(cardId: number) {
    const apiUrl = `http://127.0.0.1:8000/api/v1/card/count/card?cardId=${cardId}`;
    this.http.get<CardStatusCount>(apiUrl).subscribe(
      data => {
        console.log('Data: ', data);
        this.cardName = data?.card_name ?? '';
        this.visitedCardsCount = data?.visited_count ?? 0;
        this.downloadedCardsCount = data?.downloaded_count ?? 0;
        console.log('Card name: ', this.cardName);
        console.log('Visited count: ', this.visitedCardsCount);
        console.log('Downloaded count: ', this.downloadedCardsCount);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getVisitedAndDownloadedCardsByIdAndDate(cardId: number, selectedDate: string) {
    const apiUrl = `http://127.0.0.1:8000/api/v1/card?cardId=${cardId}&date=${selectedDate}`;
    this.http.get<CardStatusDateCount>(apiUrl).subscribe(
      data => {
        console.log('Data: ', data);
        this.visitedCardsCountDate = data?.visited_count ?? 0;
        this.downloadedCardsCountDate = data?.downloaded_count ?? 0;
        console.log('Visited count: ', this.visitedCardsCountDate);
        console.log('Downloaded count: ', this.downloadedCardsCountDate);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getVisitedAndDownloadedByIdAndDateRange(startDate: string, endDate: string, cardId: number) {
    const apiUrl = `http://127.0.0.1:8000/api/v1/card/count/range?startDate=${startDate}&endDate=${endDate}&cardId=${cardId}`;

    console.log('Start date: ', startDate);
    console.log('End date: ', endDate);

    this.http.get<CardStatusDateCount>(apiUrl).subscribe(
      data => {
        console.log('Range data: ', data);
        this.visitedCardsCountRange = data?.visited_count ?? 0;
        this.downloadedCardsCountRange = data?.downloaded_count ?? 0;
      },
      error => console.error('Error fetching card counts by date range', error)
    );
  }

  onCardSelect(event: Event): void {
    // Type guard to ensure event.target is a select element
    const selectElement = event.target as HTMLSelectElement | null;
    
    // Check if selectElement is valid before accessing its value
    if (selectElement && selectElement.value) {
      const selectedCardId = parseInt(selectElement.value, 10); // Convert to number
      this.cardService.setSelectedCardId(selectedCardId);
      console.log('Selected Card ID:', selectedCardId);
  
      if (!isNaN(selectedCardId)) { // Ensure the card ID is valid
        this.router.navigate(['/member-admin-dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      console.error('No card selected');
      this.router.navigate(['/dashboard']); // Navigate to the default dashboard if no card is selected
    }
  }
  
  setCurrentDate(): string {
    this.currentDate = new Date();
    console.log('Current date: ', this.formatDate(this.currentDate));
    return this.formatDate(this.currentDate);
  }

  formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  onDateChange(event: any) {
    const selected = event.value;
    this.selectedDate = this.formatDate(selected);
    this.getVisitedAndDownloadedCardsByIdAndDate(this.cardid!, this.selectedDate);
    console.log('Selected date: ', this.selectedDate);
  }

  onDateRangeChange() {
    if (this.rangeStartDate && this.rangeEndDate) {
      const startDate = this.formatDate(new Date(this.rangeStartDate));
      const endDate = this.formatDate(new Date(this.rangeEndDate));

      console.log('Date range selected from:', startDate, 'to:', endDate);
      this.getVisitedAndDownloadedByIdAndDateRange(startDate, endDate, this.cardid!);
    } else {
      console.log('Please select both a start and end date.');
    }
  }

  logout(): void {
    this.authService.logout(); // Call the logout method in AuthService
    this.router.navigate(['/login']); // Redirect to login page
  }
}
