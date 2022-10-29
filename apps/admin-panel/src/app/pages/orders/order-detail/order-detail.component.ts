import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@e-commerce/orders';

import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [],
})
export class OrderDetailComponent implements OnInit {
  order?:any=Order;
  orderstatues:any=[];
  selectedstatus:any;

  constructor(private orderService:OrdersService,private route:ActivatedRoute,private messageService:MessageService) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

   onStatusChange(event:any){
    this.orderService.updateOrder({status:event.value},this.order.id).subscribe(order=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order is updated',
      });

    },()=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Order is not updated',
      });
      
    })

  }

  private _mapOrderStatus(){
    this.orderstatues=Object.keys(ORDER_STATUS).map((key)=>{
      return{
        id:key,
        name: ORDER_STATUS[key].label
      };
    })

  }

  private _getOrder(){
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.orderService.getOrder(params['id']).subscribe(order=>{
          this.order=order;
          
          
        })
      }
    })
  }
}
