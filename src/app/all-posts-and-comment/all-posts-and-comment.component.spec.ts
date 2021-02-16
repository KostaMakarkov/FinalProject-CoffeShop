import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostsAndCommentComponent } from './all-posts-and-comment.component';

describe('AllPostsAndCommentComponent', () => {
  let component: AllPostsAndCommentComponent;
  let fixture: ComponentFixture<AllPostsAndCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPostsAndCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPostsAndCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
