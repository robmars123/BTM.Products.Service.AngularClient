import { Routes } from '@angular/router';
import { AuthGuard } from '../Core/Authentication/services/auth.guard';
import { AdminComponent } from '../Features/components/admin/admin.component';
import { ProductDetailsComponent } from '../Features/components/products/product-details/product-details.component';
import { ProductsComponent } from '../Features/components/products/product-list/products.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent, 
    //canActivate: [AuthGuard] 
    },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'admin', component: AdminComponent, 
    canActivate: [AuthGuard] 
    }
];
