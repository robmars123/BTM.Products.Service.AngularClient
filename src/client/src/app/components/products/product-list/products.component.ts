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

  page = 1;
  pageSize = 10;
  allLoaded = false;

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNextPage();
  }

  private loadNextPage() {
    this.productsService.getPagedProducts(this.page, this.pageSize).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.allLoaded = true;
        } else {
          this.products.update(prev => [...prev, ...data]);
          this.page++;
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
  // ngOnInit(): void {
  //   this.productsService.getAllProducts().subscribe({
  //     next: (data) => {
  //       this.products.update((p) => [...p, ...data]);
  //       this.loading.set(false);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.errorMessage.set('Failed to load products');
  //       this.loading.set(false);
  //     },
  //   });
  // }

  goToProductDetails(productId: string) {
    this.router.navigate(['/product', productId]);
  }
}
function HostListener(arg0: string, arg1: never[]): (target: ProductsComponent, propertyKey: "onScroll", descriptor: TypedPropertyDescriptor<() => void>) => void | TypedPropertyDescriptor<() => void> {
  throw new Error('Function not implemented.');
}

