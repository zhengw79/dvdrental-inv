import { IActorInput } from "./Iactor.input";

export interface IFilmActorsInput {
	film_id: number;

	actors: Array<IActorInput>;
}
