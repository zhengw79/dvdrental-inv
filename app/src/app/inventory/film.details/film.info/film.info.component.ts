import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BLOCK_CSS } from 'src/app/constants';
import { FilmService } from 'src/app/services/film.service';
import { XeditableService } from 'src/app/services/xeditable.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-film-info',
	templateUrl: './film.info.component.html',
	styleUrls: ['./film.info.component.css']
})
export class FilmInfoComponent implements OnInit {
	@Input() film_id?: number;
	@ViewChild("film_info") film_info?: ElementRef<HTMLDivElement>;
	@ViewChild("film_title") film_title?: ElementRef<HTMLHRElement>;
	@ViewChild("film_description") film_description?: ElementRef<HTMLHRElement>;
	@ViewChild("category_id") category_id?: ElementRef<HTMLHRElement>;
	@ViewChild("release_year") release_year?: ElementRef<HTMLHRElement>;
	@ViewChild("language_id") language_id?: ElementRef<HTMLHRElement>;
	@ViewChild("rental_duration") rental_duration?: ElementRef<HTMLHRElement>;
	@ViewChild("length") length?: ElementRef<HTMLHRElement>;
	@ViewChild("replacement_cost") replacement_cost?: ElementRef<HTMLHRElement>;
	@ViewChild("rating") rating?: ElementRef<HTMLHRElement>;
	@ViewChild("special_features") special_features?: ElementRef<HTMLHRElement>;

	showFilmInvModal: boolean = false;
	film: any;
	$: any;

	constructor(
		private filmService: FilmService,
		private xeditableService: XeditableService
	) {
		//@ts-ignore
		this.$ = window.jQuery;
	}

	ngOnInit(): void { }

	async ngAfterViewInit() {
		await this.initFilmDetailEditable();
	}

	async initFilmDetailEditable() {
		this.$(this.film_info?.nativeElement).block({
			message: null,
			css: BLOCK_CSS
		});
		const data = await this.filmService.retrieveFilmEditable(this.film_id!);
		this.$(this.film_info?.nativeElement).unblock();

		const { film, categories, languages, ratings } = data as any;
		this.film = Object.assign({}, film);

		const arr = [
			{ field: "title", msg: "Please enter a film title.", el: this.film_title?.nativeElement },
			{ field: "description", msg: "Please enter the film's description.", el: this.film_description?.nativeElement },
			{ field: "category_id", msg: "Please choose a film category.", el: this.category_id?.nativeElement },
			{ field: "release_year", msg: "Please enter release_year", el: this.release_year?.nativeElement },
			{ field: "language_id", msg: "Please choose a langauge.", el: this.language_id?.nativeElement },
			{ field: "rental_duration", msg: "Please enter film's rental duration.", el: this.rental_duration?.nativeElement },
			{ field: "length", msg: "Please enter the film's length.", el: this.length?.nativeElement },
			{ field: "replacement_cost", msg: "Please enter film's replacement cost.", el: this.replacement_cost?.nativeElement },
			{ field: "rating", msg: "Please choose the film's rate.", el: this.rating?.nativeElement },
			{ field: "special_features", msg: "Please enter the film's special features.", el: this.special_features?.nativeElement }
		];

		arr.forEach(el => {
			this.xeditableService.updateFilmEditableField(this.film_id!);
			switch (el.field) {
				case ("category_id"):
					this.$(el.el).editable({
						name: el.field,
						value: this.film.category_ids.split(",")[0],
						source: categories.map((cate: any) => ({
							value: cate.category_id,
							text: cate.name
						})),
						valiate: (value: any) => {
							if (this.$.trim(value) === "") {
								return el.msg;
							}
							return null;
						}
					});
					break;
				case ("language_id"):
					this.$(el.el).editable({
						name: el.field,
						value: this.film.language_id,
						source: languages.map((lang: any) => ({
							value: lang.language_id,
							text: lang.name
						}))
					});
					break;
				case ("rating"):
					this.$(el.el).editable({
						name: el.field,
						value: this.film.rating,
						source: ratings.map((rate: string) => ({
							value: rate,
							text: rate
						}))
					})
					break;
				default:
					this.$(el.el).editable({
						name: el.field,
						value: this.film[el.field],
						validate: (value: any) => {
							if (this.$.trim(value) === "") {
								return el.msg;
							}
							return null;
						}
					});
			}
		});
	}

	onClickAddFilmInv() {
		this.showFilmInvModal = true;
	}

	onRefreshFilminfo() {
		this.showFilmInvModal = false;
		this.ngAfterViewInit();
	}
}
