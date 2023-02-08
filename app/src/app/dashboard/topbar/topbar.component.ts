import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  staff: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.httpClient.get("api/auth/loggedin").subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {},
      complete: () => { }
    });
  }

  logout() {
    this.httpClient
      .get<any>('api/auth/logout')
      .subscribe(data => {
        if (data.status === 'ok') {
          localStorage.clear();
          this.apollo.client.resetStore();
          this.router.navigate(['/login']);
        }
      });
  }

  onSubmit(data: any) { }
}
