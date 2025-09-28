import { Component } from '@angular/core';
import { AuthService } from '../../../Authentication/services/auth.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../services/products.service';
import { ProductResponse } from '../../../services/ProductResponse';
import { Router } from '@angular/router';

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
              private productsService: ProductsService,
              private router: Router
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

  //grabs the id from product list
  goToProductDetails(productId: string){
    //send this to product details component
    this.router.navigate(['/product', productId]);
  }
}
