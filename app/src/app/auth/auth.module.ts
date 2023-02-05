import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify.email/verify.email.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    VerifyEmailComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
