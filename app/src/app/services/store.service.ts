import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { lastValueFrom } from 'rxjs';
import { BaseService } from './base.service';
import { AddressType } from './dto/address.type';
import { ScrollSearchInput } from './dto/scroll.search.input';
import { StoreEntityType } from './dto/store.entity.type';
import { StoreType } from './dto/store.type';
import { CountryCitiesInput } from './type/country.cities.input';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseService {

  async retrieveStoreEntityById(store_id: number): Promise<StoreEntityType> {
    const { data, errors } = await lastValueFrom(this.apollo.query({
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
          staff { staff_id first_name last_name email deleted_date }
        }
      }`
    }));

    this.redirectToLoginIfError(errors);

    return (data as any).retrieveStoreEntityById;
  }

  async retrieveStoreES(payload: string) {

    const { data, errors } = await lastValueFrom(this.apollo.query({
      query: gql`query { retrieveStoreES(payload: "${payload}") {
        staff_id store_id address manager }}`
    }));

    this.redirectToLoginIfError(errors);

    return (data as any).retrieveStoreES;
  }

  async retrieveScrollStoreEs(payload: ScrollSearchInput) {
    const {data, errors} = await lastValueFrom(this.apollo.query({
      query: gql`query retrieveScrollStoreES($payload: ScrollInput!){
        retrieveScrollStoreES(payload: $payload) {
          total
          data { staff_id store_id address manager } } }`,
      variables: { payload }
    }));

    this.redirectToLoginIfError(errors);
    return (data as any).retrieveScrollStoreES;
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

  async insertAddress(payload: AddressType) {
    const { data, errors } = await lastValueFrom(this.apollo.mutate({
      mutation: gql`mutation insertAddress($payload: AddressInput!){
        insertAddress(payload:$payload) { address_id address address2 city_id postal_code } }`,
      variables: {
        payload
      }
    }));

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
