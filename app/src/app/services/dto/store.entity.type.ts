import { IsInt, IsObject } from "class-validator";
import { AddressType } from "./address.type";
import { StaffType } from "./staff.type";

export class StoreEntityType {
	@IsInt()
	store_id?: number;

	@IsInt()
	manager_staff_id?: number;

	@IsInt()
	address_id?: number;

	@IsObject()
	address?: AddressType;

	@IsObject()
	staff?: StaffType;
}
