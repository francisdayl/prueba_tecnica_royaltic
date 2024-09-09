import { Injectable, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Product, ProductFull } from '../interfaces/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private apiUrl:string = "http://localhost:8000/" + "store";
  private apiUrlCategory:string = this.apiUrl + "/category/";
  private apiUrlProduct:string = this.apiUrl + "/product/";

  constructor(public http: HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrlCategory);
  }

  getCategory(id:number){
    return this.http.get<Category>(`${this.apiUrlCategory}${id}`);
  }

  createCategory(category: Category){
    return this.http.post<Category>(this.apiUrlCategory,category);
  }

  updateCategory(category: Category){
    return this.http.put<Category>(`${this.apiUrlCategory}${category.id}/`,category);
  }

  deleteCategory(categoryId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrlCategory}${categoryId}/`);
  }


  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrlProduct);
  }

  getProduct(id:number){
    return this.http.get<Product>(`${this.apiUrlProduct}${id}`);
  }

  getProductFull(id:number):Observable<ProductFull>{
    return this.http.get<ProductFull>(`${this.apiUrlProduct}${id}/full_instance`);
  }

  getProductsFull():Observable<ProductFull[]>{
    return this.http.get<ProductFull[]>(`${this.apiUrlProduct}full`);
  }

  createProduct(category: Product){
    return this.http.post<Product>(this.apiUrlProduct,category);
  }

  updateProduct(product: Product){
    return this.http.put<Product>(`${this.apiUrlProduct}${product.id}/`,product);
  }

  deleteProduct(productId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrlProduct}${productId}/`);
  }


  getRelatedProducts(id:number):Observable<ProductFull[]>{
    return this.http.get<ProductFull[]>(`${this.apiUrlProduct}${id}/related_products/`);
  }


}
