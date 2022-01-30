export interface AddMovieRatingRequest {
  title: string,
  comment: string,
  rating: string,
  publishDate: string | null,
  movieId: string,
  userId: string
}
