import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BLOCK_CSS } from 'src/app/constants';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormModel: FormGroup;
  $: any;

  constructor(
    private httpClient: HttpClient
  ) {
    this.loginFormModel = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember_me: new FormControl('')
    });

    // @ts-ignore
    this.$ = window.jQuery;
  }

  ngOnInit(): void {
    const baseUrl = environment.apiUrl;
    this.httpClient.get<any>(`${baseUrl}/api/_token`).subscribe(data => {
      console.log(data);
    });
  }

  get email() {
    return this.loginFormModel.get("email");
  }

  get password() {
    return this.loginFormModel.get("password");
  }

  onSubmit() {
    if (this.loginFormModel.invalid) {
      this.loginFormModel.markAllAsTouched();
      return;
    }

    this.$('#loginForm').block({
      message: null,
      css: BLOCK_CSS
    });
  }
}
