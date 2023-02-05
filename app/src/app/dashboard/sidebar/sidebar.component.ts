import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public currentModule: string;
  public currentLink?: string;
  public url: string;

  constructor(private router: Router) {
    this.url = router.url;
    this.currentModule = this.url.split("/")[1];
    this.currentLink = this.url.split("/").slice(-1).pop();
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.url = val.url;
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // @ts-ignore;
    let $ = window.jQuery;

    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e: any) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });
  }
}
