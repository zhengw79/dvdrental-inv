import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../../../services/store.service';

@Component({
	selector: 'app-new-country',
	templateUrl: './new.country.component.html',
	styleUrls: ['./new.country.component.css']
})
export class NewCountryComponent implements OnInit {
	@Output() evt_reloadCountry: EventEmitter<any>;
	@Output() evt_closeModal: EventEmitter<any>;

	fg_country: FormGroup;
	$: any;

	constructor(
		private storeService: StoreService
	) {
		this.evt_reloadCountry = new EventEmitter();
		this.evt_closeModal = new EventEmitter();

		this.fg_country = new FormGroup({
			country: new FormControl("", [Validators.required]),
			cities: new FormArray([new FormControl("", [Validators.required])])
		});

		//@ts-ignore
		this.$ = window.jQuery;
	}

	ngOnInit(): void {}

	get country() {
		return this.fg_country?.get("country");
	}

	get cities() {
		return this.fg_country?.get("cities") as FormArray;
	}

	getCityControls() {
		return this.cities.controls;
	}

	addCity() {
		this.cities.push(new FormControl("", [Validators.required]));
	}

	removeCity(idx: number) {
		if (this.cities.length > 1) {
			this.cities.removeAt(idx);
		}
	}

	async onSubmit() {
		this.fg_country.markAllAsTouched();

		if (!this.fg_country.valid) {
			return;
		}

		const { addCountryWithCities } = await this.storeService.addCountryWithCitites(this.fg_country.value);

		this.$("#countryModal").modal("hide");
		this.evt_reloadCountry.emit(addCountryWithCities);
	}

	onClose() {
		this.$("#countryModal").modal("hide");
		this.evt_closeModal.emit();
	}
}
