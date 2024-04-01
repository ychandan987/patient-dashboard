import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentsPaymentComponent } from './doctor-appointments-payment.component';

describe('DoctorAppointmentsPaymentComponent', () => {
  let component: DoctorAppointmentsPaymentComponent;
  let fixture: ComponentFixture<DoctorAppointmentsPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAppointmentsPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppointmentsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
