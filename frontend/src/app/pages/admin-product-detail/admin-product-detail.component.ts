import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductFull, Category, Product } from '../../interfaces/store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StoreService } from '../../services/store.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-admin-product-detail',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,],
  templateUrl: './admin-product-detail.component.html',
  styleUrl: './admin-product-detail.component.css'
})
export class AdminProductDetailComponent implements OnInit {
  productForm!: FormGroup;
  public categoryList: Category[]=[];
  constructor(private fb: FormBuilder,private storeService: StoreService,private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ data })=>{this.categoryList = data})

    if(this.router.url.endsWith("create")){
      this.productForm = this.fb.group({
        id: [null],
        name: ['', Validators.required],
        image: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        category: ['',Validators.required]
      });
    }
    else{
      this.activatedRoute.data.subscribe(({ product })=>{
        this.productForm = this.fb.group({
          id: [product.id],
          name: [product.name, Validators.required],
          image: [product.image, Validators.required],
          description: [product.description, Validators.required],
          price: [product.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
          category: [product.category.map((x:Category)=>x.id),Validators.required]
        });
      })

    }
  }
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  

  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if(this.router.url.endsWith("create")){
        this.storeService.createProduct(product).subscribe({
          next: () => {
            this.router.navigate(['admin/product']);
            this.openSnackBar("Producto Creado Exitosamente","OK");
          },
          error: (err) => {
            this.openSnackBar("Producto no se pudo crear","OK");
    
          }
        });
      }
      else{
        this.storeService.updateProduct(product).subscribe({
          next: () => {
            this.router.navigate(['admin/product']);
            this.openSnackBar("Producto Editado Exitosamente","OK");
          },
          error: (err) => {
            this.openSnackBar("Producto no se pudo editar","OK");
    
          }
        });
      }
      

    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.productForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
}
