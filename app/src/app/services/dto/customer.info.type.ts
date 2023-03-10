import { AddressType } from "./address.type";

export interface CustomerInfoType {

	customer_id: number;

	store_id: number;

	first_name: string;

	last_name: string;

	email: string;

	address_id: number;

	create_date: string;

	address: string;

	address2: string;

	phone: string;

	postal_code: string;

	district: string;

	store_manager: string;

	store_address: string;

	country_id: number;

	city_id: number;
}
