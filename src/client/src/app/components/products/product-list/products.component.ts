import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../Authentication/services/auth.service';
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

  products = signal<ProductResponse[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Failed to load products');
        this.loading.set(false);
      },
    });
  }

  goToProductDetails(productId: string) {
    this.router.navigate(['/product', productId]);
  }
}
