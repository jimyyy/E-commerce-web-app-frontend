import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/v1/orders');
  }

    getOrder(OrderId:string): Observable<Order> {
      return this.http.get<Order>(`http://localhost:3000/api/v1/orders/${OrderId}`);
    }

    createOrder(order: Order):Observable<Order>{
      return this.http.post<Order>('http://localhost:3000/api/v1/orders',order)
    }

    deleteOrder(orderId:string):Observable<Object>{
     return this.http.delete<Object>(`http://localhost:3000/api/v1/orders/${orderId}`);
  }

    updateOrder(orderStatus:{status:string},orderId:string):Observable<Order>{
      return this.http.put<Order>('http://localhost:3000/api/v1/orders/'+orderId,orderStatus);
    }

    getOrderCount():Observable<{orderCount:number}>{
      return this.http.get<{orderCount:number}>('http://localhost:3000/api/v1/orders/get/count').pipe();
    }

    getTotalSales():Observable<{totalsales:number}>{
      return this.http.get<{totalsales:number}>('http://localhost:3000/api/v1/orders/get/totalsales').pipe();
    }

    getProduct(productId:string): Observable<any> {
      return this.http.get<any>(`http://localhost:3000/api/v1/products/${productId}`);
    }
}
