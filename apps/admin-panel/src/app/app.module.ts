import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './pages/shell/shell.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesService } from '@e-commerce/products';
import { CategoriesFormComponent } from './pages/categories-form/categories-form.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { DividerModule } from 'primeng/divider';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';
import { JwtInterceptor, UsersModule } from '@e-commerce/users';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { UpdateGalleryComponent } from './pages/update-gallery/update-gallery.component';
import {FileUploadModule} from 'primeng/fileupload'

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    ProductListComponent,
    ProductFormComponent,
    UserListComponent,
    UserFormComponent,
    OrderListComponent,
    OrderDetailComponent,
    ContactListComponent,
    UpdateGalleryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    DropdownModule,
    InputSwitchModule,
    InputTextareaModule,
    EditorModule,
    DividerModule,
    FieldsetModule,
    InputMaskModule,
    TagModule,
    UsersModule,

    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FileUploadModule
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
