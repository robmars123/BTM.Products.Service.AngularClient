import { Routes } from '@angular/router';
import { AuthGuard } from './../Authentication/services/auth.guard';
import { ProductsComponent } from './../components/products/product-list/products.component';
import { AdminComponent } from './../components/admin/admin.component';
import { ProductDetailsComponent } from '../components/products/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent, 
    //canActivate: [AuthGuard] 
    },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'admin', component: AdminComponent, 
    canActivate: [AuthGuard] 
    }
];
