import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAndRatingComponent } from './movieAndRating.component';

describe('MovieAndRatingComponent', () => {
  let component: MovieAndRatingComponent;
  let fixture: ComponentFixture<MovieAndRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieAndRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAndRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
