import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@e-commerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit,OnDestroy {
  categories: Category[] = [];
  endsubs$:Subject<any> = new Subject();
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  
  }

  ngOnDestroy(): void {
    
    this.endsubs$.complete();
      
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this.getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted',
            });
          }
        );
      },
     
    });
  }
   private getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((cats) => {
      this.categories = cats;
    });
  }
  updateCategory(categoryId:string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)

  }
}
