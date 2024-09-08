import { ResolveFn } from '@angular/router';
import { Category, Product } from '../interfaces/store';
import { StoreService } from '../services/store.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';


export const indexResolver: ResolveFn<{ categories: Category[], products: Product[]} > = (route, state) => {
  const storeService = inject(StoreService); 
  return forkJoin({
    categories: storeService.getCategories(), 
    products: storeService.getProducts()      
  }).pipe(
    map((data: { categories: Category[], products: Product[]}) => ({
      categories: data.categories,
      products: data.products
    }))
  );
};
