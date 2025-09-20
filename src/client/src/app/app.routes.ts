import { Routes } from '@angular/router';
import { AuthGuard } from './Authentication/services/auth.guard';
import { ProductsComponent } from './components/products.component/products.component';

export const routes: Routes = [
  { 
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard] // ✅ guard applied here
  }
];
