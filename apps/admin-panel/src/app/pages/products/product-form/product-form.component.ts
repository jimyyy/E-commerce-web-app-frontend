import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, Product, ProductsService } from '@e-commerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductFormComponent implements OnInit {
  editmode=false;
  addproducts!: FormGroup;
  isSubmitted=false;
  categories:Category[] = [];
  imageDisplay:any;
  currentProductId!: string;
 
  constructor(private formbuilder:FormBuilder,
    private categoriesService:CategoriesService,
    private messageService:MessageService,
    private location:Location,
    private productService:ProductsService,
    private route :ActivatedRoute) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.checkEditMode();
  }

  get productForm() {
    return this.addproducts.controls;
  }
  onSubmit(){
    this.isSubmitted=true;
    if(this.addproducts.invalid){
      return;
    }
    
    const productFormData=new FormData();
    Object.keys(this.productForm).map((key)=>productFormData.append(key, this.productForm[key].value));
    
   
     if (this.editmode) {
       this.updateproduct(productFormData);
     } else {
       this.addProduct(productFormData);
     }
    

  }

  private getCategories(){
    this.categoriesService.getCategories().subscribe(categories=>{
      this.categories = categories;
    })

  }

  private addProduct(productFormData:FormData){
    this.productService.createProduct(productFormData).subscribe(
      (product:Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product  ${product.name} is created`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created',
        });
      }
    );

  }

  private initForm(){
    this.addproducts = this.formbuilder.group({
   
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: ['', Validators.required],
      image:['',Validators.required],
      isFeatured:[false]
    });
 
  }

  onImageUpload(event:any){
    const file = event.target.files[0];
    if(file){
      this.addproducts.patchValue({image:file});
      this.addproducts.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader;
      fileReader.onload=()=>{
        this.imageDisplay = fileReader.result;
      }

      fileReader.readAsDataURL(file);
    }


  }

  private checkEditMode(){
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productService
          .getProduct(params['id'])
          .subscribe((product) => {
            this.productForm['name'].setValue(product.name);
            this.productForm['brand'].setValue(product.brand);
            this.productForm['price'].setValue(product.price);
            this.productForm['category'].setValue(product.category?._id);
            this.productForm['countInStock'].setValue(product.countInStock);
            this.productForm['description'].setValue(product.description);
            this.productForm['richDescription'].setValue(product.richDescription);
            this.productForm['image'].setValue(product.image);
            this.productForm['isFeatured'].setValue(product.isFeatured);
            this.imageDisplay=product.image;
            this.productForm['image'].setValidators([]);
            this.productForm['image'].updateValueAndValidity();
          });
      }
    });

  }

  private updateproduct(productFormData: FormData) {
    this.productService.updateProduct(productFormData,this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated',
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not updated',
        });
      }
    );
  }

  onCancle() {
    this.location.back();
  }
}
