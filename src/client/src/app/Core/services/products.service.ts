import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from './ProductModel';
import { AuthService } from '../Authentication/services/auth.service';
import { PagedResponse } from '../../Shared/Models/paged-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  //private baseUrl = 'https://localhost:5003/api'; // products api - docker
  private productUrl = 'https://localhost:7119/api'; //running htts locally

  constructor(private http: HttpClient, private oauthService: AuthService) {}

  get token(): string {
    return this.oauthService.token;
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  }

  getPagedProducts(page: number, pageSize = 10): Observable<PagedResponse<ProductModel>> {
    return this.http.get<PagedResponse<ProductModel>>(
      `${this.productUrl}/getPagedProducts?page=${page}&pageSize=${pageSize}`,
      {
        headers: this.headers,
      }
    );
  }

  getProductById(id: string | null): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.productUrl}/getproduct?id=${id}`);
  }

  addProduct(product: ProductModel): Observable<ProductModel> {
    console.log('Token:', this.token);
    return this.http.post<ProductModel>(`${this.productUrl}/addproduct`, product, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  updateProduct(product: ProductModel): Observable<ProductModel> {
    console.log('Token:', this.token);
    return this.http.put<ProductModel>(`${this.productUrl}/updateproduct`, product, {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
