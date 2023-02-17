import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(
    private apollo: Apollo,
    private router: Router
  ) { }

  async retrieveActorES(searching_text: string) {
    const {data, errors} = await this.apollo.query({
      query: gql`
        query retrieveActorES($searching_text: String!) {
          retrieveActorES(searching_text: $searching_text) {
            actor_id first_name last_name film_languages film_categories film_titles
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
