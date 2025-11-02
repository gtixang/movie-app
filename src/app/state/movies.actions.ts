import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from '../models/movie';

export const moviesActions = createActionGroup({
  source: 'Movie',
  events: {
    getAll: emptyProps(),
    getAllSuccess: props<{ movies: Movie[] }>(),
    getAllFailed: props<{ error: Error }>(),

    getOne: emptyProps(),
    getOneSuccess: props<{ movie: Movie }>(),
    getOneFailed: props<{ error: Error }>(),
  },
});
