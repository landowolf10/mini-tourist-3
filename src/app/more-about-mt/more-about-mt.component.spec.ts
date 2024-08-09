import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreAboutMtComponent } from './more-about-mt.component';

describe('MoreAboutMtComponent', () => {
  let component: MoreAboutMtComponent;
  let fixture: ComponentFixture<MoreAboutMtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreAboutMtComponent]
    });
    fixture = TestBed.createComponent(MoreAboutMtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
