import {Component, inject, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router, RouterOutlet, RouterLink } from '@angular/router';
import { Category } from '../../interfaces/store';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
 
@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterLink,MatFormFieldModule, MatInputModule, MatButtonModule],

  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: Category[]= [];
  
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  constructor(private storeService: StoreService,private activatedRoute: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data })=>{
      this.dataSource = data})
  }

  @ViewChild(MatTable) table!: MatTable<Category[]>;

  removeCategory(categoryId: number): void {
    this.storeService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter((elem) => elem.id !== categoryId);
        this.table.renderRows();  
        this.openSnackBar("Category Eliminado Exitosamente","OK");
      },
      error: (err) => {
        this.openSnackBar("Error eliminando Category","OK");

      }
    });
  }


}
