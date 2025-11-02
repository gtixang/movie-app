import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from '../models/movie';

export const setUsersFilter = createAction(
  '[Users] Set Users Filter',
  props<{ filter: { name: string } }>(),
);

export const moviesActions = createActionGroup({
  source: 'Movie',
  events: {
    getAll: emptyProps(),
    getAllSuccess: props<{ movies: Movie[] }>(),
    getAllFailed: props<{ error: Error }>(),

    getOne: emptyProps(),
    getOneSuccess: props<{ movie: Movie }>(),
    getOneFailed: props<{ error: Error }>(),

    setFilter: props<{ filter: { term: string } }>(),
  },
});
