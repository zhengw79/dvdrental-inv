import { CityEntityType } from "./city.entity.type";

export interface AddressType {
	address_id?: number;

	address: string;

	address2: string;

	district: string;

	phone: string;

	postal_code: string;

	city_id: number;

	city: CityEntityType;
}
