import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BLOCK_CSS } from 'src/app/constants';
import { AddressType } from '../../../services/dto/address.type';
import { StaffType } from '../../../services/dto/staff.type';
import { StoreService } from '../../../services/store.service';

@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
	store_id: number;
	address_id?: number;
	manager_staff_id?: number;

	address?: AddressType;
	manager?: StaffType;

	@ViewChild("store_el") store_el?: ElementRef<HTMLDivElement>;

	$: any;

	constructor(
		private _route: ActivatedRoute,
		private router: Router,
		private storeService: StoreService
	) {
		this.store_id = _route.snapshot.params["store_id"];

		// @ts-ignore
		this.$ = window.jQuery;
	}

	async ngOnInit() {

		if (this.store_id) {
			const result = await this.storeService.retrieveStoreEntityById(this.store_id);
			if (result) {
				this.address = result.address;
				this.manager = result.staff;
			}
		}
	}

	setAddressId(address_id: number) {

		this.address_id = address_id;
	}

	setManagerId(manager_id: number) {

		this.manager_staff_id = manager_id;
	}

	async onCreateStore() {

		if (this.address_id && this.manager_staff_id) {
			this.$(this.store_el?.nativeElement).block({
				message: null,
				css: BLOCK_CSS
			});

			const { store_id } = await this.storeService.insertStore({ address_id: this.address_id, manager_staff_id: this.manager_staff_id });

			this.$(this.store_el?.nativeElement).unblock();
			this.router.navigate([`/inventory/store/update/${store_id}`]);
		}
	}
}
