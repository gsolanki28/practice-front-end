import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None
})
export class App {
  protected title = 'task-manager-frontend';
}
