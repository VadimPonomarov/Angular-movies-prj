import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {API_KEYS, urls} from "../constants";
import {IGenreResponce, IMovieDetailsResponce, IMovieRating, IMovieResponce} from "../interfaces";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient,
              private _store: StorageService) {
  }

  getAllGenres(): Observable<IGenreResponce> {
    return this._httpClient
      .get<IGenreResponce>(urls.genres,
        {
          params: {...this._store.movieRequestParams.getValue(), language: 'ru'}
        });
  };

  getMoviesByCategory(category: string): Observable<IMovieResponce> {

    const fetchPath = (category === 'discover') ? urls.discover : [urls.movies, category].join('/');

    return this._httpClient
      .get<IMovieResponce>(fetchPath,
        {
          params: {...this._store.movieRequestParams.getValue()}
        });
  };

  getMovieById(id: string): Observable<IMovieDetailsResponce> {
    const fetchPath = [urls.movies, id].join('/');
    return this._httpClient.get<IMovieDetailsResponce>(fetchPath, {
      params: {...this._store.movieRequestParams.getValue()}
    });
  }

  rateMovie(movieId: string, rating: IMovieRating, session: string): Observable<any> {
    const fetchPath = [urls.movies, movieId, 'rating'].join('/');
    return this._httpClient.post(fetchPath, rating,
      {
        params: {
          api_key: API_KEYS.api_key,
          guest_session_id: session
        }
      });
  }

}
