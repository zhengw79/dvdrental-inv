import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'AuthLayout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  @ContentChild('child') child?: TemplateRef<any>;

  ngOnInit(): void {
  }

}
