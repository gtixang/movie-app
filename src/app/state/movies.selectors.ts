import { createFeatureSelector } from '@ngrx/store';

import { moviesFeature, MoviesState } from './movies.reducer';

export const selectArticleState = createFeatureSelector<MoviesState>(moviesFeature.name);

export const {
  selectStatus,
  selectMovies: selectAll,
  selectMovie: selectOne,
} = moviesFeature;
