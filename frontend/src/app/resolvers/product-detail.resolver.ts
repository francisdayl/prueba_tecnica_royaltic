import { ResolveFn } from '@angular/router';
import { Category, Product, ProductFull } from '../interfaces/store';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs'; 
import { StoreService } from '../services/store.service';


export const productDetailResolver: ResolveFn<{ product: ProductFull, related_products: ProductFull[] }> = (route, state) => {
  const storeService = inject(StoreService); 
  const productId = route.params['id'];
  
  return forkJoin({
    product: storeService.getProductFull(productId),         
    related_products: storeService.getRelatedProducts(productId)
  }).pipe(
    map((data: { product: ProductFull, related_products: ProductFull[] }) => ({
      product: data.product,
      related_products: data.related_products
    }))
  );
};
