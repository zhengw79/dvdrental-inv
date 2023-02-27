import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { lastValueFrom } from 'rxjs';
import { BaseService } from './base.service';
import { StoreEntityType } from './dto/store.entity.type';
import { StoreType } from './dto/store.type';
import { CountryCitiesInput } from './type/country.cities.input';
import { IaddressInput } from './type/iaddress.input';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseService {

  async retrieveStoreEntityById(store_id: number): Promise<StoreEntityType> {
    const { data, errors } = await this.apollo.query({
      query: gql`query {
        retrieveStoreEntityById(store_id: ${store_id}) {
          store_id manager_staff_id address_id
          address {
            address_id address address2 district phone postal_code city_id
            city {
              city { city_id city }
              country { country country_id }
            }
          }
          staff { staff_id first_name last_name email }
        }
      }`
    }).toPromise() as any;

    this.redirectToLoginIfError(errors);

    return data.retrieveStoreEntityById;
  }

  async addCountryWithCitites(payload: CountryCitiesInput) {
    const { data, errors } = await this.apollo.mutate({
      mutation: gql`mutation addCountryWithCities($payload: CountryInput!){
        addCountryWithCities(payload:$payload) {
          country country_id
          cities { city city_id country_id }
        }}`,
      variables: {
        "payload": payload
      }
    }).toPromise() as any;

    this.redirectToLoginIfError(errors);

    return data;
  }

  async insertAddress(payload: IaddressInput) {
    const { data, errors } = await this.apollo.mutate({
      mutation: gql`mutation insertAddress($payload: AddressInput!){
        insertAddress(payload:$payload) { address_id address address2 city_id postal_code } }`,
      variables: {
        payload
      }
    }).toPromise() as any;

    this.redirectToLoginIfError(errors);

    return data;
  }

  async insertStore(payload: StoreType) {
    const { data, errors } = await lastValueFrom(this.apollo.mutate({
      mutation: gql`mutation insertStore($payload:StoreInput!) {
        insertStore(payload: $payload) {
          store_id address_id manager_staff_id
        }}`,
      variables: { payload }
    }));

    this.redirectToLoginIfError(errors);

    return (data as any).insertStore;
  }
}
