import { ResolveFn } from '@angular/router';
import { Category, ProductFull } from '../interfaces/store';
import { StoreService } from '../services/store.service';
import { inject } from '@angular/core';


export const adminProductResolver: ResolveFn<ProductFull[]> = (route, state) => {
  const storeService = inject(StoreService); 
  return storeService.getProductsFull();
};

export const adminProductDetailResolver: ResolveFn<ProductFull> = (route, state) => {
  const productId = route.params['id'];
  const storeService = inject(StoreService); 

  return storeService.getProductFull(productId);
};

export const adminCategoryResolver: ResolveFn<Category[]> = (route, state) => {
  const storeService = inject(StoreService); 
  return storeService.getCategories();
};

