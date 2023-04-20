import {IMovie} from "./movie-interface";

export interface IMovieResponce {
  page: number;
  results: IMovie[];
}
