import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {IMovie, IMovieResponce} from "../../../../../interfaces";
import {ApiService, StorageService} from "../../../../../services";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  curCategory: string;
  curPage: number = 1;
  currentMovieList: IMovie[] = [];

  constructor(private _activatedRoute: ActivatedRoute,
              private _apiServise: ApiService,
              private _store: StorageService) {

    this._store.hideSidebarTools.next(false);

    this._activatedRoute.url
      .subscribe(urlSegment => {
        const category = urlSegment[0].path;
        this.setCurCategory(category);
      });

    this._store.refreshMovies.subscribe(() => {
      this._apiServise.getMoviesByCategory(this.curCategory)
        .subscribe(movies => {
          this.storeMovieResponce(movies, this.curCategory);
          this.getCurMovieListByPage(this.curPage, this.curCategory);
        });
    });

    this._store.refetchCurPage.subscribe(() => {
      this._store.removeCurPage(this.curPage, this.curCategory);
    });
  }

  setCurCategory(category: string): void {
    this.curCategory = category;
  }

  setCurPage(page: number): void {
    this.curPage = page;
  }

  storeMovieResponce(imovieResponce: IMovieResponce, curCategory: string): void {
    this._store.saveMovieResponce(imovieResponce, curCategory);
  }

  getCurMovieListByPage(page: number, curCategory: string): void {
    this.currentMovieList = this._store.getMovieList(page, curCategory);
  };

  handleChangePage(page: number) {
    this.setCurPage(page);
    this.getCurMovieListByPage(this.curPage, this.curCategory);
  }
}
