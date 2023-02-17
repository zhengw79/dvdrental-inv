import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

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
}
