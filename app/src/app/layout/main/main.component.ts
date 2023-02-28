import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ContentChild('child') child?: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
