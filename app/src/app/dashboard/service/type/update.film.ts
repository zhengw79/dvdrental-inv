import { IsInt, IsNumber, IsString } from "class-validator";
import { NewFilmType } from "./new.film";

export class UpdateFilm extends NewFilmType {
	@IsInt()
	film_id?: number;
}
