import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherReportShareComponent } from './other-report-share.component';

describe('OtherReportShareComponent', () => {
  let component: OtherReportShareComponent;
  let fixture: ComponentFixture<OtherReportShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherReportShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherReportShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
