import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Core/Authentication/services/auth.service';
import { ProductResponse } from '../../../../Core/services/ProductResponse';
import { ProductsService } from '../../../../Core/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = signal<ProductResponse[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  page = 1;
  pageSize = 10;
  totalPages = 1;
  allLoaded = false;

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPage();
  }

  private loadPage() {
    this.loading.set(true);

    this.productsService.getPagedProducts(this.page, this.pageSize).subscribe({
      next: (data) => {
        if (data.totalCount === 0) {
          this.allLoaded = true; // no more pages
        } else {
        this.products.set(data.items);
        this.totalPages = Math.ceil(data.totalCount / this.pageSize);
        this.loading.set(false);
        }
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

  changePage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.page = pageNumber;
    this.loadPage();
  }

  visiblePages(): number[] {
    const total = this.totalPages;
    const current = this.page;
    const maxVisible = 10; // max buttons

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = current - Math.floor(maxVisible / 2);
    let end = current + Math.floor(maxVisible / 2);

    if (start < 1) {
      start = 1;
      end = maxVisible;
    } else if (end > total) {
      end = total;
      start = total - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}

