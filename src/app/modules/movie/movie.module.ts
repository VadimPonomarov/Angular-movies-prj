import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MovieRoutingModule} from './movie-routing.module';
import {PaginationComponent} from './components/pagination/pagination.component';
import {NgbPaginationModule, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {MoviesMainComponent} from "./components/pages/movies-main/movies-main.component";
import {MoviesComponent} from "./components/pages/movies/movies.component";
import {MainPageCardComponent} from './components/main-page-card/main-page-card.component';
import {MovieComponent} from './components/pages/movie/movie.component';
import {DetailsComponent} from './components/details/details.component';
import {ApiService, StorageService} from "../../services";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    MoviesComponent,
    MoviesMainComponent,
    PaginationComponent,
    MainPageCardComponent,
    MovieComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    NgbPaginationModule,
    NgbRatingModule,
    HttpClientModule
  ],
  exports: [
    MovieComponent
  ],
  providers: [ApiService, HttpClient, StorageService]
})
export class MovieModule {
}
