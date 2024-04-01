import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtsPharmacyPaymentComponent } from './pts-pharmacy-payment.component';

describe('PtsPharmacyPaymentComponent', () => {
  let component: PtsPharmacyPaymentComponent;
  let fixture: ComponentFixture<PtsPharmacyPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtsPharmacyPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtsPharmacyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
