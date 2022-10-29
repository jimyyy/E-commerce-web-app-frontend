import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'libs/orders/src/lib/models/cart';
import { CartService } from 'libs/orders/src/lib/services/cart.service';
import { MessageService } from 'primeng/api';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './produit-item.component.html',
  styles: [],
})
export class ProduitItemComponent implements OnInit {
  @Input() product:any=Product;
  constructor(private cartService:CartService,private messageService: MessageService) {}

  ngOnInit(): void {}

  addProductToCart(){
    const cartItem : CartItem={
      productId:this.product.id,
      quantity:1
    }
    this.cartService.setCartItem(cartItem);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Product added to cart'});

  }
}
