import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@e-commerce/users';
import { CategoriesFormComponent } from './pages/categories-form/categories-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ShellComponent } from './pages/shell/shell.component';
import { UpdateGalleryComponent } from './pages/update-gallery/update-gallery.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
    {
      path: '',
      component: ShellComponent,
      canActivate:[AuthGuard],
      children: [
        {
          path: '',
          component: DashboardComponent,
        },
        {
          path: 'categories',
          component: CategoriesComponent,
        },
        {
          path: 'categories/form',
          component: CategoriesFormComponent,
        },
        {
          path: 'categories/form/:id',
          component: CategoriesFormComponent,
        },
        {
          path: 'products',
          component: ProductListComponent,
        },
        {
          path: 'products/form',
          component: ProductFormComponent,
        },
        {
          path: 'products/form/:id',
          component: ProductFormComponent,
        },
        {
          path: 'users',
          component: UserListComponent,
        },
        {
          path: 'users/form',
          component: UserFormComponent,
        },
        {
          path: 'users/form/:id',
          component: UserFormComponent,
        },
        {
          path: 'orders',
          component: OrderListComponent,
        },
        {
          path: 'orders/:id',
          component: OrderDetailComponent,
        },
        {
          path: 'contactList',
          component: ContactListComponent,
        },

        {
          path: 'gallery/:id',
          component: UpdateGalleryComponent,
        },

      ],
    },
    {
        path:'**',
        redirectTo : '',
        pathMatch:'full'

    }
  ];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
