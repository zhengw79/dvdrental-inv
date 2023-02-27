import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	address?: AddressType;
	manager?: StaffType;

	constructor(
		private _route: ActivatedRoute,
		private storeService: StoreService
	) {
		this.store_id = _route.snapshot.params["store_id"];
	}

	async ngOnInit(): Promise<void> {
		if (this.store_id) {
			const result = await this.storeService.retrieveStoreEntityById(this.store_id);
			if (result) {
				this.address = result.address;
				this.manager = result.staff;
			}
		}
	}
}
