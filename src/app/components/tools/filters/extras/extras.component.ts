import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {Options} from '@angular-slider/ngx-slider';
import {StorageService} from '../../../../services';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent {

  voteAverage: number = 8;
  title1 = 'Пользовательский ретинг';
  options1: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    showTicks: true
  };

  minValueVote: number = 0;
  maxValueVote: number = 500;
  title2 = 'Минимальное количество голосов пользователей';
  options2: Options = {
    floor: 0,
    ceil: 500,
    step: 50,
    showTicks: true
  };

  minRunTime: number = 0;
  maxRunTime: number = 400;
  title3 = 'Длительность';
  options3: Options = {
    floor: 0,
    ceil: 400,
    step: 15,
    showTicks: true
  };

  constructor(private _store: StorageService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
  }

  storeParams(): void {
    document.getElementById('btn-extras')?.classList.add('active');
    this._store.movieRequestParams
      .next({
          ...this._store.movieRequestParams.getValue(),
          "vote_average.gte": this.voteAverage,
          "with_runtime.lte": this.maxRunTime,
          "with_runtime.gte": this.minRunTime,
          "vote_count.gte": this.minValueVote,
          "vote_count.lte": this.maxValueVote
        }
      );
  }

  nullParams(): void {
    document.getElementById('btn-extras')?.classList.remove('active');
    this._store.movieRequestParams
      .next({...this._store.baseRequestParams.getValue()});
  }

  handleClick() {
    this.nullParams();
    this._store.refreshSidebarTools.next(!this._store.refreshSidebarTools.getValue());
    window.location.reload();
  }

  handleRefreshParams() {
    this._store.refetchCurPage.next(!this._store.refetchCurPage.getValue());
    this._store.refreshMovies.next(!this._store.refreshMovies.getValue());
  }
}
