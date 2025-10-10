import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../Authentication/services/auth.service';
import { ProductResponse } from './ProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'https://localhost:5003/api'; // replace with your API base URL

  constructor(private http: HttpClient, private oauthService: AuthService) {}

  get token(): string {
    return this.oauthService.token;
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  }

  getPagedProducts(page: number, pageSize = 10): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/getPagedProducts?page=${page}&pageSize=${pageSize}`, {
      headers: this.headers,
    });
  }

  getProductById(id: string | null): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/getproduct?id=${id}`);
  }

  addProduct(product: ProductResponse): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(
      `${this.baseUrl}/addproduct`,
      product,
      { headers: this.headers }
    );
  }
}


