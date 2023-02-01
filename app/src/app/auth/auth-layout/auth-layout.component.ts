import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'AuthLayout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  @ContentChild('child') child?: TemplateRef<any>;

  ngOnInit(): void {
  }

}
