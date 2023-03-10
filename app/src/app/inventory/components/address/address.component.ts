import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IMask from 'imask';
import { BLOCK_CSS } from '../../../constants';
import { Router } from '@angular/router';
import { AddressType } from '../../../services/dto/address.type';
import { CityType } from 'src/app/services/dto/city.type';
import { CountryType } from 'src/app/services/dto/country.type';
import { ValidatorService } from 'src/app/services/validator.service';
import { AddressService } from 'src/app/services/address.service';
import { AddressInputType } from 'src/app/services/dto/address.input.type';

@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

	fg_address: FormGroup;
	@Input() address_ety?: AddressType;
	@Output() evt_reloadStore: EventEmitter<any>;
	@Output() evt_setAddressId: EventEmitter<number>;

	@ViewChild("country_el") country_el?: ElementRef<HTMLSelectElement>;
	@ViewChild("city_el") city_el?: ElementRef<HTMLSelectElement>;
	@ViewChild("postcode_el") postcode_el?: ElementRef<HTMLInputElement>;
	@ViewChild("card_address_el") card_address_el?: ElementRef<HTMLDivElement>;
	@ViewChild("phone_el") phone_el?: ElementRef<HTMLInputElement>;

	// @ts-ignore
	$: any = window.jQuery;

	address_id: any;
	im_postcode: any;
	im_phone: any;
	sel_country: any;
	sel_city: any;
	showCountryModal: boolean = false;

	countries?: Array<CountryType>;

	constructor(
		private addressService: AddressService,
		private validatorService: ValidatorService,
		private router: Router
	) {
		this.evt_reloadStore = new EventEmitter;
		this.evt_setAddressId = new EventEmitter<number>;

		this.fg_address = new FormGroup({
			address: new FormControl("", [Validators.required]),
			address2: new FormControl("", [Validators.maxLength(20)]),
			country_id: new FormControl("", [Validators.required]),
			city_id: new FormControl({ value: "", disabled: true }, [Validators.required]),
			district: new FormControl("", [Validators.required]),
			postal_code: new FormControl("", [Validators.required, validatorService.postalcodeValidator]),
			phone: new FormControl("", [Validators.required, validatorService.phoneNumberValidator])
		});
	}

	ngOnInit(): void { }

	async ngAfterViewInit() {
		await this.initFormPlugin();
	}

	async initFormPlugin() {
		this.im_postcode = IMask(this.postcode_el?.nativeElement!, {
			mask: "a0a-0a0",
			lazy: false,
			placeholderChar: "#",
			commit: (_: any, masked: any) => {
				const { unmaskedValue } = masked;
				this.postcode?.setValue(unmaskedValue.toUpperCase());
			}
		});

		this.im_phone = IMask(this.phone_el?.nativeElement!, {
			mask: "(000)000-0000",
			lazy: false,
			placeholderChar: "_",
			commit: (_: any, masked: any) => {
				const { unmaskedValue } = masked;
				this.phone?.setValue(unmaskedValue);
			}
		});

		await this.initCountry();

		if (this.address_ety) {
			this.prefillFormGroup();
		}
	}

	prefillFormGroup() {

		const { address_id, address, address2, district, phone, postal_code, city: { city: { city_id, city }, country: { country_id } } } = this.address_ety!;

		this.address_id = address_id;
		this.address?.setValue(address);
		this.address2?.setValue(address2);
		this.district?.setValue(district);

		this.postcode?.setValue(postal_code);
		this.im_postcode.value = postal_code;

		this.phone?.setValue(phone);
		this.im_phone.value = phone;

		this.country?.setValue(country_id);
		this.country?.valueChanges.subscribe(value => {
			this.sel_country.val(value).trigger("change");
			this.initCity(value);
		});
		this.sel_country.val(country_id).trigger("change");

		this.city?.setValue(city_id);
		this.city?.valueChanges.subscribe(value => {
			this.sel_city.val(value).trigger("change");
		});
		this.initCity(country_id);
		this.sel_city.val(city_id).trigger("change");
	}

	async initCountry() {

		this.$(this.card_address_el?.nativeElement).block({
			message: null,
			css: BLOCK_CSS
		});
		this.countries = await this.addressService.retrieveCountryEntities();
		this.$(this.card_address_el?.nativeElement).unblock();

		const $_country_el = this.$(this.country_el?.nativeElement);
		if ($_country_el.hasClass("select2-hidden-accessible")) {
			$_country_el.empty().trigger("change");
			$_country_el.select2("destroy");
		}

		if (this.countries) {
			this.sel_country = $_country_el.select2({
				"data": [
					{ "id": "", "text": "Please select a store's country." },
					...this.countries!.map((country: any) => ({
						"id": country.country_id,
						"text": country.country
					}))],
			}).on("select2:select", (e: any) => {
				const { id } = e.params.data;
				this.country?.setValue(+id);
			});
		}

		this.country?.valueChanges.subscribe(value => {
			this.sel_country.val(value).trigger("change");
			this.initCity(value);
		});
	}

	initCity(country_id?: number) {

		//** ---------------|| Clean city dropdown ||------------------ */
		const $_city_el = this.$(this.city_el?.nativeElement);
		if ($_city_el.hasClass('select2-hidden-accessible')) {
			$_city_el.empty().trigger("change");
			$_city_el.select2("destroy");
			this.city?.disable();
		}

		const country = this.countries?.find(country => country.country_id === country_id);

		if (country) {
			const { cities } = country as any;
			this.sel_city = $_city_el.select2({
				"data": [
					{ "id": "", text: "Please select a store's city." },
					...cities?.map((city: any) => ({
						"id": city.city_id,
						"text": city.city
					}))],
			}).on("select2:select", (e: any) => {
				const { id } = e.params.data;
				this.city?.setValue(+id);
			});
			this.city?.enable();
		} else {
			this.city?.disable();
		}
	}

	get address() {
		return this.fg_address.get("address");
	}

	get address2() {
		return this.fg_address.get("address2");
	}

	get country() {
		return this.fg_address.get("country_id");
	}

	get city() {
		return this.fg_address.get("city_id");
	}

	get district() {
		return this.fg_address.get("district");
	}

	get phone() {
		return this.fg_address.get("phone");
	}

	get postcode() {
		return this.fg_address.get("postal_code");
	}

	async onSubmit() {

		this.fg_address.markAllAsTouched();

		if (!this.fg_address.valid) {
			return;
		}

		this.$(this.card_address_el?.nativeElement).block({
			message: null,
			css: BLOCK_CSS
		});

		const payload: AddressInputType = {
			address_id: +(this.address_ety?.address_id!),
			address: this.address?.value,
			address2: this.address2?.value,
			district: this.district?.value,
			postal_code: this.postcode?.value,
			phone: this.phone?.value,
			city_id: +this.city?.value,
		};

		if (this.address_ety?.address_id) {
			await this.addressService.updateAddress(payload);
			this.evt_reloadStore.emit();
		} else {
			// create new address
			const { address_id } = await this.addressService.insertAddress(payload);
			this.evt_setAddressId.emit(address_id);
			this.address_id = address_id;
		}
		this.$(this.card_address_el?.nativeElement).unblock();
	}

	onReset() {
		this.fg_address.reset();
		this.im_postcode.destroy();
		this.im_phone.destroy();
		this.initFormPlugin();
	}

	async onReloadCountry(_: any) {
		this.showCountryModal = false;
		await this.initCountry();
		this.$(this.city_el?.nativeElement).empty().trigger("change");
		this.$(this.city_el?.nativeElement).select2("destroy");
		this.city?.disable();
	}

	onShowCountryModal() {
		this.showCountryModal = true;
	}

	onCloseCountryModal(_: any) {
		this.showCountryModal = false;
	}
}
