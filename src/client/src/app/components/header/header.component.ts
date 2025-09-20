import { Component, signal } from '@angular/core';
import { AuthService } from '../../Authentication/services/auth.service';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgClass], //import RouterModule
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
