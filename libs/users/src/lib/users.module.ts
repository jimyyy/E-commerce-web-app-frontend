import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MessageService } from 'primeng/api';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },

  {
    path: 'response-reset-password/:resettoken',
    component: NewPasswordComponent,
  },
  {
    path: 'user-register',
    component: UserRegisterComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    ToastModule,
    CardModule,
    ToolbarModule,
    DropdownModule,
    InputMaskModule
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    UserRegisterComponent,
  ],
  providers: [UsersFacade, MessageService],
})
export class UsersModule {}
