import {Component, inject, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router, RouterOutlet, RouterLink } from '@angular/router';
import { ProductFull } from '../../interfaces/store';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
 

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterLink,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})


export class AdminProductComponent implements OnInit{
  displayedColumns: string[] = ['name', 'description', 'price', 'categories','actions'];
  dataSource: ProductFull[]= [];
  
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  constructor(private storeService: StoreService,private activatedRoute: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data })=>{this.dataSource = data})
  }

  @ViewChild(MatTable) table!: MatTable<ProductFull>;

  removeProduct(productId: number): void {
    this.storeService.deleteProduct(productId).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter((elem) => elem.id !== productId);
        this.table.renderRows();  
        this.openSnackBar("Producto Eliminado Exitosamente","OK");
      },
      error: (err) => {
        this.openSnackBar("Error eliminando Producto","OK");

      }
    });
  }
  

  
}
