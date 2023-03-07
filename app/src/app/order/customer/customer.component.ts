import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerEntityType } from '../../../app/services/dto/customer.entity.type';
import { ValidatorService } from '../../../app/services/validator.service';
import { OrderService } from '../../../app/services/order.service';
import IMask from "imask";
import { AddressService } from '../../../app/services/address.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild("phone_el") phone_el?: ElementRef<HTMLInputElement>;
  @ViewChild("postal_el") postal_el?: ElementRef<HTMLInputElement>;
  @ViewChild("country_el") country_el?: ElementRef<HTMLInputElement>;
  @ViewChild("city_el") city_el?: ElementRef<HTMLInputElement>;

  customer_id?: number;
  fg_customer: FormGroup;

  im_phone: any;
  im_postal: any;
  sel_country: any;
  sel_city: any;

  $: any;
  countries = [];

  constructor(
    private orderService: OrderService,
    private addressService: AddressService,
    private _route: ActivatedRoute,
    private validatorService: ValidatorService
  ) {
    this.fg_customer = new FormGroup({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      create_date: new FormControl({ disabled: true, value: "" }),
      address: new FormControl("", [Validators.required]),
      address2: new FormControl("", [Validators.required]),
      district: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, validatorService.phoneNumberValidator]),
      postal_code: new FormControl("", [Validators.required, validatorService.postalcodeValidator]),
      country_id: new FormControl("", [Validators.required]),
      city_id: new FormControl({ value: "", disabled: true }, Validators.required)
    });
    this.customer_id = parseInt(_route.snapshot.paramMap.get("customer_id")!);

    // @ts-ignore
    this.$ = window.jQuery;
  }

  ngOnInit() { }

  async ngAfterViewInit() {

    this.im_phone = IMask(
      this.phone_el?.nativeElement!,
      {
        mask: "(000)000-00-00",
        lazy: false,
        placeholderChar: "_",
        commit: (_: any, masked: any) => {
          const { unmaskedValue } = masked;
          this.phone?.setValue(unmaskedValue);
        }
      });

    this.im_postal = IMask(
      this.postal_el?.nativeElement!,
      {
        mask: "a0a-0a0",
        lazy: false,
        placeholderChar: "#",
        commit: (_: any, masked: any) => {
          const { unmaskedValue } = masked;
          this.postal_code?.setValue(unmaskedValue);
        }
      }
    );

    await this.initCountry();

    if(this.customer_id) {
      const data = await this.orderService.retrieveCustomerEntityById(this.customer_id);
      this.prefillCustomerForm(data);
    }
  }

  prefillCustomerForm(data: CustomerEntityType) {
    const { first_name, last_name, email, create_date, address: { address, address2, district, phone, postal_code, city: { city: { city_id, city }, country: { country, country_id } } } } = data;

    this.first_name?.setValue(first_name);
    this.last_name?.setValue(last_name);
    this.email?.setValue(email);
    this.create_date?.setValue(create_date);
    this.address?.setValue(address);
    this.address2?.setValue(address2);
    this.district?.setValue(district?.toUpperCase());
    this.phone?.setValue(phone);
    this.im_phone.value = phone;
    this.postal_code?.setValue(postal_code);
    this.im_postal.value = postal_code;

    this.country?.setValue(country_id);
    this.country?.valueChanges.subscribe(value => {
      this.sel_country.val(value).trigger("change");
      this.initCity(value);
    });
    this.sel_country?.val(country_id).trigger("change");

    this.city?.setValue(city_id);
    this.city?.valueChanges.subscribe(value => {
      this.sel_city.val(value).trigger("change");
    });
    this.initCity(country_id!);
    this.sel_city?.val(city_id).trigger("change");
  }

  async initCountry() {
    const countries = await this.addressService.retrieveCountryEntities();
    const $_country_el = this.$(this.country_el?.nativeElement);

    if ($_country_el.hasClass("select2-hidden-accessible")) {
      $_country_el.empty().trigger('change');
      $_country_el.select2("destroy");
    }

    if (countries) {
      this.sel_country = $_country_el.select2({
        "data": [
          { "id": "", "text": "Please select a country." },
          ...countries.map((country: any) => ({
            "id": country.country_id,
            "text": country.country
          }))
        ]
      }).on("select2:select", (e: any) => {
        const { id } = e.params.data;
        this.country?.setValue(+id);
      });

      this.countries = countries;
    }
  }

  initCity(country_id: number) {
    const $_city_el = this.$(this.city_el?.nativeElement);
    if ($_city_el.hasClass("select2-hidden-accessible")) {
      $_city_el.empty().trigger("change");
      $_city_el.select2("destroy");
    }

    const country = this.countries.find((country: any) => country.country_id === country_id);
    if (country) {
      const { cities } = country as any;
      this.sel_city = $_city_el.select2({
        "data": [
          { "id": "", "text": "Please select a city." },
          ...cities.map((city: any) => ({
            "id": city.city_id,
            "text": city.city
          }))
        ]
      }).on("select2:select", (e: any) => {
        const { id } = e.params.data;
        this.city?.setValue(+id);
      });
      this.city?.enable();
    } else {
      this.city?.disable();
    }
  }

  // #region---------|| Formcontroller ||--------------//
  get first_name() {
    return this.fg_customer.get("first_name");
  }

  get last_name() {
    return this.fg_customer.get("last_name");
  }

  get email() {
    return this.fg_customer.get("email");
  }

  get create_date() {
    return this.fg_customer.get("create_date");
  }

  get address() {
    return this.fg_customer.get("address");
  }

  get address2() {
    return this.fg_customer.get("address2");
  }

  get district() {
    return this.fg_customer.get("district");
  }

  get phone() {
    return this.fg_customer.get("phone");
  }

  get postal_code() {
    return this.fg_customer.get("postal_code");
  }

  get country() {
    return this.fg_customer.get("country_id");
  }

  get city() {
    return this.fg_customer.get("city_id");
  }
  //#endregion--------------------

  onSubmit() {
    this.fg_customer.markAllAsTouched();

    if (this.fg_customer.invalid) {
      return;
    }

    console.log(this.fg_customer.value);
  }

  onReset() {
    this.fg_customer.reset();
    this.ngAfterViewInit();
  }
}
