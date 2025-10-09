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

  getAllProducts(): Observable<ProductResponse[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<ProductResponse[]>(`${this.baseUrl}/allproducts`, { headers });
  }

  getProductById(id: string | null): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/getproduct?id=${id}`);
  }

  addProduct(product: ProductResponse): Observable<ProductResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<ProductResponse>(
      `${this.baseUrl}/addproduct`,
      product,
      { headers }
    );
  }
}


