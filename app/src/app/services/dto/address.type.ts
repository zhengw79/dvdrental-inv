import { IsInt, IsObject, IsString } from "class-validator";
import { CityEntityType } from "./city.entity.type";

export class AddressType {
	@IsString()
	address?: string;

	@IsString()
	address2?: string;

	@IsString()
	district?: string;

	@IsString()
	phone?: string;

	@IsString()
	postal_code?: string;

	@IsInt()
	city_id?: number;

	@IsObject()
	city?: CityEntityType | null;
}
