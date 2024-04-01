import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialclinicformComponent } from './initialclinicform.component';

describe('InitialclinicformComponent', () => {
  let component: InitialclinicformComponent;
  let fixture: ComponentFixture<InitialclinicformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialclinicformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialclinicformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
