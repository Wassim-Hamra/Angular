import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductFilterComponent } from './product-filter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductFilterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp-angular');
}
