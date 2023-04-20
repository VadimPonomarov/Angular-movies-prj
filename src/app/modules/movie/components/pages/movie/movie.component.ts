import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ApiService, StorageService} from "../../../../../services";
import {IMovieDetailsResponce} from "../../../../../interfaces";
import {urls} from "../../../../../constants";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  curMovieId: string;
  curCategory: string;
  movieDetails: Partial<IMovieDetailsResponce>;
  imgUrl: string;
  bgImgUrl: string;
  genres: string | undefined;

  constructor(private _activatedRoute: ActivatedRoute,
              private _store: StorageService, private _apiService: ApiService) {

    this._store.hideSidebarTools.next(true);
    this._activatedRoute.params.subscribe(({id}) => this.curMovieId = id);
    this._activatedRoute.url.subscribe(urlSegment => {
      this.curCategory = urlSegment[0].path;
    });
  }

  handleDetails(details: IMovieDetailsResponce) {
    this.movieDetails = details;
    this.imgUrl = [urls.movie_img, details.poster_path].join('/');
    this.bgImgUrl = [urls.movie_bg, details.backdrop_path].join('/');
    const detailsMap = details.genres?.map(el => el.name);
    this.genres = detailsMap?.join();
  }
}
