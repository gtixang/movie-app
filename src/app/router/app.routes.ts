import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
  {
    path: 'movies',
    title: 'movies',
    loadComponent: () =>
      import('@features/movie-list').then((c) => c.MovieListPageComponent),
  },
  {
    path: 'movie/:id',
    title: 'movie',
    loadComponent: () =>
      import('@features/movie-detail').then((c) => c.MovieDetailPageComponent),
  },
  {
    path: '**',
    loadComponent: () => import('@features/not-found').then((c) => c.NotFoundComponent),
  },
];
