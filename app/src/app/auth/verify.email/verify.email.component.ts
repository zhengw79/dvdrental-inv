import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BLOCK_CSS } from '../../../app/constants';

@Component({
  selector: 'app-verify.email',
  templateUrl: './verify.email.component.html',
  styleUrls: ['./verify.email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  formModel: FormGroup;
  staff_id: number;
  email_sent?: boolean;
  invalid_staff?: boolean;
  $: any;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    this.staff_id = +route.snapshot.paramMap.get("id")!;
    this.email_sent = false;
    this.invalid_staff = false;

    this.formModel = new FormGroup({
      email: new FormControl(
        "",
        [Validators.required, Validators.email])
    });

    // @ts-ignore
    this.$ = window.jQuery;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.$("#emailForm").block({
      message: null,
      css: BLOCK_CSS
    });

    this.httpClient.get(`/api/auth/staff/${this.staff_id}`).subscribe(staff => {
      if (staff) {
        const { email, email_verified_at } = staff as any;
        if (email_verified_at) {
          this._router.navigate(["/login"]);
        } else {
          this.email?.setValue(email);
        }
      } else {
        this.email?.setValue("");
      }
    }, () => { }, () => {
      this.$("#emailForm").unblock();
    });
  }

  get email() {
    return this.formModel.get("email");
  }

  onSubmit() {
    if (this.formModel.invalid) {
      this.formModel.markAllAsTouched();
      return;
    }

    this.$("#emailForm").block({
      message: null,
      css: BLOCK_CSS
    });

    this.httpClient.post<any>("/api/auth/verify", this.formModel.value).subscribe(resp => {
      const { status, code } = resp;
      if (status === "ok" && code === "verified") {
        this._router.navigate(["/login"]);
      } else if (status === "ok" && code === "email_sent") {
        this.email_sent = true;
      } else if (status === "failed" && code === "invalid_email") {
        this.email?.setErrors({ "invalid_email": true });
      }

    }, (err) => { }, () => {
      this.$("#emailForm").unblock();
    });
  }
}
