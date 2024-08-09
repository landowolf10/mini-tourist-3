import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereIsMtComponent } from './where-is-mt.component';

describe('WhereIsMtComponent', () => {
  let component: WhereIsMtComponent;
  let fixture: ComponentFixture<WhereIsMtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhereIsMtComponent]
    });
    fixture = TestBed.createComponent(WhereIsMtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
