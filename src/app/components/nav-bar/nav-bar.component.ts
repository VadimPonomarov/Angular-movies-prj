import {Component} from '@angular/core';

import {AuthService, StorageService} from "../../services";
import {IUser} from "../../interfaces";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  user: string = '';

  constructor(private _store: StorageService, private _authService: AuthService) {

    _store.refreshRegistered.subscribe(() => {
      const {username} = _authService.autoGuestIfInLocal() as IUser | any;
      this.user = username;
    });

  }
}
