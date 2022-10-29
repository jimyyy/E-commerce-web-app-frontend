import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@e-commerce/orders';
import { ProductsService } from '@e-commerce/products';
import { UsersService } from '@e-commerce/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  statistics:any=[];
  constructor(private orderService:OrdersService,private productService:ProductsService,private userServive:UsersService) {}

  ngOnInit(): void {
    combineLatest([
      this.orderService.getOrderCount(),
      this.productService.getProductCount(),
      this.userServive.getUsersCount(),
      this.orderService.getTotalSales()
    ]).subscribe((values)=>{
      this.statistics=values;
    })
    
  }
}
