import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsDisplayComponent } from './user-settings-display.component';

describe('UserSettingsDisplayComponent', () => {
  let component: UserSettingsDisplayComponent;
  let fixture: ComponentFixture<UserSettingsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
