import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@e-commerce/users';
import { ActionsSubject } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { ORDER_STATUS } from '../../order.constants';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit,OnDestroy {
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  ensubs$ : Subject<any> = new Subject();
  orderItems:any;
  userId!: string;
  countries: any = [];
  
  constructor(
    private usersService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordService:OrdersService,
    
  ) {}

  ngOnInit(): void {
   
    this.initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this.getCountries();
 

  }

  ngOnDestroy(){
    //this.ensubs$.next();
    this.ensubs$.complete();
  }

  backtocart() {
    this.router.navigate(['/cart']);
  }

  private initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],

      country: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
    });
  }


   private _autoFillUserData(){
     this.usersService.observeCurrentUser().pipe(takeUntil(this.ensubs$)).subscribe(user=>{
     
      if(user){
        
        this.userId = user.id
        this.checkoutForm['name'].setValue(user.name);
        this.checkoutForm['email'].setValue(user.email);
        this.checkoutForm['phone'].setValue(user.phone);
        this.checkoutForm['city'].setValue(user.city);
        this.checkoutForm['country'].setValue(user.country);
        this.checkoutForm['zip'].setValue(user.zip);
        this.checkoutForm['apartment'].setValue(user.apartment);
        this.checkoutForm['street'].setValue(user.street);


      }

     })
   }

  private _getCartItems() {
    
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status:"Pending",
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };


    this.ordService.createOrder(order).subscribe(()=>{
      this.cartService.emptyCart();
      this.router.navigate(['/success']);
  
      
    })
  }

  private getCountries() {
    this.countries = this.usersService.getCountries();
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  
}
