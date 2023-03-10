import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { OrderService } from 'src/app/services/order.service';
import { ValidatorService } from 'src/app/services/validator.service';
import IMask from "imask";
import { BLOCK_CSS } from 'src/app/constants';
import { CustomerInfoType } from 'src/app/services/dto/customer.info.type';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer.info.component.html',
  styleUrls: ['./customer.info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  @ViewChild("customer_card_el") customer_card_el?: ElementRef<HTMLDivElement>;
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
  _store: any;

  $: any;
  countries = [];

  constructor(
    private orderService: OrderService,
    private addressService: AddressService,
    private _route: ActivatedRoute,
    private validatorService: ValidatorService,
    private router: Router
  ) {
    this.fg_customer = new FormGroup({
      customer_id: new FormControl(""),
      store_id: new FormControl("", [Validators.required]),
      address_id: new FormControl(""),
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

  ngOnInit(): void { }

  async ngAfterViewInit() {
    await this.initFormPlugin();

    if (this.customer_id) {
      const data = await this.orderService.retrieveCustomerEntityById(this.customer_id);
      this.prefillCustomerForm(data);
    }
  }

  async initFormPlugin() {
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
  }

  @Input("address_id")
  set _address_id(val: any) {
    if (val) {
      this.addressService
        .retrieveAddress2ById(val?.address_id)
        .then(data => {
          const { address_id, address, address2, city_id, country_id, district, phone, postal_code } = data;
          this.address_id?.setValue(address_id);
          this.address?.setValue(address);
          this.address2?.setValue(address2);
          this.district?.setValue(district);
          this.phone?.setValue(phone);
          this.im_phone.value = phone;

          this.postal_code?.setValue(postal_code);
          this.im_postal.value = postal_code;

          this.country?.setValue(country_id);
          this.sel_country.val(country_id).trigger("change");
          this.city?.setValue(city_id);
          this.initCity(country_id!);
          this.sel_city.val(city_id).trigger("change");
        });
    }
  }

  @Input("store")
  set store(val: any) {
    if(val) {
      this._store = val;
      this.store_id?.setValue(val.store_id);
    }
  }

  prefillCustomerForm(data: CustomerInfoType) {
    const { store_id, first_name, last_name, email, create_date, address_id, address, address2, district, phone, postal_code, city_id, country_id, store_address, store_manager } = data;

    this._customer_id?.setValue(this.customer_id);
    this.store_id?.setValue(store_id);
    this._store = { store_id, address: store_address, manager: store_manager };
    this.address_id?.setValue(address_id);
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
    this.sel_country?.val(country_id).trigger("change");

    this.city?.setValue(city_id);
    this.initCity(country_id!);
    this.sel_city?.val(city_id).trigger("change");
  }

  async initCountry() {
    this.$(this.customer_card_el?.nativeElement).block({
      message: null,
      css: BLOCK_CSS
    });
    const countries = await this.addressService.retrieveCountryEntities();
    this.$(this.customer_card_el?.nativeElement).unblock();

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

    this.country?.valueChanges.subscribe(value => {
      this.sel_country.val(value).trigger("change");
      this.initCity(value);
    });
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
      this.city?.valueChanges.subscribe(value => {
        this.sel_city.val(value).trigger("change");
      });
    } else {
      this.city?.disable();
    }
  }

  // #region---------|| Formcontroller ||--------------//
  get address_id() {
    return this.fg_customer.get("address_id");
  }

  get store_id() {
    return this.fg_customer.get("store_id");
  }

  get _customer_id() {
    return this.fg_customer.get("customer_id");
  }

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

  async onSubmit() {
    this.fg_customer.markAllAsTouched();

    if (this.fg_customer.invalid) {
      return;
    }

    const { country_id, ...payload } = this.fg_customer.value;
    this.$(this.customer_card_el?.nativeElement).block({
      message: null,
      css: BLOCK_CSS
    });
    if (this.customer_id) {
      await this.orderService.updateCustomerInfo(payload);
    } else {
      const cid = await this.orderService.insertCustomerInfo(payload);
      this.router.navigate([`/order/customer/${cid}`]);
    }
    this.$(this.customer_card_el?.nativeElement).unblock();
  }

  onReset() {
    this.fg_customer.reset();
    this.ngAfterViewInit();
  }
}
