import { ChangeDetectionStrategy, Component, input, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  public searchTermSignal = input.required<WritableSignal<string>>();

  onInput(event: Event) {
    this.searchTermSignal().set((event.target as HTMLInputElement).value);
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}
