import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddMovieRatingRequest } from '../models/api-models/add-movieRating-request.model';
import { MovieRating } from '../models/api-models/movieRating.model';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class MovieRatingService {
  private baseApiUrl = environment.baseApiUrl;
  private subscription: Subscription = new Subscription();
  userId: string = '';

  reqHeader: HttpHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    public datepipe: DatePipe,
    private readonly tokenStorage: TokenStorageService,
    public userService: UserService
  ) {
    const token = this.tokenStorage.getToken();

    if (token != null) {
      this.reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + JSON.parse(token),
      });
    }
  }
  getMovieRatings(movieId: string): Observable<MovieRating[]> {
    return this.httpClient.get<MovieRating[]>(
      this.baseApiUrl + '/api/movies/' + movieId + '/rating'
    );
  }

  //nie działa
  getMovieRating(movieRatingId: string): Observable<MovieRating> {
    return this.httpClient.get<MovieRating>(
      this.baseApiUrl + '/movies/' + movieRatingId
    );
  }

  addMovieRating(
    MovieRatingRequest: MovieRating,
    movieId: string
  ): Observable<MovieRating> {
    const addMovieRatingRequest: AddMovieRatingRequest = {
      title: MovieRatingRequest.title,
      rating: MovieRatingRequest.rating,
      comment: MovieRatingRequest.comment,
      publishDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      movieId: movieId,
      userId: this.userService.getCurrentUser().id,
    };
    return this.httpClient.post<MovieRating>(
      this.baseApiUrl + '/movies/' + movieId + '/comment',
      addMovieRatingRequest,
      { headers: this.reqHeader }
    );
  }

  destroy(movieRatingId: string): Observable<MovieRating> {
    return this.httpClient.delete<MovieRating>(
      this.baseApiUrl + '/movies/' + movieRatingId
    );
  }
}
