import { IsInt } from "class-validator";

export class StoreType {
	@IsInt()
	store_id?: number;

	@IsInt()
	address_id?: number;

	@IsInt()
	manager_staff_id?: number;
}
