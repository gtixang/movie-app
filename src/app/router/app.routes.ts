import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/movie-list').then((c) => c.MovieListPageComponent),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('@features/movie-detail').then((c) => c.MovieDetailPageComponent),
  },
  {
    path: '**',
    loadComponent: () => import('@features/not-found').then((c) => c.NotFoundComponent),
  },
];
