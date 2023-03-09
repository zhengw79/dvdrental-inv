import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-search-store',
  templateUrl: './search.store.component.html',
  styleUrls: ['./search.store.component.css']
})
export class SearchStoreComponent implements OnInit {

  fg_search: FormGroup;
  fg_store: FormGroup;

  stores: any = [];
  search_after?: number;
  $:any;

  @Output("evt_updateStoreId") evt_updateStoreId: EventEmitter<number>;

  constructor(
    private storeService: StoreService
  ) {
    this.fg_search = new FormGroup({
      search_txt: new FormControl("")
    });
    this.fg_store = new FormGroup({
      store_id: new FormControl()
    });

    //@ts-ignore;
    this.$ = window.jQuery;

    this.evt_updateStoreId = new EventEmitter<number>;
  }

  ngOnInit(): void {
  }

  get search_txt() {
    return this.fg_search.get("search_txt");
  }

  async onSubmit() {
    this.stores = [];
    this.search_after = 0;
    await this.fetchStores();
  }

  async fetchStores() {
    const { data } = await this.storeService.retrieveScrollStoreEs({
      query: this.search_txt?.value,
      size: 5,
      search_after: this.search_after?? 0
    });

    if (data) {
      this.stores = this.stores.concat(data);
      this.search_after = data[data.length - 1].store_id;
    }
  }

  async onScroll() {
    await this.fetchStores();
  }

  selected(e: any) {
    this.evt_updateStoreId.emit(this.stores.find((store: any) => store.store_id === this.fg_store.value.store_id));
  }
}
