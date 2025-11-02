import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as movieSelectors from './movies.selectors';

import { moviesActions } from './movies.actions';

@Injectable({ providedIn: 'root' })
export class MoviesFacade {
  private readonly store = inject(Store);
  public readonly movies$ = this.store.select(movieSelectors.selectAll);
  public readonly movie$ = this.store.select(movieSelectors.selectOne);
  public readonly status$ = this.store.select(movieSelectors.selectStatus);

  getAll() {
    this.store.dispatch(moviesActions.getAll());
  }
  getOne() {
    this.store.dispatch(moviesActions.getOne());
  }
}
