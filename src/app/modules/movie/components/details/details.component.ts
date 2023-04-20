import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {IMovieDetailsResponce, IUser} from "../../../../interfaces";
import {ApiService, StorageService} from "../../../../services";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Output() details = new EventEmitter();
  movieDetails: IMovieDetailsResponce;
  curMovieId: string;
  starRating = 0;

  constructor(private _apiService: ApiService,
              private _activatedRoute: ActivatedRoute,
              private _store: StorageService, private _router: Router) {

    _store.hideSidebarTools.next(true);

    _activatedRoute.params.subscribe(({id}) => {
      this.curMovieId = id;
      _apiService.getMovieById(this.curMovieId).subscribe(movie => {
        this.movieDetails = movie;
        this.details.emit(movie);
      });
    });
  }

  handleClick() {
    if (localStorage.getItem('movies')) {
      const {session} = JSON.parse(localStorage.getItem('movies') as IUser | any);
      return this._apiService.rateMovie(this.curMovieId, {value: this.starRating}, session)
        .subscribe(httpResponce => console.log(httpResponce));
    }
    const {session} = this._store.registeredUser.getValue();
    if (session) {
      return this._apiService.rateMovie(this.curMovieId, {value: this.starRating}, session)
        .subscribe(httpResponce => console.log(httpResponce));
    }
    if (!session) {
      if (confirm('Для осуществления операции необходимо зарегистрироваться! Продолжить?')) {
        return this._router.navigate(['register']);
      }
    }
  }
}
