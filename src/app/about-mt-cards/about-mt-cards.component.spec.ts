import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMtCardsComponent } from './about-mt-cards.component';

describe('AboutMtCardsComponent', () => {
  let component: AboutMtCardsComponent;
  let fixture: ComponentFixture<AboutMtCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutMtCardsComponent]
    });
    fixture = TestBed.createComponent(AboutMtCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
