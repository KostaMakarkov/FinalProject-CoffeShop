import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDobComponent } from './change-dob.component';

describe('ChangeDobComponent', () => {
  let component: ChangeDobComponent;
  let fixture: ComponentFixture<ChangeDobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
