import { IsArray, IsString } from "class-validator";

export class CountryCitiesInput {
	@IsString()
	country?: string;

	@IsArray()
	cities?: Array<string> | null;
}
