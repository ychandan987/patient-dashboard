import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtsLabPaymentComponent } from './pts-lab-payment.component';

describe('PtsLabPaymentComponent', () => {
  let component: PtsLabPaymentComponent;
  let fixture: ComponentFixture<PtsLabPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtsLabPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtsLabPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
