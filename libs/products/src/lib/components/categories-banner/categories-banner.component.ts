import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-vategories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [],
})
export class CategoriesBannerComponent implements OnInit,OnDestroy {
  categories:Category[]=[];
  endSubs$:Subject<any>=new Subject;
  constructor(private categoriesService:CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(cates=>{
      this.categories=cates;
      console.log(this.categories);
      
    })
  }

  ngOnDestroy(): void {
    
    this.endSubs$.complete();
      
  }
}
