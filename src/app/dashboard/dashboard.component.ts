import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardStatusGeneralCount } from './card-status-general-count.model';
import * as moment from 'moment'; // Add this import to use moment.js for date formatting

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  visitedCardsCount: number = 0;
  downloadedCardsCount: number = 0;
  visitedCardsCountDate: number = 0;
  downloadedCardsCountDate: number = 0;
  selectedDate: string | null = null; // Variable to hold the selected date
  currentDate: Date | null = null;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.countVisitedAndDownloadedGeneralCards();
    this.countVisitedAndDownloadedGeneralDateCards(this.setCurrentDate());
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

  countVisitedAndDownloadedGeneralCards() {
    const apiUrl = `http://localhost:9090/api/card/cards/count`;
    this.http.get<CardStatusGeneralCount>(apiUrl).subscribe(
      data => {
        this.visitedCardsCount = data?.visitedCount ?? 0;
        this.downloadedCardsCount = data?.downloadedCount ?? 0;
        //console.log('Total visited cards: ', data.visitedCount);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  countVisitedAndDownloadedGeneralDateCards(selectedDate: string) {
    const apiUrl = `http://localhost:9090/api/card/cards?date=${selectedDate}`;
    this.http.get<CardStatusGeneralCount>(apiUrl).subscribe(
      data => {
        this.visitedCardsCountDate = data?.visitedCount ?? 0;
        this.downloadedCardsCountDate = data?.downloadedCount ?? 0;
        console.log('Visited count: ', this.visitedCardsCountDate);
        console.log('Downloaded count: ', this.downloadedCardsCountDate);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}