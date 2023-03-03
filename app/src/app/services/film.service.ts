import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { lastValueFrom } from 'rxjs';
import { BaseService } from './base.service';
import { IFilmActorsInput } from './type/ifilm.actors.input';
import { InewFilm } from './type/inew.film';

@Injectable({
  providedIn: 'root'
})
export class FilmService extends BaseService {

  async retrieveFilmES(searching_text: string) {

    const { data, errors } = await lastValueFrom(this.apollo.query({
      query: gql`query retrieveFilmES($searching_text: String!) {
        retrieveFilmES(searching_text: $searching_text) {
        film_id title description actors categories rating language
      }}`,
      variables: {
        searching_text
      }
    }));

    this.redirectToLoginIfError(errors);

    return data;
  }

  async insertFilm(payload: InewFilm) {

    const { data, errors } = await lastValueFrom(this.apollo.mutate({
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
          "fulltext": payload.fulltext,
          "special_features": payload.special_features
        }
      }
    }));

    this.redirectToLoginIfError(errors);

    return (data as any).insertFilm;
  }

  async fetchFilmSettings() {

    const { data, errors } = await lastValueFrom(this.apollo.query({
      query: gql`
        query { fetchFilmSettings {
          ratings
          languages { language_id name }
          categories { category_id name }
        }}
      `}));

    this.redirectToLoginIfError(errors);

    return (data as any).fetchFilmSettings;
  }

  async retrieveFilm(film_id: number) {

    const { data, errors } = await lastValueFrom(this.apollo.query({
      query: gql`
      query { retrieveFilmEntityById(film_id: ${film_id}) {
        film { film_id title description fulltext release_year rental_duration rental_rate replacement_cost rating special_features language_id length fulltext } categories { category_id name } language { language_id name } actors { actor_id first_name last_name }
      }}`}));

    this.redirectToLoginIfError(errors);

    return (data as any).retrieveFilmEntityById;
  }

  async updateFilm(payload: any) {

    const { data, errors } = await lastValueFrom(this.apollo.mutate({
      mutation: gql`
      mutation editFilm($payload: UpdateFilmInput!) {
        editFilm(payload:$payload) {
          film {
            film_id title description rental_rate rental_duration length replacement_cost rating replacement_cost release_year special_features language_id
          },
          categories { category_id name },
          language { language_id name },
          actors { first_name last_name actor_id }
        }
      }`,
      variables: { payload }
    }));

    this.redirectToLoginIfError(errors);

    return data;
  }

  async addFilmActors(payload: IFilmActorsInput) {

    const { data, errors } = await lastValueFrom(this.apollo.mutate({
      mutation: gql`
      mutation addFilmActors($payload: FilmActorInput!) {
        addFilmActors(payload: $payload) {
          first_name last_name actor_id }}`,
      variables: {
        payload
      }
    }));

    this.redirectToLoginIfError(errors);

    return data;
  }

}
