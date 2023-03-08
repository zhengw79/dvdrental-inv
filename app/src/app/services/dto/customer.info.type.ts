import { AddressType } from "./address.type";

export interface CustomerInfoType {

	customer_id: number;

	store_id: number;

	first_name: string;

	last_name: string;

	email: string;

	address_id: number;

	activebool: boolean;

	create_date: string;

	address: AddressType;

	last_update?: string;
}
