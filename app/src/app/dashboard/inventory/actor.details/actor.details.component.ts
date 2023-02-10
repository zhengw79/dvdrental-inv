import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BLOCK_CSS } from 'src/app/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actor.details',
  templateUrl: './actor.details.component.html',
  styleUrls: ['./actor.details.component.css']
})
export class ActorDetailsComponent implements OnInit {
  actor: any;
  actor_id: number;
  films:any;
  //@ts-ignore
  private $ = window.jQuery;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) {
    this.actor_id = parseInt(route.snapshot.paramMap.get("actor_id")!);
  }

  ngOnInit(): void {
    const bear_token = localStorage.getItem("access_token");
    const baseUrl = environment.apiUrl;

    this.$.fn.editable.defaults.mode = "inline";
    this.$.fn.editable.defaults.pk = this.actor_id;
    this.$.fn.editable.defaults.url = `${baseUrl}graphql`;

    this.$.fn.editable.defaults.ajaxOptions = {
      headers: {
        Authorization: `Bearer ${bear_token}`
      },
      contentType: "application/json",
      type: "POST",
      crossDomain: true,
      statusCode: {
        401: () => {
          this.router.navigate(['/login']);
        }
      },
      success: (data: any) => {
        const { data: { updateActorEditable: { actor_id, first_name, last_name } } } = data;
        this.actor = Object.assign({}, this.actor, { first_name, last_name});
      }
    };

    this.$.fn.editable.defaults.params = function (params: any) {
      const gql = `mutation updateActorEditable($payload: UpdateFieldInput!) {
        updateActorEditable(payload: $payload) {
          actor_id first_name last_name
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
    this.$("#actor_info").block({
      message: null,
      css: BLOCK_CSS
    });

    this.apollo.query({
      query: gql`
      query retrieveActorFilmCardsById($actor_id: Int!) {
        retrieveActorFilmCardsById(actor_id: $actor_id) {
          actor { actor_id first_name last_name  }
          films { film_id title categories language amount}
        }}`,
      variables: {
        actor_id: this.actor_id
      }
    }).subscribe(({ data, errors }) => {
      if (errors && errors[0] && errors[0].message === "Unauthorized") {
        this.router.navigate(["/login"]);
      } else {
        const { retrieveActorFilmCardsById: { actor, films } } = data as any;
        this.actor = actor;
        this.films = films;

        const arr = [
          { field: "first_name", msg: "Please enter actor's first name." },
          { field: "last_name", msg: "Please enter actor's last name." }
        ];

        setTimeout(() => {
          arr.forEach(el => {
            this.$(`#${el.field}`).editable({
              validate: (value: any) => {
                if (this.$.trim(value) === "") {
                  return el.msg;
                }
                return null;
              }
            });
          });
        }, 500);
      }

    }, null, () => { this.$("#actor_info").unblock(); });
  }
}
