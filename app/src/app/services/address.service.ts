import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import { lastValueFrom } from "rxjs";
import { BaseService } from "./base.service";
import { AddressType } from "./dto/address.type";

@Injectable({
	providedIn: "root"
})
export class AddressService extends BaseService {

	async retrieveCountryEntities(): Promise<any> {
    const { data, errors } = await this.apollo.query({
      query: gql`query {
        retrieveCountries { country_id country
          cities { city_id city }}}`
    }).toPromise() as any;

    this.redirectToLoginIfError(errors);

    return data.retrieveCountries;
  }

	async updateAddress(payload: AddressType): Promise<AddressType> {
		const { data, errors } = await lastValueFrom(this.apollo.mutate({
			mutation: gql`mutation updateAddress($payload: AddressInput!) {
				updateAddress(payload: $payload) {
					address_id address address2 phone postal_code district city_id
				}}`,
			variables: { payload }
		}));

		this.redirectToLoginIfError(errors);
		return (data as any).updateAddress;
	}
}
