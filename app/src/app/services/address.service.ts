import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import { lastValueFrom } from "rxjs";
import { BaseService } from "./base.service";
import { AddressInputType } from "./dto/address.input.type";
import { AddressType } from "./dto/address.type";
import { ScrollSearchInput } from "./dto/scroll.search.input";

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

	async updateAddress(payload: AddressInputType): Promise<AddressType> {
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

	async insertAddress(payload: AddressInputType) {
		const { data, errors } = await lastValueFrom(this.apollo.mutate({
			mutation: gql`mutation insertAddress($payload: AddressInput!) {
				insertAddress(payload: $payload) {
					address_id address address2 city_id }}`,
			variables: { payload }
		}));

		this.redirectToLoginIfError(errors);
		return (data as any).insertAddress;
	}

	async retrieveScrollAddressES(payload: ScrollSearchInput) {
		const { data, errors } = await lastValueFrom(this.apollo.query({
			query: gql`query retrieveScrollAddressES($payload: ScrollInput!){
		retrieveScrollAddressES(payload:$payload) {
			data { address_id address address2 district city country phone postal_code } total } }`,
			variables: { payload }
		}));

		this.redirectToLoginIfError(errors);
		return (data as any).retrieveScrollAddressES;
	}
}
