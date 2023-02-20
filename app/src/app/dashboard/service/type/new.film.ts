import { IsInt, IsNumber, IsString } from "class-validator";

export class NewFilmType {
	@IsString()
	title?: string;

	@IsString()
	description?: string;

	@IsInt()
	release_year?: number;

	@IsInt()
	language_id?: number;

	@IsInt()
	rental_duration?: number;

	@IsString()
	rental_rate?: string;

	@IsInt()
	length?: number;

	@IsNumber()
	replacement_cost?: number;

	@IsString()
	rating?: string;

	@IsString()
	fulltext?: string;

	@IsString()
	categories?: string;

	@IsString()
	special_features?:string;
}
