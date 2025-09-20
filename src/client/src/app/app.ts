import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './Authentication/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule], //import RouterModule
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    constructor(public auth: AuthService) {}
  protected readonly title = signal('Client');
}
