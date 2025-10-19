import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductModel } from '../../../Core/services/ProductModel';
import { ProductsService } from '../../../Core/services/products.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  providers: [CurrencyPipe],
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  addProductModel: ProductModel | undefined;
  updateProductModel: ProductModel | undefined;

  addProductForm!: FormGroup;
  updateProductForm!: FormGroup;
  searchForm!: FormGroup;

  returnMessage: string = '';
  addSuccessMessage: string | undefined = '';
  updateSuccessMessage: string | undefined = '';
  deleteSuccessMessage: string | undefined= '';
  SearchReturnMessage: string = '';

  uploadedFile: File | null = null;

  products = signal<ProductModel[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  isFormValid: boolean = false;
  page = 1;
  pageSize = 10;
  totalPages = 1;
  allLoaded = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
  }

  private loadProducts() {
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

  private initializeForm() {
    this.searchForm = this.fb.group({
      keyword: [''],
    });

    //Add Product form
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
    });

    //Update Product form
    this.updateProductForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
      isDeleted: [false],
    });
  }

  addProduct(): void {
    if (!this.addProductForm.valid) return;

    const { id, name, unitPrice, isDeleted } = this.addProductForm.value;
    const productRequest: ProductModel = { id, name, unitPrice, isDeleted };

    this.productsService.addProduct(productRequest).subscribe({
      next: (data: ProductModel) => {
        this.addProductModel = data;
        this.addSuccessMessage = 'Product successfully added!';

        //Refresh
        this.loadProducts();
      },
      error: (err: any) => {
        this.errorMessage.set('Failed to load products');
        console.error('Add Product Error:', err);
      },
    });
  }

  updateProduct(): void {
    if (!this.updateProductForm.valid) return;

    const { id, name, unitPrice, isDeleted } = this.updateProductForm.value;

    const productRequest: ProductModel = {
      id,
      name,
      unitPrice,
      isDeleted,
    };

    this.productsService.updateProduct(productRequest).subscribe({
      next: (data: ProductModel) => {
        this.updateProductModel = data;
        this.updateSuccessMessage = 'Product successfully updated!';

        //Refresh
        this.loadProducts();

        //clear current selection
        this.initializeForm();
        this.updateProductModel = undefined;
        this.updateSuccessMessage = '';
      },
      error: (err: any) => {
        this.errorMessage.set('Failed to load product');
        console.error('Update Product Error:', err);
      },
    });
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe({
      next: (data: ProductModel) => {
        this.deleteSuccessMessage = 'Product successfully deleted!';

        //Refresh
        this.loadProducts();
        this.initializeForm();
        this.updateProductModel = undefined;
      },
      error: (err: any) => {
        this.errorMessage.set('Failed to load product');
        console.error('Update Product Error:', err);
      },
    });
  }

  format(value: number) {
    return this.currencyPipe.transform(value, 'USD', 'symbol', '1.2-2');
  }

  changePage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.page = pageNumber;
    this.loadProducts();
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

  selectProduct(id: string) {
    const product = this.products().find((p) => p.id === id);
    if (!product) return;

    this.updateProductModel = product;

    this.updateProductForm.setValue({
      id: product.id,
      name: product.name,
      unitPrice: product.unitPrice,
      isDeleted: product.isDeleted ?? false,
    });

    this.deleteSuccessMessage = undefined;
  }

  delete_Click(id: string) {
    // let product = this.products().find((p) => p.id === id);
    // this.updateProduct = product;
  }

  onFileChange($event: Event) {}
  onSearch() {}
}
