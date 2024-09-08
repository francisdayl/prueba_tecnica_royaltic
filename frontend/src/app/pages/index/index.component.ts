import { Component, Input, OnInit, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { StoreService } from '../../services/store.service'
import { Router } from '@angular/router';
import { Category } from '../../interfaces/store'


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  private storeService = inject(StoreService);
  public categoryList:Category[] = [];

  getCategories(){
    this.storeService.getCategories().subscribe({
      next:(data)=>{
        console.log(data)
        if(data.length > 0){
          this.categoryList = data;
        }
        
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){

    this.getCategories();
  }

}
