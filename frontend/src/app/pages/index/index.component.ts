import { Component, Input, OnInit, inject } from '@angular/core';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from '../../interfaces/store'

// TODO: add pagination

@Component({
  selector: 'app-index',
  standalone: true,
  imports:[MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  public categoryList:Category[] = [];
  public filteredProducts: Product[] = [];
  public productList:Product[] = [];
  selectedCategory = new FormControl<Category[]>([]);
  selectedSortCriteria = new FormControl<string>("0");

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.categoryList = data.categories;
      this.productList = data.products;
      this.filteredProducts = data.products;
    })
    

    this.selectedCategory.valueChanges.subscribe((values) => this.filterByCategories(values || []));
    this.selectedSortCriteria.valueChanges.subscribe((value) => this.applySorting(value || "0"));
  }

  get formattedCategories(): string {
    const value: Category[] = this.selectedCategory.value || [];
    if (!value || !value.length) {
      return '';
    }
    return value.map(x=>x.name).join(', ');
  }


  filterByCategories(values:Category[]): void {
    if(values.length==0){
      this.filteredProducts = [...this.productList];
    }
    else{
      const setValues = new Set(values.map(x=>x.id));
      this.filteredProducts = this.filteredProducts.filter((product: Product) => (product.category.filter(x=>setValues.has(x))).length>0 ); 
    }
  }

  applySorting(type:string): void {
    console.log(type);
    const sortField: { [key: string]: keyof Product } = {"1":"name","2":"name","3":"price","4":"price"};
    const sortCriteria = sortField[type];
    if(type=="0"){
      this.filteredProducts = [...this.productList];
    }
    else if(type=="1" || type=="3"){
      this.filteredProducts = this.filteredProducts.sort((a:Product, b:Product) => {
        let a_value = a[sortCriteria];
        let b_value = b[sortCriteria];
        if(typeof a_value === "string" && typeof b_value === "string" && sortCriteria==="price"){
          a_value = parseFloat(a_value);
          b_value = parseFloat(b_value);
        }
        if ( a_value < b_value) return -1;
        if (a_value >  b_value) return 1;
        return 0;
      });

    }
    else if(type=="2" || type=="4"){
      this.filteredProducts = this.filteredProducts.sort((a:Product, b:Product) => {
        let a_value = a[sortCriteria];
        let b_value = b[sortCriteria];
        if(typeof a_value === "string" && typeof b_value === "string" && sortCriteria==="price"){
          a_value = parseFloat(a_value);
          b_value = parseFloat(b_value);
        }
        if ( a_value < b_value) return 1;
        if (a_value >  b_value) return -1;
        return 0;
      });
    }
  }

  navigateTo(id:number){
    this.router.navigate([`/product/${id}`]);
  }

}
