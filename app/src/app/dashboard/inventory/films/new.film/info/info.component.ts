import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IMask from 'imask';
import { FilmService } from '../../../../service/film.service';

@Component({
  selector: 'app-new-film-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @ViewChild("title_el") title_el?: ElementRef<any>;
  @ViewChild("replacement_cost_el") replacement_cost_el?: ElementRef<any>;
  @ViewChild("year_el") year_el?: ElementRef<any>;
  @ViewChild("rental_rate_el") rental_rate_el?: ElementRef<any>;
  fg_film: FormGroup;
  @ViewChild("category_el") category_el?: ElementRef<any>;
  @ViewChild("language_el") language_el?: ElementRef<any>;
  @ViewChild("length_el") length_el?: ElementRef<any>;

  // @ts-ignore
  $: any = window.jQuery;
  ratings: Array<string> = [];
  years: Array<number> = [];
  sel_year: any;
  sel_categories: any;
  sel_language: any;

  constructor(
    private filmService: FilmService
  ) {
    this.fg_film = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      rental_rate: new FormControl("", [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      length: new FormControl("", [Validators.required, Validators.max(250), Validators.min(0)]),
      replacement_cost: new FormControl("", [Validators.required, Validators.max(10), Validators.min(1)]),
      rental_duration: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      language: new FormControl("", [Validators.required]),
      year: new FormControl("", [Validators.required])
    });

    for (let i = 1901; i <= 2155; i++) {
      this.years.push(i);
    }
  }

  get title() {
    return this.fg_film.get("title");
  }

  get rental_rate() {
    return this.fg_film.get("rental_rate");
  }

  get rental_duration() {
    return this.fg_film.get("rental_duration");
  }

  get year() {
    return this.fg_film.get("year");
  }

  get category() {
    return this.fg_film.get("category");
  }

  get language() {
    return this.fg_film.get("language");
  }

  get rating() {
    return this.fg_film.get("rating");
  }

  get length() {
    return this.fg_film.get("length");
  }

  get replacement_cost() {
    return this.fg_film.get("replacement_cost");
  }

  async ngOnInit(): Promise<void> {
    const { fetchFilmSettings: { categories, languages, ratings } } = await this.filmService.fetchFilmSettings();

    this.ratings = ratings;
    this.sel_language = this.$(this.language_el?.nativeElement).select2({
      "data": languages.map((language: any) => ({
        "id": language.language_id,
        "text": language.name
      }))
    }).on("select2:select", (event: any) => {
      const { id } = event.params.data;
      console.log(id);
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
  }

  ngAfterViewInit() {
    // IMask(this.rental_rate_el?.nativeElement, {
    //   mask: Number,
    //   scale: 2,
    //   radix: ".",
    //   signed: false,
    //   max: 100,
    //   lazy: false
    // });
    // IMask(this.replacement_cost_el?.nativeElement, {
    //   mask: Number,
    //   scale: 2,
    //   radix: ".",
    //   signed: false,
    //   max: 100,
    //   lazy: false
    // });
    // IMask(this.length_el?.nativeElement, {
    //   mask: Number,
    //   scale: 1,
    //   signed: false,
    //   max: 240
    // });

    this.sel_year = this.$(this.year_el?.nativeElement).select2({
      "data": this.years.map(year => ({ "id": year, "text": year })),
    }).on("select2:select", (event: any) => {
      const { text } = event.params.data;
      this.year?.setValue(+text);
    });
  }

  onSubmit() {
    this.fg_film.markAllAsTouched();
  }

  onReset() {
    this.sel_year.val(null).trigger("change");
    this.sel_categories.val(null).trigger("change");
    this.sel_language.val(null).trigger("change");

    this.fg_film.reset();
  }
}
