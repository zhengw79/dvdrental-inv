import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify.email/verify.email.component';

const routes: Routes = [
  {
    "path": "",
    "component": AuthComponent,
    "children": [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "verify-email/:id", component: VerifyEmailComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
