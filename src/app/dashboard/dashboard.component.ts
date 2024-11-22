import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardStatusGeneralCount } from './card-status-general-count.model';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'; // Add this import to use moment.js for date formatting
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dashboardForm: FormGroup;
  visitedCardsCount: number = 0;
  downloadedCardsCount: number = 0;
  visitedCardsCountDate: number = 0;
  downloadedCardsCountDate: number = 0;
  visitedCardsCountRange: number = 0;
  downloadedCardsCountRange: number = 0;
  visitedCardsCountCity: number = 0;
  downloadedCardsCountCity: number = 0;
  selectedDate: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  rangeStartDate: string | null = null;
  rangeEndDate: string | null = null;
  currentDate: Date | null = null;
  citySubscription: Subscription | null = null;
  cards: { cardid: number; cardname: string }[] = [];
  selectedCardId: number | null = null;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private cardService: CardService
  ) {
    this.dashboardForm = this.fb.group({
      city: ['Zihuatanejo']
    });
  }

  ngOnInit() {
    this.countVisitedAndDownloadedGeneralCards();
    this.countVisitedAndDownloadedGeneralDateCards(this.setCurrentDate());
    this.countVisitedAndDownloadedGeneralCityCards(this.dashboardForm.get('city')?.value);
    this.getAllCards();

    // Subscribe to city changes
    this.citySubscription = this.dashboardForm.get('city')!.valueChanges.subscribe((selectedCity) => {
      console.log('Selected city:', selectedCity);
      this.countVisitedAndDownloadedGeneralCityCards(selectedCity);
    });
  }

  setCurrentDate(): string {
    this.currentDate = new Date();
    console.log('Current date: ', this.formatDate(this.currentDate));
    return this.formatDate(this.currentDate);
  }

  // Function to format the date to YYYY-MM-DD
  formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  // Function to handle date change
  onDateChange(event: any) {
    const selected = event.value;
    this.selectedDate = this.formatDate(selected);
    this.countVisitedAndDownloadedGeneralDateCards(this.selectedDate);
    console.log('Selected date: ', this.selectedDate);
  }

  onDateRangeChange() {
    if (this.rangeStartDate && this.rangeEndDate) {
      const startDate = this.formatDate(new Date(this.rangeStartDate));
      const endDate = this.formatDate(new Date(this.rangeEndDate));

      console.log('Date range selected from:', startDate, 'to:', endDate);
      this.countVisitedAndDownloadedByDateRange(startDate, endDate);
    } else {
      console.log('Please select both a start and end date.');
    }
  }

  countVisitedAndDownloadedGeneralCards() {
    const apiUrl = `http://127.0.0.1:8000/api/v1/cards/count/general`;
    this.http.get<CardStatusGeneralCount>(apiUrl).subscribe(
      data => {
        this.visitedCardsCount = data?.visited_count ?? 0;
        this.downloadedCardsCount = data?.downloaded_count ?? 0;
        console.log('Total visited general cards: ', data.visited_count);
        console.log('Total downloaded general cards: ', data.downloaded_count);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  countVisitedAndDownloadedGeneralDateCards(selectedDate: string) {
    const apiUrl = `http://127.0.0.1:8000/api/v1/cards/count/date?date=${selectedDate}`;
    this.http.get<CardStatusGeneralCount>(apiUrl).subscribe(
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

   // Fetch counts for a date range
   countVisitedAndDownloadedByDateRange(startDate: string, endDate: string) {
    const apiUrl = `http://127.0.0.1:8000/api/v1/cards/count?startDate=${startDate}&endDate=${endDate}`;

    console.log('Start date: ', startDate);
    console.log('End date: ', endDate);

    this.http.get<CardStatusGeneralCount>(apiUrl).subscribe(
      data => {
        console.log('Range data: ', data);
        this.visitedCardsCountRange = data?.visited_count ?? 0;
        this.downloadedCardsCountRange = data?.downloaded_count ?? 0;
      },
      error => console.error('Error fetching card counts by date range', error)
    );
  }


  //By City
  countVisitedAndDownloadedGeneralCityCards(selectedCity: string) {
    const apiUrl = `http://127.0.0.1:8000/api/v1/cards/count/city?city=${selectedCity}`;
    this.http.get<CardStatusGeneralCount>(apiUrl).subscribe(
      data => {
        console.log('Data: ', data);
        this.visitedCardsCountCity = data?.visited_count ?? 0;
        this.downloadedCardsCountCity = data?.downloaded_count ?? 0;
        console.log('Visited count: ', this.visitedCardsCountCity);
        console.log('Downloaded count: ', this.downloadedCardsCountCity);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getAllCards() {
    const apiUrl = `http://127.0.0.1:8000/api/v1/cards`;
    this.http.get<{ cardid: number; cardname: string }[]>(apiUrl).subscribe(
      data => {
        this.cards = data;
        this.cardService.setCards(data); // Update the service with the fetched cards
        console.log('Card data: ', data);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  
  onCardSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCardId = Number(selectElement.value);
    this.cardService.setSelectedCardId(selectedCardId);
    console.log('Selected Card ID:', selectedCardId);

    if (selectedCardId != null)
      this.router.navigate(['/member-admin-dashboard']);
    else
      this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout(); // Call the logout method in AuthService
    this.router.navigate(['/login']); // Redirect to login page
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.citySubscription) {
      this.citySubscription.unsubscribe();
    }
  }
}