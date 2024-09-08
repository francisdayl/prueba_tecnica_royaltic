import { Injectable, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private http = inject(HttpClient);
  private apiUrl:string = "http://localhost:8000/" + "store";

  constructor() { }

  getCategories(){
    return this.http.get<Category[]>(`${this.apiUrl}/category/`);
  }

  getCategory(id:number){
    return this.http.get<Category>(`${this.apiUrl}"/category/${id}`);
  }

  createCategory(category: Category){
    return this.http.post<Category>(`${this.apiUrl}"/category/`,category);
  }

  updateCategory(category: Category){
    return this.http.put<Category>(`${this.apiUrl}"/category/${category.id}/`,category);
  }

  deleteCategory(category: Category){
    return this.http.delete<Category>(`${this.apiUrl}"/category/${category.id}/`);
  }





}
