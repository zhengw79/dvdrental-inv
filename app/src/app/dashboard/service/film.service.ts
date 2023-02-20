import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { NewFilmType } from './type/new.film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(
    private apollo: Apollo,
    private router: Router
  ) { }

  async retrieveFilmES(searching_text: string) {
    const { data, errors } = await this.apollo.query({
      query: gql`query retrieveFilmES($searching_text: String!) {
        retrieveFilmES(searching_text: $searching_text) {
        film_id title description actors categories rating language
      }}`,
      variables: {
        searching_text
      }
    }).toPromise() as any;

    if (errors && errors[0] && errors[0].message === "Unauthorized") {
      this.router.navigate(["/login"]);
    }

    return data;
  }

  async insertFilm(payload: NewFilmType) {
    const { data, errors } = await this.apollo.mutate({
      mutation: gql`mutation insertFilm($payload: FilmInput!) {
        insertFilm(payload:$payload) {
          film_id title description rating replacement_cost special_features release_year language_id }}`,
      variables: {
        "payload": {
          "title": payload.title,
          "description": payload.description,
          "release_year": payload.release_year!,
          "language_id": payload.language_id!,
          "rental_duration": +payload.rental_duration!,
          "rental_rate": +payload.rental_rate!,
          "length": +payload.length!,
          "replacement_cost": +payload.replacement_cost!,
          "rating": payload.rating,
          "categories": payload.categories,
          "fulltext": payload.fulltext
        }
      }
    }).toPromise() as any;

    if (errors && errors[0] && errors[0].message === "Unauthorized") {
      this.router.navigate(["/login"]);
    }

    return data;
  }

  async fetchFilmSettings() {
    const { data, errors } = await this.apollo.query({
      query: gql`
        query { fetchFilmSettings {
          ratings
          languages { language_id name }
          categories { category_id name }
        }}
      `}).toPromise() as any;

    if (errors && errors[0] && errors[0].message === "Unauthorized") {
      this.router.navigate(["/login"]);
    }

    return data;
  }

  async retrieveFilm(film_id: number) {
    const { data, errors } = await this.apollo.query({
      query: gql`
      query { retrieveFilmEntityById(film_id: ${film_id}) {
        film { film_id title description fulltext release_year rental_duration rental_rate replacement_cost rating language_id length fulltext } categories { category_id name } language { language_id name } actors { actor_id first_name last_name }
      }}`}).toPromise() as any;

    if (errors && errors[0] && errors[0].message === "Unauthorized") {
      this.router.navigate(["/login"]);
    }

    return data;
  }
}
