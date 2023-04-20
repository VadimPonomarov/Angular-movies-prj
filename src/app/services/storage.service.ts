import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {IUser} from "../interfaces/user-interface";
import {IGenre, IMovie, IMovieDiscoverParams, IMovieResponce} from "../interfaces";
import {API_KEYS, LanguagesEnum, MovieCategoriesEnum} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  refreshMovies = new BehaviorSubject<boolean>(false);
  refetchCurPage = new BehaviorSubject<boolean>(false);
  refreshSidebarTools = new BehaviorSubject<boolean>(false);
  hideSidebarTools = new BehaviorSubject<boolean>(false);
  refreshRegistered = new BehaviorSubject<boolean>(false);

  /*Guest info*/
  registeredUser = new BehaviorSubject<IUser>({} as IUser);
  /*currentMovie*/

  currentMovieStore = new BehaviorSubject<IMovie>({} as IMovie);

  /*MovieResponceList by categories*/
  moviesPopular = new BehaviorSubject<IMovieResponce[]>([] as IMovieResponce[]);
  moviesNowPlaying = new BehaviorSubject<IMovieResponce[]>([] as IMovieResponce[]);
  moviesUpcoming = new BehaviorSubject<IMovieResponce[]>([] as IMovieResponce[]);
  moviesDiscover = new BehaviorSubject<IMovieResponce[]>([] as IMovieResponce[]);
  moviesBest = new BehaviorSubject<IMovieResponce[]>([] as IMovieResponce[]);

  /*GenreListResponce*/
  genres = new BehaviorSubject<IGenre[]>([] as IGenre[]);

  baseRequestParams = new BehaviorSubject<Partial<IMovieDiscoverParams>>(
    {
      api_key: API_KEYS.api_key,
      language: LanguagesEnum.russian,
    }
  );
  movieRequestParams = new BehaviorSubject<Partial<IMovieDiscoverParams>>(
    {...this.baseRequestParams.getValue()}
  );

  isPageInStore(page: number, curCategory: string): any {
    const curStore = this.getStoreByCategory(curCategory);
    return !!curStore.getValue().find(el => el.page === page);
  }

  saveMovieResponce(imovieResponce: IMovieResponce, curCategory: string): void {

    const curStore = this.getStoreByCategory(curCategory);

    if (!curStore.getValue()
      .find(el => el.page === imovieResponce.page)) {
      const newValue = [...curStore.getValue(), imovieResponce];
      curStore.next([...newValue]);
    }
  }

  getMovieList(page: number, curCategory: string): IMovie[] {

    const movieArr: IMovie[] = [];
    const curStore = this.getStoreByCategory(curCategory);

    const movieListFiltered = curStore.getValue()
      .filter(pages => pages.page === page);

    if (movieListFiltered) {
      movieListFiltered
        .forEach(page => page.results
          .forEach(movie => movieArr.push(movie)
          )
        );
    }
    return movieArr;
  }

  getMovieById(id: string, curCategory: string): void {
    const curStore = this.getStoreByCategory(curCategory);
    curStore.getValue().forEach(page => page.results.forEach(movie => {
          if (movie.id === +id) {
            this.currentMovieStore.next(movie as IMovie);
          }
        }
      )
    );
  }

  storeMovieAsCurrent(movie: IMovie): void {
    this.currentMovieStore.next(movie);
  }

  removeCurPage(page: number, curCategory: string): void {
    const store = this.getStoreByCategory(curCategory);
    store.next(store.getValue().filter(el => el.page !== page));
  }

  getStoreByCategory(curCategory: string): BehaviorSubject<IMovieResponce[]> {

    let curStore: BehaviorSubject<IMovieResponce[]>;

    switch (curCategory) {
      case MovieCategoriesEnum.top_rated:
        curStore = this.moviesBest;
        break;
      case MovieCategoriesEnum.now_playing:
        curStore = this.moviesNowPlaying;
        break;
      case MovieCategoriesEnum.upcoming:
        curStore = this.moviesUpcoming;
        break;
      case MovieCategoriesEnum.popular:
        curStore = this.moviesPopular;
        break;
      default:
        curStore = this.moviesDiscover;
    }

    return curStore;
  }
}
