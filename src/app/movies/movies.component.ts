import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../models/ui-models/movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  displayedColumns: string[] = ['title', 'director', 'releaseDate', 'genre', 'averageRating'];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    //Fetch Movies

    this.movieService.getMovies()
    .subscribe(
      (successResponse) => {
        this.movies = successResponse;
        this.dataSource = new MatTableDataSource<Movie>(this.movies);

        if(this.matPaginator)
        {
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort){

          this.dataSource.sort=this.matSort;
        }
      },
       (errorResponse) => {
         console.log(errorResponse);
       }
    );

  }
  filterMovies(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
