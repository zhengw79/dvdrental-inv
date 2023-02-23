import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'Dashboard',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ContentChild('child') child?: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
