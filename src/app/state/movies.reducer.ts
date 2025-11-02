import { createFeature, createReducer, on } from '@ngrx/store';

import { Movie } from '../models/movie';
import { moviesActions } from './movies.actions';
import { LoadingStatus } from '../types/loading-status.type';

export interface MoviesState {
  status: LoadingStatus;
  movies: Movie[];
  movie: Movie | null;
  searchTerm: { term: string };
}

export const moviesInitialState: MoviesState = {
  status: 'init',
  movies: [],
  movie: null,
  searchTerm: { term: '' },
};

export const moviesFeature = createFeature({
  name: 'movies',
  reducer: createReducer(
    moviesInitialState,

    on(moviesActions.getAll, (state) => {
      return {
        ...state,
        status: 'loading' as const,
      };
    }),
    on(moviesActions.getAllSuccess, (state, { movies }) => {
      return {
        ...state,
        movies,
        status: 'loaded' as const,
      };
    }),

    on(moviesActions.getAllFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

    on(moviesActions.getOne, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(moviesActions.getOneSuccess, (state, { movie }) => {
      return {
        ...state,
        movie,
        status: 'loaded' as const,
      };
    }),
    on(moviesActions.getOneFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

    on(moviesActions.setFilter, (state, { filter }) => ({
      ...state,
      searchTerm: filter,
    })),
  ),
});
