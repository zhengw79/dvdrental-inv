import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { FilmService } from 'src/app/dashboard/service/film.service';

@Component({
  selector: 'app-film-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFormModel: FormGroup;

  @ViewChild("filmES_table") filmES_table?: ElementRef<HTMLTableElement>;

  // @ts-ignore
  private $ = window.jQuery;

  constructor(
    // private apollo: Apollo,
    private filmService: FilmService,
    private router: Router
  ) {
    this.searchFormModel = new FormGroup({
      searching_text: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  get searching_text() {
    return this.searchFormModel.get("searching_text");
  }

  async onSubmit() {
    const { searching_text } = this.searchFormModel.value;
    const data = await this.filmService.retrieveFilmES(searching_text) as any;

    const filmES_table_el = this.$(this.filmES_table?.nativeElement);
    if (this.$.fn.DataTable.isDataTable(filmES_table_el)) {
      this.$(filmES_table_el).DataTable().clear();
      this.$(filmES_table_el).DataTable().destroy();
    }

    const { retrieveFilmES } = data as any;
    this.$(filmES_table_el).DataTable({
      responsive: true,
      data: retrieveFilmES,
      searching: false,
      pagination: false,
      bLengthChange: false,
      columns: [
        {
          title: "Id",
          data: "film_id",
          render: (data: any) => {
            return `<a type="button" class="btn btn-primary btn-sm" href="#/inventory/film/view/${data}"><i class="fas fa-solid fa-eye"></i></a>`
          }
        },
        { title: "Title", data: "title", width: "20%" },
        {
          title: "Description", data: "description", width: "65%", render: function (data: any, type: any, row: any, meta: any) {
            if (data.length < 150) {
              return data.substr(0, 150) + "...";
            } else {
              return data;
            }
          }
        },
        { title: "Category", data: "categories" },
        { title: "Language", data: "language" }
      ]
    });
  }
}
