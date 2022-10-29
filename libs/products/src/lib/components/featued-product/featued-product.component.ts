import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'featued-product',
  templateUrl: './featued-product.component.html',
  styles: [],
})
export class FeatuedProductComponent implements OnInit {
  products:Product[]=[];
  constructor(private prodService:ProductsService) {}

  ngOnInit(): void {
    this.prodService.getFeaturedProducts(4).subscribe(prod=>{
      this.products=prod;
    })
  }
}
