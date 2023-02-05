import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BLOCK_CSS } from '../../constants';
// import { Apollo, gql } from 'apollo-angular';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerFormModel: FormGroup;
	$: any;

	constructor(
		// private apollo: Apollo,
		private httpClient: HttpClient,
		private _router: Router
	) {
		this.registerFormModel = new FormGroup({
			first_name: new FormControl('', [
				Validators.required
			]),
			last_name: new FormControl('', [
				Validators.required
			]),
			email: new FormControl('', [
				Validators.required,
				Validators.email
			]),
			username: new FormControl('', [
				Validators.required,
				Validators.maxLength(16)
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			]),
			password2: new FormControl('', [
				Validators.required
			])
		});

		//@ts-ignore
		this.$ = window.jQuery;
	}

	ngOnInit(): void { }

	get first_name() {
		return this.registerFormModel.get('first_name');
	}

	get last_name() {
		return this.registerFormModel.get('last_name');
	}

	get email() {
		return this.registerFormModel.get('email');
	}

	get username() {
		return this.registerFormModel.get('username');
	}

	get password() {
		return this.registerFormModel.get('password');
	}

	get password2() {
		return this.registerFormModel.get('password2');
	}

	onPasswordChange() {
		if (this.password &&
			this.password2 &&
			this.password2.value === this.password.value) {
			this.password2.setErrors(null);
		} else {
			if (this.password2) {
				this.password2.setErrors({ mismatch: true });
			}
		}
	}

	onSubmit() {
		if (this.registerFormModel.invalid) {
			this.registerFormModel.markAllAsTouched();
			return;
		}

		//todo: clean test-log
		this.$('#regForm').block({
			message: null,
			css: BLOCK_CSS
		});

		const payload = this.registerFormModel.value;
		this.httpClient
			.post<any>("api/auth/register", payload)
			.subscribe((result) => {
				if (result.access_token) {
					localStorage.setItem("access_token", result.access_token);
					this._router.navigate(["/main"]);
				} else if (result.status === "failed" &&
					result.code === "staff_email_unique") {
					this.email?.setErrors({ 'DUP_EMAIL': true });
				}
			}, null, () => { this.$("#regForm").unblock(); });
	}
}
