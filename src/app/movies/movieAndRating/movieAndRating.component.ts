import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/models/ui-models/genre.model';
import { Movie } from 'src/app/models/ui-models/movie.model';
import { MovieRating } from 'src/app/models/ui-models/movieRating.model';
import { User } from 'src/app/models/ui-models/user.model';
import { GenreService } from 'src/app/services/genre.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { MovieService } from '../movie.service';
import { MovieRatingService } from '../movieRating.service';

@Component({
  selector: 'app-vi',
  templateUrl: './movieAndRating.component.html',
  styleUrls: ['./movieAndRating.component.css'],
})
export class MovieAndRatingComponent implements OnInit {
  // @Input() comments: Comment[] | undefined = [];

  movieRatings: MovieRating[] = [];
  movieRating: MovieRating = {
    id: '',
    title: '',
    comment: '',
    rating: '',
    movieId: '',
    userId: '',
    publishDate: '',
    movie: {
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
    },
    user: {
      id: '',
      username: '',
      email: '',
      passwordHash: '',
    },
  };
  currentComment: Comment | null = null;

  userId: string | null | undefined;
  user: User = {
    id: '',
    username: '',
    email: '',
    passwordHash: '',
  };
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

  currentUser: User = {
    id: '',
    username: '',
    email: '',
    passwordHash: '',
  };
  canModify: boolean = false;

  @ViewChild('movieDetailsForm') movieDetailsForm?: NgForm;
  isLoggedIn = false;

  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private readonly movieService: MovieService,
    private readonly movieRatingService: MovieRatingService,
    private readonly route: ActivatedRoute,
    private readonly genreService: GenreService,
    private readonly tokenStorage: TokenStorageService,
    private snackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('id');

      // Load the comments on this movie
      this.populateComments();

      // Load the current user's data
      /*
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
*/
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
      }
      // Load the current user's data
      /*
      this.tokenStorageService.getUser().subscribe(
      (userData: User) => {
        this.user = userData;
      }
    );
*/

      if (this.movieId) {
        // if the route contains the 'add'

        if (this.movieId.toLocaleLowerCase() == 'Add'.toLocaleLowerCase()) {
          //new Movie functionality
          this.isNewMovie = true;
          this.header = 'Edytuj dane filmu';
        } else {
          //existing Movie functionality
          this.isNewMovie = false;
          this.header = 'Film';
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

  populateComments() {
    if (this.movieId) {
      this.movieRatingService
        .getMovieRatings(this.movieId)
        .subscribe(
          (movieRatings: MovieRating[]) => (this.movieRatings = movieRatings)
        );
    }
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

  onDeleteComment(movieRating: MovieRating) {
    this.movieRatingService.destroy(movieRating.id).subscribe((success) => {
      this.movieRatings = this.movieRatings.filter(
        (item) => item !== movieRating
      );
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentDialog, {
      height: '55%',
      width: '60%',
      data: {
        title: this.movieRating.title,
        comment: this.movieRating.comment,
        movieId: this.movie.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.movieRating = result;
    });
  }
}

@Component({
  selector: 'comment-dialog',
  templateUrl: 'comment-dialog.html',
  styleUrls: ['./movieAndRating.component.css'],
})
export class CommentDialog implements OnInit {
  public form: FormGroup;

  movieRating: MovieRating = {
    id: '',
    title: '',
    comment: '',
    rating: '',
    movieId: '',
    userId: '',
    publishDate: '',
    movie: {
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
    },
    user: {
      id: '',
      username: '',
      email: '',
      passwordHash: '',
    },
  };

  currentUser: User = {
    id: '',
    username: '',
    email: '',
    passwordHash: '',
  };
  isLoggedIn = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private readonly movieRatingService: MovieRatingService,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private readonly tokenStorage: TokenStorageService,
    private readonly route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<CommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MovieRating,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      rating1: [5],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    // Load the current user's data
    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
    });
  }

  onCommentAdd(): void {
    if (this.dialogRef) {
      this.subscription = this.userService.currentUser.subscribe(
        (userData: User) => {
          this.movieRating.userId = userData.id;
          this.movieRating.rating = this.form.value.rating1;
          this.movieRating.title = this.data.title;
          this.movieRating.comment = this.data.comment;

          this.movieRatingService
            .addMovieRating(this.movieRating, this.data.movieId)
            .subscribe(
              (successResponse) => {
                console.log(successResponse);
                //show a notification
                this.snackbar.open('Dodano nowy komentarz', undefined, {
                  duration: 2000,
                });
                setTimeout(() => {
                  this.router.navigateByUrl('movies/' + this.data.movieId);
                }, 1000);
              },
              (errorResponse) => {
                this.snackbar.open('Wprowadzono niepoprawne dane', undefined, {
                  duration: 2000,
                });
              }
            );
        }
      );

    }
  }
}
