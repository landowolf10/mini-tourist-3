import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private selectedCardIdSource = new BehaviorSubject<number | null>(null);
  selectedCardId$ = this.selectedCardIdSource.asObservable();

  private cardsSource = new BehaviorSubject<{ cardid: number; cardname: string }[]>([]);
  cards$ = this.cardsSource.asObservable();

  setSelectedCardId(cardid: number) {
    this.selectedCardIdSource.next(cardid);
  }

  setCards(cards: { cardid: number; cardname: string }[]) {
    this.cardsSource.next(cards);
  }
}
