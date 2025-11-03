import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LetDirective } from '@ngrx/component';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { MoviesFacade } from '@state/movies.facade';
import { MovieCardComponent } from '@components/movie-card';
import { SearchFormComponent } from '@app/components/search-form';

import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-list',
  imports: [
    MovieCardComponent,
    CommonModule,
    LetDirective,
    MatProgressSpinnerModule,
    SearchFormComponent,
  ],
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListPageComponent implements OnInit {
  private readonly moviesFacade = inject(MoviesFacade);
  public readonly status$ = this.moviesFacade.status$;
  public readonly movies$ = this.moviesFacade.movies$;

  public readonly searchTerm = signal('');

  private readonly searchStream$ = toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntilDestroyed(),
  );

  ngOnInit() {
    this.initializeSearchSubscription();
    this.initializeMovieList();
  }
  private initializeMovieList(): void {
    this.moviesFacade.getAll();
  }

  private initializeSearchSubscription(): void {
    this.searchStream$.subscribe((term: string) => {
      this.moviesFacade.setFilter(term);
    });
  }
}
