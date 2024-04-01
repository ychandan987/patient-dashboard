import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmBookingViewComponent } from './pharm-booking-view.component';

describe('PharmBookingViewComponent', () => {
  let component: PharmBookingViewComponent;
  let fixture: ComponentFixture<PharmBookingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmBookingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmBookingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
