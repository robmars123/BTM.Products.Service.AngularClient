import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductResponse } from '../../services/ProductResponse';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  product: ProductResponse | undefined;
  productForm!: FormGroup;
  searchForm!: FormGroup;

  products: ProductResponse[] = [];
  returnMessage: string = '';
  successMessage: string = '';
  SearchReturnMessage: string = '';

  uploadedFile: File | null = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
                  private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

onSubmit(): void {
  if (!this.productForm.valid) return;

  const { id, name, unitPrice } = this.productForm.value;
  const productRequest: ProductResponse = { id, name, unitPrice };

  this.productsService.addProduct(productRequest).subscribe({
    next: (data: ProductResponse) => {
      this.product = data;
      this.successMessage = 'Product successfully added!';
    },
    error: (err: any) => {
      this.errorMessage = 'Failed to load products';
      console.error('Add Product Error:', err);
    },
  });
}

  onFileChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  onSearch() {
    throw new Error('Method not implemented.');
  }
}
