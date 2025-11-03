import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;
}
