import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@e-commerce/products';
import { CartItemsDetail } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],

})
export class CartPageComponent implements OnInit {
   cartItemsDetail:CartItemsDetail[]=[];
   cartCount=0;
  constructor(private orderService:OrdersService,private router:Router,private cartService:CartService) {}

  ngOnInit(): void {
    this._getcart();
    
  }

  backToShop(){
    this.router.navigate(['/products'])

  }

  deleteCart(cartItem:CartItemsDetail){
    this.cartService.deleteCrtItem(cartItem.product.id);

    
  }

  private _getcart(){
    this.cartService.cart$.pipe().subscribe((respCart)=>{
      this.cartItemsDetail=[];
      this.cartCount=respCart.items?.length ?? 0;
      respCart.items?.forEach((cartItem:any)=>{
        this.orderService.getProduct(cartItem.productId).subscribe((product)=>{
         this.cartItemsDetail.push({
          product:product,
          quantity:cartItem.quantity,
         
          
         })
         

        })

      })
    });
  }

  updateCartQuantity(event:any,cartItem:CartItemsDetail){
    this.cartService.setCartItem(
      {
      productId:cartItem.product.id,
      quantity:event.value
    },
    true
    )
  }
}
