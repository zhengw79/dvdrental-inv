import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-film-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFormModel: FormGroup;

  // @ts-ignore
  private $ = window.jQuery;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
    this.searchFormModel = new FormGroup({
      searching_text: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  get searching_text() {
    return this.searchFormModel.get("searching_text");
  }

  onSubmit() {
    const { searching_text } = this.searchFormModel.value;
    this.apollo.query({
      query: gql`
      query retrieveFilmES($searching_text: String!) {
        retrieveFilmES(searching_text: $searching_text) {
        film_id title description actors categories rating language
      }}`,
      variables: {
        searching_text
      }
    }).subscribe(({ data, errors }) => {
      if (errors && errors[0] && errors[0].message === "Unauthorized") {
        this.router.navigate(["/login"]);
      } else {
        if (this.$.fn.DataTable.isDataTable('#filmES_table')) {
          this.$("#filmES_table").DataTable().clear();
          this.$("#filmES_table").DataTable().destroy();
        }

        const { retrieveFilmES } = data as any;

        this.$("#filmES_table").DataTable({
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
                return `<a type="button" class="btn btn-primary btn-sm" href="#/inventory/film/${data}"><i class="fas fa-solid fa-eye"></i></a>`
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
    });
  }
}
