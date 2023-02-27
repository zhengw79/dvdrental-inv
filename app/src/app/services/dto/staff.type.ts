import { IsInt, IsString } from "class-validator";

export class StaffType {
	@IsInt()
	staff_id?: number;

	@IsString()
	first_name?: string;

	@IsString()
	last_name?: string;

	@IsString()
	email?: string;

	@IsString()
	username?: string;

	@IsString()
	password?: string;
}
