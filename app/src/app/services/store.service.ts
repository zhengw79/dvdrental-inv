import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BaseService } from './base.service';
import { StoreEntityType } from './dto/store.entity.type';
import { CountryCitiesInput } from './type/country.cities.input';
import { IaddressInput } from './type/iaddress.input';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseService {

  async retrieveCountryEntities(): Promise<any> {
    const { data, errors } = await this.apollo.query({
      query: gql`query {
        retrieveCountries { country_id country
          cities { city_id city }}}`
    }).toPromise() as any;

    this.redirectToLoginIfError(errors);

    return data.retrieveCountries;
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

  async retrieveStoreEntityById(store_id: number): Promise<StoreEntityType> {
    const { data, errors } = await this.apollo.query({
      query: gql`query {
        retrieveStoreEntityById(store_id: ${store_id}) {
          store_id manager_staff_id
          address_id
          address {
            address
            address2
            district
            phone
            postal_code
            city_id
            city {
              city {
                city_id
                city
              }
              country {
                country
                country_id
              }
            }
          }
          staff {
            staff_id
            first_name
            last_name
            email
          }
        }
      }`
    }).toPromise() as any;

    this.redirectToLoginIfError(errors);

    return data.retrieveStoreEntityById;
  }
}
