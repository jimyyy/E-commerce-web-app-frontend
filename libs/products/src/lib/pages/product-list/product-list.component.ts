import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  products:Product[]=[];
  categories:Category[]=[];
  isCategoryPage?:boolean;
  constructor(private route:ActivatedRoute,private prodService:ProductsService,private catService:CategoriesService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params=>{
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid']  ? this.isCategoryPage = true : this.isCategoryPage = false;
    }))

    this._getCategories();
  }

  private _getProducts(categoriesFilter?:string[]){
    this.prodService.getProducts(categoriesFilter).subscribe(prods=>{
      this.products=prods;
    })
  }

  private _getCategories(){
    this.catService.getCategories().subscribe(cats=>{
      this.categories=cats;
    })
  }

  categoryFilter(){
    const selectedCategories:any=this.categories.filter(category=>category.checked).map((category)=>category._id)

     this._getProducts(selectedCategories);
  }
}
