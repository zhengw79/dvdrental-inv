import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AddressService } from '../../../../app/services/address.service';

@Component({
  selector: 'app-customer-search-address',
  templateUrl: './search.address.component.html',
  styleUrls: ['./search.address.component.css']
})
export class SearchAddressComponent implements OnInit {

  fg_search: FormGroup;
  fg_address: FormGroup;

  addresses: any = [];
  search_after?: number;

  @ViewChild("address_list") address_list?: ElementRef<HTMLDivElement>;

  $: any;

  constructor(
    private addressService: AddressService
  ) {
    this.fg_search = new FormGroup({
      search_txt: new FormControl("")
    });

    // @ts-ignore
    this.$ = window.jQuery;
    this.fg_address = new FormGroup({
      address_id: new FormControl()
    });
  }

  ngOnInit(): void { }

  async ngAfterViewInit() { }

  get search_txt() {
    return this.fg_search.get("search_txt");
  }

  async onSubmit() {
    this.addresses = [];
    this.search_after = 0;
    await this.fetchAddress();
  }

  async onScroll() {
    await this.fetchAddress();
  }

  async fetchAddress() {
    const { data } = await this.addressService.retrieveScrollAddressES({
      query: this.search_txt?.value,
      size: 5,
      search_after: this.search_after ?? 0
    });

    if (data) {
      this.addresses = this.addresses.concat(data);
      this.search_after = data[data.length - 1].address_id;
    }
  }

  selected(e: any) {
    console.log(this.fg_address.value);
  }
}
