import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Movie } from '../models/movie';
import { ApiService } from '../services/api.service';
import { moviesActions } from './movies.actions';
import { Store } from '@ngrx/store';
import { selectRouteParam } from '@app/router/router.selectors';

export const getAll$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(moviesActions.getAll),
      switchMap(() =>
        apiService.get<Movie[]>('/movies').pipe(
          map((movies) => moviesActions.getAllSuccess({ movies })),
          catchError((error) => {
            console.error('Error', error);
            return of(moviesActions.getAllFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
export const getOne$ = createEffect(
  (
    store = inject(Store),
    actions$ = inject(Actions),
    apiService = inject(ApiService),
  ) => {
    const id$ = store.select(selectRouteParam('id'));

    return actions$.pipe(
      ofType(moviesActions.getOne),
      withLatestFrom(id$),
      filter(([, id]) => Boolean(Number(id))),
      switchMap(([, id]) =>
        apiService.get<Movie>(`/movies/${id}`).pipe(
          map((movie) => moviesActions.getOneSuccess({ movie })),
          catchError((error) => {
            console.error('Error', error);
            return of(moviesActions.getOneFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
