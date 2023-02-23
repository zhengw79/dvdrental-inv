import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BLOCK_CSS } from 'src/app/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-film-info',
  templateUrl: './film.info.component.html',
  styleUrls: ['./film.info.component.css']
})
export class FilmInfoComponent implements OnInit {
  @Input() film_id?: number;
  film: any;
  $: any;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
    //@ts-ignore
    this.$ = window.jQuery;
  }

  ngOnInit(): void {
    const bear_token = localStorage.getItem("access_token");
    const apiUrl = environment.apiUrl;

    this.$.fn.editable.defaults.mode = "inline";
    this.$.fn.editable.defaults.pk = this.film_id;
    this.$.fn.editable.defaults.url = `${apiUrl}graphql`;

    this.$.fn.editable.defaults.ajaxOptions = {
      headers: {
        Authorization: `Bearer ${bear_token}`
      },
      contentType: "application/json",
      type: "post",
      statusCode: {
        401: () => {
          this.router.navigate(["/login"]);
        }
      }
    };

    this.$.fn.editable.defaults.params = function (params: any) {
      const gql = `mutation updateFilmEditableField($payload: UpdateFieldInput!) {
        updateFilmEditableField(payload: $payload) {
          film_id title description
        }
      }`;
      const query = {
        "operationName": null,
        "query": gql,
        "variables": {
          "payload": {
            "id": params.pk,
            "field_name": params.name,
            "field_value": params.value
          }
        }
      };
      return JSON.stringify(query);
    };
  }

  ngAfterViewInit() {
    this.$('#film_details').block({
      message: null,
      css: BLOCK_CSS
    });
    this.apollo.query({
      query: gql`
      query {
        retrieveFilmEditable(film_id: ${this.film_id}) {
          film { film_id title description release_year rental_duration rental_rate length replacement_cost rating special_features language language_id category_ids categories amount last_update fulltext }
          categories { category_id name }
          languages { language_id name }
          ratings
        }
      }`
    }).subscribe(({ data, errors }) => {
      if (errors && errors[0] && errors[0].message === "Unauthorized") {
        this.router.navigate(["/login"]);
      } else {
        const { retrieveFilmEditable: { film, categories, languages, ratings } } = data as any;
        this.film = Object.assign({}, film);

        const arr = [
          { field: "title", msg: "Please enter a film title." },
          { field: "description", msg: "Please enter the film's description." },
          { field: "category_id", msg: "Please choose a film category." },
          { field: "release_year", msg: "Please enter release_year" },
          { field: "language_id", msg: "Please choose a langauge." },
          { field: "rental_duration", msg: "Please enter film's rental duration." },
          { field: "length", msg: "Please enter the film's length." },
          { field: "replacement_cost", msg: "Please enter film's replacement cost." },
          { field: "rating", msg: "Please choose the film's rate." },
          { field: "special_features", msg: "Please enter the film's special features." }
        ];

        setTimeout(() => {
          arr.forEach(el => {
            switch (el.field) {
              case ("category_id"):
                this.$("#category_id").editable({
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
                this.$("#language_id").editable({
                  value: this.film.language_id,
                  source: languages.map((lang: any) => ({
                    value: lang.language_id,
                    text: lang.name
                  }))
                });
                break;
              case ("rating"):
                this.$("#rating").editable({
                  value: this.film.rating,
                  source: ratings.map((rate: string) => ({
                    value: rate,
                    text: rate
                  }))
                })
                break;
              default:
                this.$(`#${el.field}`).editable({
                  validate: (value: any) => {
                    if (this.$.trim(value) === "") {
                      return el.msg;
                    }
                    return null;
                  }
                });
            }
          });
        }, 500);
      }
    });
  }
}
