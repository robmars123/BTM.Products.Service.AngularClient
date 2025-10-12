import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './Features/components/footer/footer.component';
import { HeaderComponent } from './Features/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent], //import RouterModule
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    
}
