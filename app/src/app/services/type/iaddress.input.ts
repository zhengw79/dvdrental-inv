import { IsInt, IsString } from "class-validator";

export class IaddressInput {
	@IsInt()
	address_id?: number;

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
}
