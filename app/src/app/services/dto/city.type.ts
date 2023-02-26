import { IsInt, IsString } from "class-validator";

export class CityType {
	@IsString()
	city?: string;

	@IsInt()
	city_id?: number;
}
