import { TestBed } from '@angular/core/testing';

import { MovieRatingService } from './movieRating.service';

describe('MovieRatingService', () => {
  let service: MovieRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
