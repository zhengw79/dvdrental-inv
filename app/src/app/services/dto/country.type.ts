import { IsInt, IsString } from "class-validator";

export class CountryType {
	@IsString()
	country?: string;

	@IsInt()
	country_id?: number;
}
