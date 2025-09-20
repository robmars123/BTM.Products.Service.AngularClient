import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent], //import RouterModule
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    
}
