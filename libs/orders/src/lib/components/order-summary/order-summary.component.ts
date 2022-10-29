import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit,OnDestroy {
  totalPrice:any;
  endSubs$:Subject<any> = new Subject();
  isCheckout=false;
  constructor(private router:Router,private cartService:CartService,private orderService:OrdersService) {
    this.router.url.includes('checkout') ?  this.isCheckout=true : this.isCheckout=false;
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
   
    this.endSubs$.complete();
      
  }

  _getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart=>{
      this.totalPrice=0;
      if(cart){
        cart.items?.map((item:any)=>{
          this.orderService.getProduct(item.productId)
          .pipe(take(1)).subscribe((product)=>{
            this.totalPrice += product.price * item.quantity
          })
        })
      }
    })
  }

  navigatetocheckout(){
    this.router.navigate(['/checkout'])
  }
}
