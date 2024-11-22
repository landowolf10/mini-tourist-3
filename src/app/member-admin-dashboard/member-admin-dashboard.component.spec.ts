import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAdminDashboardComponent } from './member-admin-dashboard.component';

describe('MemberAdminDashboardComponent', () => {
  let component: MemberAdminDashboardComponent;
  let fixture: ComponentFixture<MemberAdminDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberAdminDashboardComponent]
    });
    fixture = TestBed.createComponent(MemberAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
