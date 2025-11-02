import { createFeatureSelector, createSelector } from '@ngrx/store';

import { moviesFeature, MoviesState } from './movies.reducer';

export const selectArticleState = createFeatureSelector<MoviesState>(moviesFeature.name);

export const {
  selectStatus,
  selectMovies: selectAllMovies,
  selectMovie: selectOne,
  selectSearchTerm: searchTermSelector,
} = moviesFeature;

export const filteredMoviesSelector = createSelector(
  selectAllMovies,
  searchTermSelector,
  (movies, searchTerm) => {
    if (!searchTerm?.term) {
      return movies;
    }
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.term.toLowerCase()),
    );
  },
);
