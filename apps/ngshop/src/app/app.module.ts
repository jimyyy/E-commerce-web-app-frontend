import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@e-commerce/ui';
import { ProductsModule } from '@e-commerce/products';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@e-commerce/orders';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UsersModule } from '@e-commerce/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContactComponent } from './shared/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [{ path: '', component: HomePageComponent },
{path:'contact',component:ContactComponent}];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,

    HeaderComponent,
    FooterComponent,
    NavComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ProductsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule,
    OrdersModule,
    UsersModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
   
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
