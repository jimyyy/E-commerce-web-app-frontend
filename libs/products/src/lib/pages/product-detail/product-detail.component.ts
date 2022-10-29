import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@e-commerce/orders';
import { MessageService } from 'primeng/api';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styles: [],
})
export class ProductDetailComponent implements OnInit {
  product?:Product;
  quantity?=1;
  constructor(private prodService:ProductsService,private route:ActivatedRoute,private cartService:CartService,private messageService: MessageService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['productid']){
        this._getProduct(params['productid'])
      }
    })
  }

  private _getProduct(id:string){
    this.prodService.getProduct(id).subscribe(prod=>{
      this.product=prod;
    })


  }

  addProductToCart(){
    
    const cartItem:CartItem={
      productId:this.product?.id,
      quantity:this.quantity
    }
    if(cartItem){
      this.cartService.setCartItem(cartItem);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Product added'});

    }

  
  }
}
