import { Genre } from "./genre.model";
import { MovieRating } from "./movieRating.model";

export interface Movie {
  id: string,
  title: string,
  director: string,
  description: string,
  releaseDate: string,
  averageRating: string,
  poster: string,
  genreId: string,
  genre: Genre,
  movieRatings: Array<MovieRating>
}
