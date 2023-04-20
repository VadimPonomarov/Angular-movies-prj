import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {StorageService} from "../../../../services";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  page = 1;
  maxSize = 5;
  @Input() curCategory: string;
  @Output() changeCurPage = new EventEmitter();

  constructor(private _store: StorageService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

  handleChange() {
    this._store.movieRequestParams
      .next({...this._store.movieRequestParams.getValue(), page: this.page});
    if (!this._store.isPageInStore(this.page, this.curCategory)) {
      this._store.refreshMovies.next(!this._store.refreshMovies.getValue());
    }
    this.changeCurPage.emit(this.page);
  }
}
