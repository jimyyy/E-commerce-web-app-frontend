import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styles: [],
})
export class GalleryComponent implements OnInit {
  selectedImage?:string;
  @Input() images:any;

  constructor() {}

  ngOnInit(): void {
    if(this.hasImages){
      this.selectedImage=this.images[0]

    }
    
  }
  changeSelectedImage(image:string){
    this.selectedImage=image;

  }

  get hasImages() {
    return this.images?.length > 0;
  }

  
}
