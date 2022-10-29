import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@e-commerce/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html',
  styles: [],
})
export class OrderListComponent implements OnInit,OnDestroy {
  orders: Order[] = [];
  orderStatus:any = ORDER_STATUS;
  endsubs$:Subject<any> = new Subject();
  constructor(private orderService:OrdersService,
    private router:Router,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) {}

  ngOnInit(): void {
    this.getOrders(); }
    ngOnDestroy(): void {
        this.endsubs$.complete();
    }
  deleteOrder(orderId: string){
    this.confirmationService.confirm({
      message: 'Do you want delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe(
          () => {
            this.getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted',
            });
          }
        );
      },
     
    });

  }

  showOrder(orderId: string){
    this.router.navigateByUrl(`orders/${orderId}`)

  }

  private getOrders(){
    this.orderService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe((ords) => {
      this.orders = ords;
    });

  }
}
