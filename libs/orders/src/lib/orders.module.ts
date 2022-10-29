import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartBadgeComponent } from './components/cart-badge/cart-badge.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard, NgshopAuthGuard } from '@e-commerce/users';
const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    canActivate:[NgshopAuthGuard],
    component: CheckoutPageComponent,
    
  },
  {
    path: 'success',
    component: ThankYouComponent,
  },

];
@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CartBadgeComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
  exports: [
    CartBadgeComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
})
export class OrdersModule {
  constructor(cartServive: CartService) {
    cartServive.initCartLocalStorage();
  }
}
