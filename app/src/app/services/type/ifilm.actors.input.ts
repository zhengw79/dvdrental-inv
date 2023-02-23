import { IactorInput } from "./iactor.input";

export interface IFilmActorsInput {
	film_id: number;

	actors: Array<IactorInput>;
}
