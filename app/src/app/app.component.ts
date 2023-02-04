import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    const baseUrl = environment.apiUrl;
    this.httpClient
      .get<any>(`${baseUrl}/api/_token`)
      .subscribe(({ _token }) => {
        localStorage.setItem("_csrf", _token);
      });
  }
}
