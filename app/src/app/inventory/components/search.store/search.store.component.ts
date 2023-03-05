import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { XeditableService } from '../../../services/xeditable.service';
import { StoreService } from '../../../services/store.service';

@Component({
	selector: 'app-search-store',
	templateUrl: './search.store.component.html',
	styleUrls: ['./search.store.component.css']
})
export class SearchStoreComponent implements OnInit, OnDestroy {

	@Input() store_ids: any = [];
	@Input() film_id: any;
	@ViewChild("stores_tbl") stores_tbl?: ElementRef<HTMLTableElement>;

	$: any;
	fg_search: FormGroup;

	constructor(
		private storeService: StoreService,
		private xeditableService: XeditableService
	) {
		this.fg_search = new FormGroup({
			search_txt: new FormControl("")
		});

		// @ts-ignore
		this.$ = window.jQuery;
	}

	ngOnInit(): void { }

	async onSubmit() {

		const { search_txt } = this.fg_search.value;
		const result = await this.storeService.retrieveStoreES(search_txt);

		const data = this.store_ids.length > 0 ? result?.filter((store: any) => this.store_ids.indexOf(store.store_id) < 0) : result;

		const stores_tbl_el = this.stores_tbl?.nativeElement;
		if (this.$.fn.DataTable.isDataTable(stores_tbl_el)) {
			this.$(stores_tbl_el).DataTable().clear();
			this.$(stores_tbl_el).DataTable().destroy();
		}

		this.$(stores_tbl_el).on("draw.dt", (e: any) => {
			const { start, end } = this.$(stores_tbl_el).DataTable().page.info();
			const datasource = this.$(stores_tbl_el).DataTable().data();

			for (let i = start; i < end; i++) {
				this.xeditableService.updateFilmInventories(
					this.film_id, datasource[i].store_id
				);
				this.$(`#s1_${datasource[i].store_id}`).editable({
					value: 0,
					validate: (value:any) => {
						if(this.$.trim(value) === "") {
							return "Please enter a inventory number.";
						}
						return null;
					}
				});
			}
		});

		this.$(stores_tbl_el).DataTable({
			responsive: true,
			searching: false,
			info: false,
			data,
			columns: [
				{
					"title": "Store Id",
					"data": "store_id"
				},
				{
					"title": "Manager",
					"data": "manager",
					"render": (data: any) => {
						return data.split(";").slice(0, 2).join(" ");
					}
				},
				{
					"title": "Address",
					"data": "address",
					"render": (data: any) => {
						return data.replaceAll(";", ", ");
					}
				},
				{
					"title": "Qty",
					"data": "store_id",
					"render": (data: any, _: any, row: any) => {
						return `<a href="#" data-type="text" data-title="Please enter store amount" name="amount" id="s1_${data}">0</a>`;
					}
				}
			]
		});
	}

	ngOnDestroy() {
		const stores_tbl_el = this.stores_tbl?.nativeElement;
		if (this.$.fn.DataTable.isDataTable(stores_tbl_el)) {
			this.$(stores_tbl_el).DataTable().clear();
			this.$(stores_tbl_el).DataTable().destroy();
		}
		this.fg_search.reset();
	}
}
