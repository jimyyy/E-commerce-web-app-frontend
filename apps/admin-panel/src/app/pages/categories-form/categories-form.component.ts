import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@e-commerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit {
  addcategories!: FormGroup;
  isSubmitted=false;
  editmode = false;
  currentCategoryId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addcategories = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color:['#fff']
    });

    this.checkEditMode();
  }
  get categoryForm() {
    return this.addcategories.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.addcategories.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      id: this.currentCategoryId,
      color:this.categoryForm['color'].value
    };
    if (this.editmode) {
      this.updatecategory(category);
    } else {
      this.addcategory(category);
    }
  }

  private updatecategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated',
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
          detail: 'Category is not updated',
        });
      }
    );
  }

  private addcategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (category:Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category  ${category.name} is created`,
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
          detail: 'Category is not created',
        });
      }
    );
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService
          .getCategory(params['id'])
          .subscribe((category) => {
            this.categoryForm['name'].setValue(category.name);
            this.categoryForm['icon'].setValue(category.icon);
            this.categoryForm['color'].setValue(category.color);
          });
      }
    });
  }
}
