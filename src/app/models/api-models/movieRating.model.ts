import { Movie } from "./movie.model";
import { User } from "./user.model";

export interface MovieRating {
  id: string,
  title: string,
  comment: string,
  rating: string,
  publishDate: string,
  movieId: string,
  movie: Movie,
  userId: string,
  user: User
}
