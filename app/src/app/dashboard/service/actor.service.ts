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
		const { data, errors } = await this.apollo.query({
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

	async retrieveActorsByFilmId(film_id: number) {
		const { data, errors } = await this.apollo.query({
			query: gql`
			query retrieveActorsByFilmId($payload: Int!){
				retrieveActorsByFilmId(film_id: $payload) {
					first_name last_name actor_id
				}}`,
			variables: {
				"payload": +film_id
			}
		}).toPromise() as any;

		if (errors && errors[0] && errors[0].message === "Unauthorized") {
			this.router.navigate(["/login"]);
		}

		return data;
	}

	async removeFilmActor(film_id: number, actor_id: number) {
		const { data, errors } = await this.apollo.mutate({
			mutation: gql`
      mutation removeFilmActor($film_id: Int!, $actor_id: Int!) {
        removeFilmActor(film_id: $film_id, actor_id: $actor_id) {
          first_name last_name actor_id }}`,
			variables: {
				film_id,
				actor_id
			}
		}).toPromise() as any;

		if (errors && errors[0] && errors[0].message === "Unauthorized") {
			this.router.navigate(["/login"]);
		}

		return data;
	}
}
