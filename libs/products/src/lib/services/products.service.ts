import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {


  constructor(private http: HttpClient) {}
  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>('http://localhost:3000/api/v1/products', {
      params: params,
    });
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(
      `http://localhost:3000/api/v1/products/${productId}`
    );
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(
      'http://localhost:3000/api/v1/products',
      productData
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3000/api/v1/products/${productId}`
    );
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(
      `http://localhost:3000/api/v1/products/${productid}`,
      productData
    );
  }

  getProductCount(): Observable<{ productCount: number }> {
    return this.http
      .get<{ productCount: number }>(
        'http://localhost:3000/api/v1/products/get/count'
      )
      .pipe();
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:3000/api/v1/products/get/featured/${count}`
    );
  }

  addGallery(multipleImages:any,productId: string): Observable<any> {
    const formData = new FormData();
    for (const img of multipleImages) {
      formData.append('images', img);
    }

    
    return this.http.put<any>(
      `http://localhost:3000/api/v1/products/gallery-images/${productId}`,
      formData
    );
  }
}
