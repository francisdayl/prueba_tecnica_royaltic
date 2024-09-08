import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductFull } from '../../interfaces/store';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  public selectedProduct: ProductFull | undefined;
  public relatedProducts:ProductFull[] = [];

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.selectedProduct = data.product;
      this.relatedProducts = data.related_products;
    })
  }


}
