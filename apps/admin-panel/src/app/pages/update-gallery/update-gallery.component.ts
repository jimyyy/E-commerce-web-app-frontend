import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from '@e-commerce/products';

@Component({
  selector: 'admin-update-gallery',
  templateUrl: './update-gallery.component.html',
  styles: [],
})
export class UpdateGalleryComponent implements OnInit {
  addimages!: FormGroup;
  productId!: string;

  displayMultipleImages!: boolean;
  displayMultipleImageArray!: Array<any>;
  multipleImages: any = [];
  images: any;

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,

    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.displayMultipleImageArray = [];
    this.displayMultipleImages = false;
  }

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.productId = params['id'];
      }
    });
  }

  private initForm() {
    this.addimages = this.formBuilder.group({
      images: ['', Validators.required],
    });
  }
  get imagesAdded(){
    return this.addimages.controls
  }

  selectFiles(event: any) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onMultipleSubmit() {
    if (this.multipleImages.length===0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Images is not uploaded',
      });
    }
    else{
      this.productService
      .addGallery(this.multipleImages, this.productId)
      .subscribe((img) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Images are uploaded`,
        });
      });

    }

   
  }
}
