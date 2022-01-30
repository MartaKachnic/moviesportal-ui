import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/api-models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {


  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  getGenreList(): Observable<Genre[]>{
   return this.httpClient.get<Genre[]>(this.baseApiUrl + '/genres');

  }
}
