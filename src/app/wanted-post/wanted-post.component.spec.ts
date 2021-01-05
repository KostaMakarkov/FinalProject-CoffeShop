import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantedPostComponent } from './wanted-post.component';

describe('WantedPostComponent', () => {
  let component: WantedPostComponent;
  let fixture: ComponentFixture<WantedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WantedPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WantedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
