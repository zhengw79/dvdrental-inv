import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  staff: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.httpClient
      .get<any>('api/auth/logout')
      .subscribe(data => {
        console.log(data);
        if (data.status === 'ok') {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      });
  }

  onSubmit(data:any) {}
}
