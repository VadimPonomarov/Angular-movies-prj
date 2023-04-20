import {Component} from '@angular/core';

import {IGenre} from "../../../../interfaces";
import {ApiService, StorageService} from "../../../../services";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent {

  genres: IGenre[];
  title = 'Жанры';
  active: number[] = [];

  constructor(private _movieService: ApiService, private _store: StorageService) {
    this._movieService.getAllGenres().subscribe(responceData => {
      this.genres = responceData.genres;
    });
    this._store.refreshSidebarTools.subscribe(() => this.nullActive());
  }

  handleClick(id: number) {
    const button = document.getElementById(id.toString());
    button?.classList.toggle('active');
    const res = this.active.find(el => el === id);
    if (res) {
      this.active = this.active.filter(el => el !== id);
    } else {
      this.active.push(id);
    }
    this.storeParams();
  }

  storeParams(): void {
    this._store.movieRequestParams
      .next({
          ...this._store.movieRequestParams.getValue(),
          with_genres: this.active.join()
        }
      );
  }

  nullActive() {
    this.active.forEach(id => {
      const button = document.getElementById(id.toString());
      button?.classList.toggle('active');
    });
    this.active = [];
  }
}
