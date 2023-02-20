import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import IMask from 'imask';
import { BLOCK_CSS } from 'src/app/constants';
import { ValidatorService } from 'src/app/dashboard/service/validator.service';
import { FilmService } from '../../../../service/film.service';

@Component({
  selector: 'app-new-film-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  fg_film: FormGroup;
  @Input() film_id?: number;

  @ViewChild("film_info_card_el") film_info_card_el?: ElementRef<any>;
  @ViewChild("title_el") title_el?: ElementRef<any>;
  @ViewChild("replacement_cost_el") replacement_cost_el?: ElementRef<any>;
  @ViewChild("year_el") year_el?: ElementRef<any>;
  @ViewChild("rental_rate_el") rental_rate_el?: ElementRef<any>;
  @ViewChild("rental_duration_el") rental_duration_el?: ElementRef<any>;
  @ViewChild("category_el") category_el?: ElementRef<any>;
  @ViewChild("language_el") language_el?: ElementRef<any>;
  @ViewChild("length_el") length_el?: ElementRef<any>;

  // @ts-ignore
  $: any = window.jQuery;
  ratings: Array<string> = [];
  sel_year: any;
  sel_categories: any;
  sel_language: any;

  im_rental_rate: any;
  im_rental_duration: any;
  im_length: any;
  im_replacement_cost: any;

  constructor(
    private filmService: FilmService,
    private validatorService: ValidatorService,
    private router: Router
  ) {
    this.fg_film = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      release_year: new FormControl("", [Validators.required]),
      language_id: new FormControl("", [Validators.required]),
      rental_rate: new FormControl("", [Validators.required, validatorService.filmNumberValidator]),
      rental_duration: new FormControl("", [Validators.required, validatorService.filmNumberValidator]),
      length: new FormControl("", [Validators.required, Validators.max(250), Validators.min(0), validatorService.filmNumberValidator]),
      replacement_cost: new FormControl("", [Validators.required, validatorService.filmNumberValidator]),
      rating: new FormControl(null, [Validators.required]),
      categories: new FormControl("", [Validators.required]),
      fulltext: new FormControl("", [Validators.required]),
      special_features: new FormControl("", [Validators.required])
    });
  }

  get category() {
    return this.fg_film.get("categories");
  }

  get description() {
    return this.fg_film.get("description");
  }

  get fulltext() {
    return this.fg_film.get("fulltext");
  }

  get language() {
    return this.fg_film.get("language_id");
  }

  get length() {
    return this.fg_film.get("length");
  }

  get rating() {
    return this.fg_film.get("rating");
  }

  get rental_rate() {
    return this.fg_film.get("rental_rate");
  }

  get rental_duration() {
    return this.fg_film.get("rental_duration");
  }

  get release_year() {
    return this.fg_film.get("release_year");
  }

  get replacement_cost() {
    return this.fg_film.get("replacement_cost");
  }

  get special_features() {
    return this.fg_film.get("special_features");
  }

  get title() {
    return this.fg_film.get("title");
  }

  async ngOnInit(): Promise<void> { }

  async ngAfterViewInit() {
    //**--------------|| Featch film UI setting ||----------------- */
    this.$(this.film_info_card_el?.nativeElement).block({
      message: null,
      css: BLOCK_CSS
    });

    const { fetchFilmSettings: { categories, languages, ratings } } = await this.filmService.fetchFilmSettings();

    this.$(this.film_info_card_el?.nativeElement).unblock();
    //**-------------|| END of fetching ||------------------------- */

    this.im_rental_rate = IMask(this.rental_rate_el?.nativeElement, {
      mask: Number,
      scale: 2,
      radix: ".",
      signed: false,
      max: 100,
      lazy: false,
      commit: (value: any, masked: any) => {
        this.rental_rate?.setValue(value);
      }
    });
    this.im_replacement_cost = IMask(this.replacement_cost_el?.nativeElement, {
      mask: Number,
      scale: 2,
      radix: ".",
      signed: false,
      max: 100,
      lazy: false,
      commit: (value: any) => {
        this.replacement_cost?.setValue(value);
      }
    });
    this.im_length = IMask(this.length_el?.nativeElement, {
      mask: Number,
      scale: 0,
      signed: false,
      max: 240,
      commit: (value: any) => {
        this.length?.setValue(value);
      }
    });
    this.im_rental_duration = IMask(this.rental_duration_el?.nativeElement, {
      mask: Number,
      scale: 0,
      signed: false,
      max: 7,
      commit: (value: any) => {
        if (value) {
          this.rental_duration?.setValue(value);
        }
      }
    });

    //**--------------|| Initial select drop down ||------------ */
    this.ratings = ratings;
    this.sel_language = this.$(this.language_el?.nativeElement).select2({
      "data": languages.map((language: any) => ({
        "id": language.language_id,
        "text": language.name
      })),
      "placeholder": "Select a film's language."
    }).on("select2:select", (event: any) => {
      const { id } = event.params.data;
      this.language?.setValue(+id);
    });

    this.sel_categories = this.$(this.category_el?.nativeElement).select2({
      "placeholder": "Select a film's category.",
      "allowClear": true,
      "data": categories.map((category: any) => ({
        "id": category.category_id,
        "text": category.name
      })),
      "maximumSelectionLength": 2
    }).on("select2:select", (event: any) => {
      const cats = this.sel_categories.val().join(",");
      this.category?.setValue(cats);
    });

    const years = [];
    for (let i = 1901; i <= 2155; i++) {
      years.push(i);
    }
    this.sel_year = this.$(this.year_el?.nativeElement).select2({
      "data": years.map(year => ({ "id": year, "text": year })),
      "placeholder": "Select a film's release year."
    }).on("select2:select", (event: any) => {
      const { text } = event.params.data;
      if (text) this.release_year?.setValue(+text);
    });
    //**----------------|| END OF SELECT DROP DOWN ||-------------- */

    if (this.film_id) {
      const { retrieveFilmEntityById: { film: { title, description, language_id, length, rating, release_year, rental_duration, rental_rate, replacement_cost, special_features, fulltext }, categories } } = await this.filmService.retrieveFilm(this.film_id);

      this.title?.setValue(title);
      this.description?.setValue(description);
      this.rental_rate?.setValue(rental_rate);
      this.im_rental_rate.updateValue();

      this.rental_duration?.setValue(rental_duration);
      this.im_rental_duration.updateValue();

      this.length?.setValue(length);
      this.im_length.updateValue();

      this.replacement_cost?.setValue(replacement_cost);
      this.im_replacement_cost.updateValue();

      this.rating?.setValue(rating);
      this.release_year?.setValue(release_year);
      this.sel_year.val(release_year).trigger("change.select2");

      this.language?.setValue(language_id);
      this.sel_language.val(language_id).trigger("change.select2");

      const cate_ids = categories.map((cate: any) => cate.category_id);
      this.category?.setValue(cate_ids.join(","))
      this.sel_categories.val(cate_ids).trigger("change.select2");
      this.special_features?.setValue(special_features);
      this.fulltext?.setValue(fulltext);
    }
  }

  async onSubmit() {
    this.fg_film.markAllAsTouched();

    if (!this.fg_film.valid) {
      return;
    }

    this.$(this.film_info_card_el?.nativeElement).block({
      message: null,
      css: BLOCK_CSS
    });
    if (this.film_id) {
      const payload = this.fg_film.value;

      let temp = {
        ...payload,
        film_id: +this.film_id,
        rental_duration: +payload.rental_duration,
        length: +payload.length
      };
      let { fulltext, ..._temp } = temp;
      await this.filmService.updateFilm(_temp);
      this.$(this.film_info_card_el?.nativeElement).unblock();

      this.ngAfterViewInit();
    } else {
      const { insertFilm: { film_id } } = await this.filmService.insertFilm(this.fg_film.value);
      this.$(this.film_info_card_el?.nativeElement).unblock();

      this.router.navigate([`/inventory/film/update/${film_id}`]);
    }
  }

  onReset() {
    this.sel_year.val(null).trigger("change");
    this.sel_categories.val(null).trigger("change");
    this.sel_language.val(null).trigger("change");

    this.fg_film.reset();
  }
}
