import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFirstnameComponent } from './change-firstname.component';

describe('ChangeFirstnameComponent', () => {
  let component: ChangeFirstnameComponent;
  let fixture: ComponentFixture<ChangeFirstnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeFirstnameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFirstnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
