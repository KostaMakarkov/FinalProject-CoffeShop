import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumShortcutComponent } from './forum-shortcut.component';

describe('ForumShortcutComponent', () => {
  let component: ForumShortcutComponent;
  let fixture: ComponentFixture<ForumShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumShortcutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
