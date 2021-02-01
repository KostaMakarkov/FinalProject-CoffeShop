import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsAndCommentsComponent } from './posts-and-comments.component';

describe('PostsAndCommentsComponent', () => {
  let component: PostsAndCommentsComponent;
  let fixture: ComponentFixture<PostsAndCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsAndCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsAndCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
