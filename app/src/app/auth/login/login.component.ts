import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { BLOCK_CSS } from 'src/app/constants';
import { environment } from "src/environments/environment";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginFormModel: FormGroup;
	verified_url?: string;
	$: any;

	constructor(
		private httpClient: HttpClient,
		private _router: Router
	) {
		this.loginFormModel = new FormGroup({
			email: new FormControl('wuwlacoj@veldit.il', [Validators.required, Validators.email]),
			password: new FormControl('12345678', [Validators.required]),
			remember_me: new FormControl('')
		});

		// @ts-ignore
		this.$ = window.jQuery;
	}

	ngOnInit(): void {}

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

		this.httpClient.post<any>("api/auth/login", this.loginFormModel.value).subscribe({
			next: resp => {
				localStorage.setItem("access_token", resp.access_token);
				localStorage.setItem("remember_token", resp.remember_token);
				this._router.navigate(["/dashboard"]);
			},
			error: (resp: HttpErrorResponse) => {
				const {error: { response: { statusCode, message }}} = resp;
				if (statusCode === 401) {
					if (/email_unverified;\d+/.test(message)) {
						const msgs = message.split(";");
						this.verified_url = `/verify-email/${msgs[1]}`;
						this.email?.setErrors({ "email_unverified": true });
					} else if (message === "credential_invalid") {
						this.email!.setErrors({ "credential_invalid": true });
					} else {
						this.email!.setErrors({ "not_found": true });
					}
				} else if (statusCode === 429) {
					this.email!.setErrors({ "too_many_tries": true });
				}
				this.$("#loginForm").unblock();
			},
			complete: () => {
				this.$("#loginForm").unblock();
			}
		});
	}
}
