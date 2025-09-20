import { Routes } from '@angular/router';
import { AuthGuard } from './Authentication/services/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent, 
    //canActivate: [AuthGuard] 
    },
  { path: 'admin', component: AdminComponent, 
    canActivate: [AuthGuard] 
    }
];
