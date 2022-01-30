import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddMovieRequest } from '../models/api-models/add-movie-request.model';
import { Movie } from '../models/api-models/movie.model';
import { UpdateMovieRequest } from '../models/api-models/update-movie-request.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.baseApiUrl + '/movies');
  }
  getMovie(movieId: string): Observable<Movie>{
    return this.httpClient.get<Movie>(this.baseApiUrl + '/movies/' + movieId);
  }

  updateMovie(movieId: string, MovieRequest: Movie): Observable<Movie> {
    const updateMovieRequest: UpdateMovieRequest = {
      title: MovieRequest.title,
      director: MovieRequest.director,
      poster: MovieRequest.poster,
      description: MovieRequest.description,
      releaseDate: MovieRequest.releaseDate,
      genreId: MovieRequest.genreId,
    }
    return this.httpClient.put<Movie>(this.baseApiUrl + '/movies/' + movieId, updateMovieRequest);

  }
  deleteMovie(movieId: string): Observable<Movie> {
    return this.httpClient.delete<Movie>(this.baseApiUrl + '/movies/' + movieId);
  }
  addMovie(MovieRequest: Movie): Observable<Movie> {
    const addMovieRequest: AddMovieRequest = {
      title: MovieRequest.title,
      director: MovieRequest.director,
      poster: MovieRequest.poster,
      description: MovieRequest.description,
      releaseDate: MovieRequest.releaseDate,
      genreId: MovieRequest.genreId,
  };
  return this.httpClient.post<Movie>(this.baseApiUrl + '/movies/add', addMovieRequest);
}
}
