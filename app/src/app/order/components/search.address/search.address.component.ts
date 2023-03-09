import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  @ViewChild("address_list") address_list?: ElementRef<HTMLDivElement>;
  @Output("evt_updateAddressId") evt_updateAddressId: EventEmitter<number>;

  addresses: any = [];
  search_after?: number;
  $: any;

  constructor(
    private addressService: AddressService
  ) {
    this.fg_search = new FormGroup({
      search_txt: new FormControl("")
    });
    this.fg_address = new FormGroup({
      address_id: new FormControl()
    });

    // @ts-ignore
    this.$ = window.jQuery;
    this.evt_updateAddressId = new EventEmitter<number>;
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

  selected(_: any) {
    this.evt_updateAddressId.emit(this.fg_address.value);
  }
}
