import {Component} from '@angular/core';

import {StorageService} from "../../services";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  hidden: boolean = true;

  constructor(private _store: StorageService) {
    this._store.hideSidebarTools.subscribe(value => this.hidden = value);
  }
}
