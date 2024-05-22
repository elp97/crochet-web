import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageI, ProductI } from '../interfaces/productsI';
import { ProductTypes, ProductTypesResponse } from '../interfaces/productTypeI';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProductTypes() : Observable<ProductTypesResponse[]> {
    return this.http.get<ProductTypesResponse[]>(`${this.apiUrl}/products/getTypes`);
  }

  getProductsPerType(productType: string) : Observable<ProductI[]> {
    return this.http.get<ProductI[]>(`${this.apiUrl}/products/getProductsByType/${productType}`);
  }

  getProductDetailsByType(productType: string) : Observable<ProductI[]> {
    return this.http.get<ProductI[]>(`${this.apiUrl}/products/getProductDetailsByType/${productType}`);
  }

  getImagesPerID(productID: number) : Observable<ImageI[]> {
    return this.http.get<ImageI[]>(`${this.apiUrl}/products/getImagesByID/${productID}`);
  }

  search(searchItem: string) : Observable<ProductI[]> {
    return this.http.get<ProductI[]>(`${this.apiUrl}/products/search`, {params: {searchItem: searchItem}});
  }
}
