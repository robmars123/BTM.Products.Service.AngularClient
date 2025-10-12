import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Core/Authentication/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule], //import RouterModule
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

constructor(public authService: AuthService) {}

  protected readonly title = signal('Client');

  collapseNavMenu = true;

  get navMenuCssClass(): string {
    return this.collapseNavMenu ? 'collapse' : '';
  }

  get loggedInUser(): string{
    return this.authService.name ?? '';
  }

  toggleNavMenu(): void {
    this.collapseNavMenu = !this.collapseNavMenu;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  }

}
