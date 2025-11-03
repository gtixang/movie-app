import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as movieSelectors from './movies.selectors';

import { moviesActions } from './movies.actions';

@Injectable({ providedIn: 'root' })
export class MoviesFacade {
  private readonly store = inject(Store);
  public readonly movies$ = this.store.select(movieSelectors.filteredMoviesSelector);
  public readonly movie$ = this.store.select(movieSelectors.movieSelector);
  public readonly status$ = this.store.select(movieSelectors.statusSelector);

  getAll() {
    this.store.dispatch(moviesActions.getAll());
  }
  getOne() {
    this.store.dispatch(moviesActions.getOne());
  }
  setFilter(term: string) {
    this.store.dispatch(moviesActions.setFilter({ filter: { term } }));
  }
}
