import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProduitItemComponent } from './components/produit-item/produit-item.component';
import { FeatuedProductComponent } from './components/featued-product/featued-product.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { UiModule } from '@e-commerce/ui';
import {ToastModule} from 'primeng/toast';
const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'category/:categoryid',
    component: ProductListComponent,
  },
  {
    path: 'products/:productid',
    component: ProductDetailComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    ToastModule
    

  ],
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProduitItemComponent,
    FeatuedProductComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
  exports: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProduitItemComponent,
    FeatuedProductComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
})
export class ProductsModule {}
