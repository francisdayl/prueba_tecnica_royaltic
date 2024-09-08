import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminCategoryDetailComponent } from './pages/admin-category-detail/admin-category-detail.component';
import { AdminProductDetailComponent } from './pages/admin-product-detail/admin-product-detail.component';
import { AdminCategoryComponent } from './pages/admin-category/admin-category.component';
import { AdminProductComponent } from './pages/admin-product/admin-product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { indexResolver } from './resolvers/index.resolver';

export const routes: Routes = [
    { path: '',      component: IndexComponent, resolve: { data: indexResolver } },
    { path: 'admin',      component: AdminComponent },
    { path: 'admin-category/id',      component: AdminCategoryDetailComponent },
    { path: 'admin-product/id',      component: AdminProductDetailComponent },
    { path: 'admin-category',      component: AdminCategoryComponent },
    { path: 'admin-product',      component: AdminProductComponent },
    { path: 'product',      component: AdminProductComponent },
    { path: 'product/:id',      component: ProductDetailComponent },
    { path: '**',      component: NotFoundComponent }

];
