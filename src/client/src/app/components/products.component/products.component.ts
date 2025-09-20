import { Component } from '@angular/core';
import { AuthService } from '../../Authentication/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  /**
   *
   */
  constructor(public authService: AuthService) {  }

  ngOnInit() {
    let token = this.authService.token;
    console.log(token);          // access token
    console.log(this.authService.identityClaims); // user info
  }
}
