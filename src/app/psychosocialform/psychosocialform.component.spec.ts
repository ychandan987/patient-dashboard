import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychosocialformComponent } from './psychosocialform.component';

describe('PsychosocialformComponent', () => {
  let component: PsychosocialformComponent;
  let fixture: ComponentFixture<PsychosocialformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychosocialformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychosocialformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
