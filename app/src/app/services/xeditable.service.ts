import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { EditableType } from './dto/editable.type';

@Injectable({
  providedIn: 'root'
})
export class XeditableService {

  $: any;

  constructor(
    router: Router
  ) {
    // @ts-ignore
    this.$ = window.jQuery;

    const bearer_token = localStorage.getItem("access_token");
    const apiUrl = environment.apiUrl;

    this.$.fn.editable.defaults.mode = "inline";
    this.$.fn.editable.defaults.url = `${apiUrl}graphql`;
    this.$.fn.editable.defaults.ajaxOptions = {
      headers: {
        Authorization: `Bearer ${bearer_token}`
      },
      contentType: "application/json",
      type: "POST",
      statusCode: {
        401: () => {
          router.navigate(["/auth/login"]);
        }
      },
    };
  }

  insertFilmInventories(film_id: number, store_id: number) {
    this.$.fn.editable.defaults.pk = film_id;
    this.$.fn.editable.defaults.ajaxOptions.success = null;
    this.$.fn.editable.defaults.params = function (params: any) {
      const gql = `mutation {
        insertFilmInventories(film_id:${film_id}, store_id: ${store_id}, amount: ${params.value}) {
          __typename
          ...on FilmStoreInventoriesType {
            film_id store_inventories { store_id amount}}}}`;
      const query = {
        "operationName": null,
        "query": gql,
        "variables": null
      };
      return JSON.stringify(query);
    }
  }

  updateFilmEditableField(film_id: number) {
    this.$.fn.editable.defaults.pk = film_id;
    this.$.fn.editable.defaults.ajaxOptions.success = null;
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

  updateFilmInventories(film_id: number, store_id: number) {
    this.$.fn.editable.defaults.pk = film_id;
    this.$.fn.editable.defaults.ajaxOptions.success = null;
    this.$.fn.editable.defaults.params = function (params: any) {
      const gql = `mutation {
        updateFilmInventories(film_id:${film_id}, store_id:${store_id}, amount:${params.value}) {
          __typename
          ...on FilmStoreInventoriesType {
            film_id
            store_inventories { store_id amount}}}}`;
      const query = {
        "operationName": null,
        "query": gql,
        "variables": null
      };
      return JSON.stringify(query);
    }
  }

  updateActorEditable(actor_id: number, fn_success: Function) {
    this.$.fn.editable.defaults.pk = actor_id;
    this.$.fn.editable.defaults.ajaxOptions.success = fn_success;

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
}
