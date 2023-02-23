import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify.email/verify.email.component';



@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    AuthComponent,
    RegisterComponent,
    VerifyEmailComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
