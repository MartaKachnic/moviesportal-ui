import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from 'src/app/models/ui-models/genre.model';
import { Movie } from 'src/app/models/ui-models/movie.model';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-vi',
  templateUrl: './vi.component.html',
  styleUrls: ['./vi.component.css'],
})
export class ViComponent implements OnInit {
  movieId: string | null | undefined;
  movie: Movie = {
    id: '',
    title: '',
    director: '',
    description: '',
    releaseDate: '',
    averageRating: '',
    genreId: '',
    poster: '',
    genre: {
      id: '',
      name: '',
    },
    movieRatings: [],
  };
  isNewMovie = true;
  header = '';
  genreList: Genre[] = [];

  @ViewChild('movieDetailsForm') movieDetailsForm?: NgForm;

  constructor(
    private readonly movieService: MovieService,
    private readonly route: ActivatedRoute,
    private readonly genreService: GenreService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('id');

      if (this.movieId) {
        // if the route contains the 'add'

        if (this.movieId.toLocaleLowerCase() == 'Add'.toLocaleLowerCase()) {
          //new Movie functionality
          this.isNewMovie = true;
          this.header = 'Dodaj nowy film';
        } else {
          //existing Movie functionality
          this.isNewMovie = false;
          this.header = 'Edytuj dane filmu';
          this.movieService
            .getMovie(this.movieId)
            .subscribe((successResponse) => {
              this.movie = successResponse;
            });
        }
        this.genreService.getGenreList().subscribe((successResponse) => {
          this.genreList = successResponse;
        });
      }
    });
  }
  onUpdate(): void {
    if (this.movieDetailsForm?.form.valid) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(
        (successResponse) => {
          console.log(successResponse);
          //show a notification
          this.snackbar.open('Zaktualizowano dane', undefined, {
            duration: 2000,
          });
          this.router.navigateByUrl('movies/' + this.movie.id);
        },
        (errorResponse) => {
          this.snackbar.open('Wprowadzono niepoprawne dane', undefined, {
            duration: 2000,
          });
          console.log(errorResponse);
        }
      );
    }
  }
  onAdd(): void {
    if (this.movieDetailsForm?.form.valid) {
      //submit form to data api
      this.movieService.addMovie(this.movie).subscribe(
        (successResponse) => {
          console.log(successResponse);
          //show a notification
          this.snackbar.open('Dodano nowy film', undefined, {
            duration: 2000,
          });
          setTimeout(() => {
            this.router.navigateByUrl('movies/' + successResponse.id);
          }, 2000);
        },
        (errorResponse) => {
          this.snackbar.open('Wprowadzono niepoprawne dane', undefined, {
            duration: 2000,
          });
        }
      );
    }
  }
  onDelete(): void {
    this.movieService.deleteMovie(this.movie.id).subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.snackbar.open('Usunięto dane', undefined, {
          duration: 2000,
        });
        setTimeout(() => {
          this.router.navigateByUrl('movies');
        }, 2000);
      },
      (errorResponse) => {}
    );
  }
}
