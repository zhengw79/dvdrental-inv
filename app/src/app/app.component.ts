import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) { }

  ngOnInit() {
    // this.httpClient
    //   .get<any>(`api/_token`)
    //   .subscribe(({ _token }) => {
    //     localStorage.setItem("_csrf", _token);
    //   });
    // if (localStorage.getItem("remember_token")) {
    //   this._router.navigate(['/main']);
    // }
  }
}
