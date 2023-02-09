import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-actor',
  templateUrl: './film.actor.component.html',
  styleUrls: ['./film.actor.component.css']
})
export class FilmActorComponent implements OnInit {
  @Input() film_id?: number;

  //@ts-ignore
  $: any = window.jQuery;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const bearer_token = localStorage.getItem("access_token");
    this.$("#actorTable").DataTable({
      responsive: true,
      processing: true,
      serverSide: true,
      searching: false,
      paging: false,
      ordering: false,
      "order": [[1, "asc"]],
      columnDefs: [
        { target: 0, data: 'actor_id' },
        { target: 1, data: 'first_name' },
        { target: 2, data: "last_name" },
        {
          target: 3,
          data: "actor_id",
          render: (data: any) => '<div class="btn-group"><a class="btn btn-primary btn-sm" href="#/inventory/actors/' + data + '"><i class="fas fa-eye"></i></a></div>'
        }
      ],
      ajax: {
        url: "graphql",
        type: "post",
        contentType: "application/json",
        headers: {
          authorization: `Bearer ${bearer_token}`
        },
        data: () => {
          let gql = `query retrieveFilmActors($film_id: Int!) {
            retrieveFilmActors(film_id: $film_id) {
              actor_id first_name last_name
            }
          }`;
          let query = {
            operationName: null,
            query: gql,
            variables: {
              "film_id": this.film_id
            }
          };
          return JSON.stringify(query);
        },
        dataSrc: (json: any) => {
          if (json.data === null &&
            json.errors[0] &&
            json.errors[0].message === "Unauthorized") {
            this.router.navigate(["/login"]);
          } else {
            const arr = json.data?.retrieveFilmActors;
            json.recordsTotal = arr.length;
            json.recordsFiltered = arr.length;
            return arr;
          }
        }
      }
    });
  }
}
