import { IsObject } from "class-validator";
import { CityType } from "./city.type";
import { CountryType } from "./country.type";

export class CityEntityType {
	@IsObject()
	city?: CityType;

	@IsObject()
	country?: CountryType;
}
