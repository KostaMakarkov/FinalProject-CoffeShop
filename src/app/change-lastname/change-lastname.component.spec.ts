import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLastnameComponent } from './change-lastname.component';

describe('ChangeLastnameComponent', () => {
  let component: ChangeLastnameComponent;
  let fixture: ComponentFixture<ChangeLastnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLastnameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLastnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
