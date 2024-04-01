import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospLabBookingViewComponent } from './hosp-lab-booking-view.component';

describe('HospLabBookingViewComponent', () => {
  let component: HospLabBookingViewComponent;
  let fixture: ComponentFixture<HospLabBookingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospLabBookingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospLabBookingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
