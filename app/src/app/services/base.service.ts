import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
	constructor(
    protected apollo: Apollo,
    protected router: Router
  ) { }

	redirectToLoginIfError(errors: any) {
		if (errors && errors[0] && errors[0].message === "Unauthorized") {
      this.router.navigate(["/auth/login"]);
    }
	}
}