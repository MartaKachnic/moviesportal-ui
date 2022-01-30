import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MoviesComponent } from './movies/movies.component';
import { ViComponent } from './movies/vi/vi.component';
import { MovieAndRatingComponent } from './movies/movieAndRating/movieAndRating.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'movies/edit/:id',
    component: ViComponent
  },
  {
    path: 'movies/:id',
    component: MovieAndRatingComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
