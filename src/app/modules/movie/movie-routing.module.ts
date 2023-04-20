import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent} from "../../components/main-page/main-page.component";
import {MoviesComponent} from "./components/pages/movies/movies.component";
import {MovieComponent} from "./components/pages/movie/movie.component";

const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    children: [
      {path: '', redirectTo: 'discover', pathMatch: 'full'},
      {path: 'popular', component: MoviesComponent},
      {path: 'popular/movie/:id', component: MovieComponent},
      {path: 'now_playing', component: MoviesComponent},
      {path: 'now_playing/movie/:id', component: MovieComponent},
      {path: 'upcoming', component: MoviesComponent},
      {path: 'upcoming/movie/:id', component: MovieComponent},
      {path: 'top_rated', component: MoviesComponent},
      {path: 'top_rated/movie/:id', component: MovieComponent},
      {path: 'discover', component: MoviesComponent},
      {path: 'discover/movie/:id', component: MovieComponent},
      {path: '**', redirectTo: 'discover'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
}
