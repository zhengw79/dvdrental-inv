import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  address_id?: number;
  store?: number;

  constructor() {}

  ngOnInit() { }

  async ngAfterViewInit() {}

  onUpdateAddressId(address_id:any) {
    this.address_id = address_id;
  }

  onUpdateStoreId(store: any) {
    this.store = store;
  }
}
