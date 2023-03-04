import { IsNotEmpty, IsString } from "class-validator";

export class EditableType {
	@IsString()
	field_name?: string;

	@IsNotEmpty()
	field_value?: number | string;
}
