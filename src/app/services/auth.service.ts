import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as md5 from 'md5';

import {ISessionIdResponce, IUser} from "../interfaces";
import {StorageService} from "./storage.service";
import {API_KEYS, urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _store: StorageService, private _httpClient: HttpClient) {
  }

  registerGuest(user: IUser): void {
    const passwordCrypto = md5(user.password);
    this._store.registeredUser.next({...user, password: passwordCrypto});
    this.getNewSession();
  }

  autoGuestIfInLocal(): IUser {
    const {user} = this.getGuestFromLocal() as IUser | any;
    this._store.registeredUser.next(user);
    return user;
  }

  getNewSession(): void {
    this._httpClient
      .get<ISessionIdResponce>(urls.guest_session, {params: {api_key: API_KEYS.api_key}})
      .subscribe(sessionData => {
        this.setSessionId(sessionData.guest_session_id);
        if (localStorage.getItem('movie')) {
          this.removeGuestFromLocal();
        }
        if (confirm('Сохранить в Local Storage ?')) {
          this.storeGuestToLocal(this._store.registeredUser.getValue());
          this.getGuestFromLocal();
        }
      });
  }

  setSessionId(sessionId: string): void {
    this._store.registeredUser
      .next({...this._store.registeredUser.getValue(), session: sessionId});
  }

  getSessionId(): string | undefined {
    return this._store.registeredUser.getValue().session;
  }

  removeSessionId(): void {
    this.setSessionId('');
  }

  storeGuestToLocal(user: IUser): void {
    localStorage.setItem('movies', JSON.stringify(user));
  }

  getGuestFromLocal(): IUser {
    const guest: IUser | any = localStorage?.getItem('movies');
    return JSON.parse(guest);
  }

  removeGuestFromLocal(): void {
    localStorage.removeItem('movies');
  }
}
