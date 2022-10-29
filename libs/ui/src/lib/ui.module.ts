import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
  },
]

@NgModule({
  imports: [CommonModule, ButtonModule,RouterModule.forChild(routes)],
  declarations: [BannerComponent, SliderComponent, GalleryComponent],
  exports: [BannerComponent, SliderComponent, GalleryComponent],
})
export class UiModule {}
