import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieRating } from 'src/app/models/ui-models/movieRating.model';
import { User } from 'src/app/models/ui-models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./movieAndRating.component.css']
})
export class ArticleCommentComponent implements OnInit, OnDestroy {

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) {}

  private subscription: Subscription = new Subscription;

  @Input() movieRating: MovieRating={
    id: '',
    title:'',
    comment:'',
    rating: '',
    movieId: '',
    userId: '',
    publishDate: '',
    movie:  {
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
    user:  {
      id: '',
      username: '',
      email: '',
      passwordHash: ''
    }



  };
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean = false;

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.movieRating.user.username);
      }
    );
    /*
    // Load the current user's data
    if (this.movieRating) {
       this.tokenStorageService.getUser().subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.movieRating.user.username);
      }
    );
    }
*/

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }


}
