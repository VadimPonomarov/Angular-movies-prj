import {environment} from '../../environments/environment';

const {API} = environment;

export const urls = {
  auth: 'https://www.themoviedb.org/pusher/auth',
  guest_session: 'https://api.themoviedb.org/3/authentication/guest_session/new',
  background_pictures: 'https://image.tmdb.org/t/p/w500',
  genres: 'https://api.themoviedb.org/3/genre/movie/list',
  movies: 'https://api.themoviedb.org/3/movie',
  movie_img: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2',
  movie_bg: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces',
  discover: 'https://api.themoviedb.org/3/discover/movie'
};
