import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService,Category } from '@e-commerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit,OnDestroy {
  products: Product[] = [];
  endsubs$:Subject<any> = new Subject();
  constructor(private productService:ProductsService,
    private router:Router,
    private confirmationService:ConfirmationService,
    private messageService:MessageService
    ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
      this.endsubs$.complete();
  }

 
  deleteProduct(productId: string){
    this.confirmationService.confirm({
      message: 'Do you want delete this product?',
      header: 'Delete product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted',
            });
          }
        );
      },
     
    });
    

  }

  updateProduct(productId: string){
    this.router.navigateByUrl(`products/form/${productId}`)

  }

  updateGallery(productId: string){
    this.router.navigateByUrl(`gallery/${productId}`)

  }

  private getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe((prod) => {
      this.products = prod;
    });

  }

  
}
