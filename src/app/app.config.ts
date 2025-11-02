import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './router/app.routes';
import * as moviesEffects from './state/movies.effects';
import { moviesFeature } from './state/movies.reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(moviesEffects),

    provideStore({
      router: routerReducer,
      [moviesFeature.name]: moviesFeature.reducer,
    }),
    provideRouterStore(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
  ],
};
