import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { LetDirective } from '@ngrx/component';

import { MoviesFacade } from '@state/movies.facade';
import { MovieCardComponent } from '@components/movie-card';
import { LoadingSpinnerComponent } from '@components/loading-spinner';
import { SearchFormComponent } from '@app/components/search-form';

@Component({
  selector: 'app-movie-list',
  imports: [
    MovieCardComponent,
    LetDirective,
    LoadingSpinnerComponent,
    SearchFormComponent,
  ],
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListPageComponent implements OnInit {
  public moviesFacade = inject(MoviesFacade);
  public readonly status$ = this.moviesFacade.status$;
  public readonly movies$ = this.moviesFacade.movies$;

  public searchQuery = signal('');

  constructor() {
    effect(() => {
      const query = this.searchQuery().trim();
      if (query) {
        console.log('🔍 Поиск фильмов по запросу:', query);
        // тут можно вызывать сервис:
        // this.moviesService.loadMovies(query);
      }
    });
  }

  ngOnInit() {
    this.moviesFacade.getAll();

    // effect(() => {
    //   console.log('🔍 Поиск изменился:', this.searchQuery());
    // });
    // this.movies$ = this.search.valueChanges.pipe(
    //   tap((value) => console.log(value)),
    //   startWith(''),
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term) => this.movieService.search(term as any))
    // );
  }
}
