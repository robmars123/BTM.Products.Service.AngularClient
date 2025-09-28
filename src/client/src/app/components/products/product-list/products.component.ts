import { Component } from '@angular/core';
import { AuthService } from '../../../Authentication/services/auth.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../services/products.service';
import { ProductResponse } from '../../../services/ProductResponse';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: ProductResponse[] = [];
  loading = true;
  errorMessage = '';
  constructor(public authService: AuthService,
              private productsService: ProductsService
            ) {  }

  ngOnInit(): void {
      this.productsService.getAllProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load products';
          this.loading = false;
          console.error(err);
        },
      });
  }
}
