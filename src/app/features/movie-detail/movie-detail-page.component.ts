import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesFacade } from '@app/state/movies.facade';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-movie-detail',
  imports: [LetDirective],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailPageComponent implements OnInit {
  public readonly router = inject(Router);
  public movieFacade = inject(MoviesFacade);
  public status$ = this.movieFacade.status$;
  public movie$ = this.movieFacade.movie$;

  ngOnInit(): void {
    this.movieFacade.getOne();
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
