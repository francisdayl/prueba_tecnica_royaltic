import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductFull, Category, Product } from '../../interfaces/store';

import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StoreService } from '../../services/store.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-category-detail',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,],
  templateUrl: './admin-category-detail.component.html',
  styleUrl: './admin-category-detail.component.css'
})
export class AdminCategoryDetailComponent implements OnInit {
  categoryForm!: FormGroup;
  constructor(private fb: FormBuilder,private storeService: StoreService,private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(){
    
    if(this.router.url.endsWith("create")){
      this.categoryForm = this.fb.group({
        id: [null],
        name: ['', Validators.required],
      });
    }
    else{
      this.activatedRoute.data.subscribe(({ data })=>{
        console.log(data)
        console.log(data.name)
        this.categoryForm = this.fb.group({
          id: [data.id],
          name: [data.name, Validators.required],
        });
      })
    }    
  }
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category: Category = this.categoryForm.value;
      if(this.router.url.endsWith("create")){
        this.storeService.createCategory(category).subscribe({
          next: () => {
            this.router.navigate(['admin/category']);
            this.openSnackBar("Categoria Creado Exitosamente","OK");
          },
          error: (err) => {
            this.openSnackBar("Producto no se pudo crear","OK");

          }
        });
      }
      else{
        this.storeService.updateCategory(category).subscribe({
          next: () => {
            this.router.navigate(['admin/category']);
            this.openSnackBar("Cateogoria Editada Exitosamente","OK");
          },
          error: (err) => {
            this.openSnackBar("Categoria no se pudo editar","OK");
    
          }
        });
      }
      

    } else {
      this.openSnackBar("Formulario no se pudo editar","OK");
      this.markFormGroupTouched(this.categoryForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup ) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
