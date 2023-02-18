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
  @ViewChild("rental_rate_el") rental_rate_el?: ElementRef<any>;
  fg_film: FormGroup;

  years: Array<number> = [];
  categories: Array<any> = [];
  languages: Array<any> = [];
  ratings: Array<string> = [];

  constructor(
    private filmService: FilmService
  ) {
    this.fg_film = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      rental_rate: new FormControl("", [Validators.required]),
      rating: new FormControl("", [Validators.required]),
      length: new FormControl("", [Validators.required]),
      replacement_cost: new FormControl("", [Validators.required]),
      rental_duration: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      language: new FormControl("", [Validators.required])
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

  async ngOnInit(): Promise<void> {
    const { fetchFilmSettings: { categories, languages, ratings } } = await this.filmService.fetchFilmSettings();
    this.ratings = ratings;
    this.languages = languages.map((language: any) => ({ language_id: language.language_id, name: language.name }));
    this.categories = categories.map((category: any) => ({ category_id: category.category_id, name: category.name }));
  }

  ngAfterViewInit() {
    // IMask(this.title_el?.nativeElement, {
    //   mask: '+{7}(000)000-00-00',
    //   lazy: false,  // make placeholder always visible
    //   placeholderChar: '_'     // defaults to '_'
    // });
    IMask(this.rental_rate_el?.nativeElement, {
      mask: Number,
      scale: 2,
      radix: ".",
      signed: false,
      max: 100,
      lazy: false
    });
    IMask(this.replacement_cost_el?.nativeElement, {
      mask: Number,
      scale: 2,
      radix: ".",
      signed: false,
      max: 100,
      lazy: false
    });
  }

  onSubmit() {
    console.log(this.fg_film.value);
  }
}
