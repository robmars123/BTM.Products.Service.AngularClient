import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from '../../../../Core/services/ProductResponse';
import { ProductsService } from '../../../../Core/services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: ProductResponse | undefined;
  errorMessage: string = '';
  loading: boolean = true;
  quantity: number = 10;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    //grabs the id
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) return;

    //call the api for specific product
    this.productsService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product';
        this.loading = false;
        console.error(err);
      },
    });
  }

  addToCart(){}
}
