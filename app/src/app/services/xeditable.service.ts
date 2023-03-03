import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
      }
    };
  }

  insertFilmInventories(film_id: number, store_id: number) {
    this.$.fn.editable.defaults.pk = film_id;
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

  updateFilmInventories(film_id: number, store_id: number) {
    this.$.fn.editable.defaults.pk = film_id;
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
}