import { createFeatureSelector, createSelector } from '@ngrx/store';

import { moviesFeature, MoviesState } from './movies.reducer';

export const selectArticleState = createFeatureSelector<MoviesState>(moviesFeature.name);

export const {
  selectStatus: statusSelector,
  selectMovies: allMoviesSelector,
  selectMovie: movieSelector,
  selectSearchTerm: searchTermSelector,
} = moviesFeature;

export const filteredMoviesSelector = createSelector(
  allMoviesSelector,
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
