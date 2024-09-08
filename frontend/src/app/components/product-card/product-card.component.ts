import { Component, Input } from '@angular/core';
import { ProductFull } from '../../interfaces/store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: ProductFull;
  @Input() height!: number;
  @Input() width!: number;
}
