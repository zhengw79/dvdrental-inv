import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import IMask from "imask";
import { XeditableService } from 'src/app/services/xeditable.service';

@Component({
	selector: 'app-modal-add-film-inv',
	templateUrl: './modal.add.film.inv.component.html',
	styleUrls: ['./modal.add.film.inv.component.css']
})
export class ModalAddFilmInvComponent implements OnInit {

	@Input() film_id?: number;
	@Input() modal_film_inv?: ElementRef<HTMLDivElement>;
	@Output() evt_reloadFilmInfo: EventEmitter<any>;
	@ViewChild("store_tbl") store_tbl?: ElementRef<HTMLTableElement>;

	$: any;
	store_ids: any = null;
	masked_phone: any;
	masked_postal: any;

	constructor(
		private xeditableService: XeditableService
	) {
		//@ts-ignore
		this.$ = window.jQuery;
		this.masked_phone = IMask.createMask({ mask: "(000)000-0000" });
		this.masked_postal = IMask.createMask({ mask: "0a0-0a0" });

		this.evt_reloadFilmInfo = new EventEmitter;
	}

	ngOnInit(): void { }

	ngAfterViewInit() {
		const bearer_token = localStorage.getItem("access_token");
		const baseUrl = environment.apiUrl;

		const stores_tbl_el = this.store_tbl?.nativeElement;
		const stores_db = this.$(stores_tbl_el).DataTable({
			responsive: true,
			processing: true,
			serverSide: true,
			searching: false,
			info: false,
			columnDefs: [
				{
					target: 0,
					data: "store_id",
					title: "Store Id",
					width: "5%",
					render: (data: any) => { return data; }
				},
				{
					target: 1,
					data: "first_name",
					title: "Manager",
					width: "5%",
					render: (data: any, type: any, row: any, meta: any) => {
						return `${data} ${row.last_name}`;
					}
				},
				{
					target: 2,
					data: "address",
					title: "Address",
					width: "60%",
					render: (data: any, type: any, row: any, meta: any) => {
						// const postal_code = this.masked_postal.resolve(row.postal_code);
						const phone = this.masked_phone.resolve(row.phone);
						return `${data} ${row.address2}, ${row.district}, ${row.city}, ${row.country}, ${phone}`;
					}
				},
				{
					target: 3,
					width: "10%",
					data: "amount",
					title: "Qty",
					render: (data: any, type: any, row: any, meta: any) => {
						return `<a href="#" data-type="text" data-title="Please enter store amount" name="amount" id="s_${row.store_id}">${data}</a>`;
					}
				}
			],
			ajax: {
				url: `${baseUrl}graphql`,
				type: "post",
				contentType: "application/json",
				headers: {
					authorization: `Bearer ${bearer_token}`
				},
				data: (d: any) => {
					let gql = `query {
						retrieveFilmStoreInventories(film_id: ${this.film_id}) {
							__typename
							...on FilmStoreInventoriesType {
								film_id
								store_inventories {
									store_id first_name last_name address address2 district postal_code phone city country amount
								}}}}`;
					let query = {
						"operationName": null,
						"query": gql,
						"variables": null,
					};
					return JSON.stringify(query);
				},
				"dataSrc": (json: any) => {
					const { data: { retrieveFilmStoreInventories: { store_inventories } } } = json;
					json.recordsTotal = store_inventories ? store_inventories.length : 0;
					json.recordsFiltered = store_inventories ? store_inventories.length : 0;
					return store_inventories;
				}
			}
		});

		this.$(stores_tbl_el).on("init.dt", () => {

			const data = stores_db.rows().data();
			this.store_ids = [];
			for(let i=0; i<data.length; i++) {
				this.xeditableService.updateFilmInventories(
					this.film_id!, data[i].store_id);
				this.$(`#s_${data[i].store_id}`).editable();
				this.store_ids.push(data[i].store_id);
			}

		});

		this.$("#filmInvModal").on("hide.bs.modal", () => {
			console.log("close add inventories");
			this.evt_reloadFilmInfo.emit();
		});
	}
}
