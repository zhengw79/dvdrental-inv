import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { lastValueFrom } from 'rxjs';
import { BaseService } from './base.service';
import { CustomerInfoType } from './dto/customer.info.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  async retrieveCustomerEntityById(customer_id: number) {

    const { data, errors } = await lastValueFrom(this.apollo.query({
      query: gql`query {
          retrieveCustomerInfoById(customer_id: ${customer_id}) {
            address_id customer_id store_id address address2 phone postal_code district first_name last_name email create_date store_manager store_address country_id city_id } }`
    }));

    this.redirectToLoginIfError(errors);

    return (data as any).retrieveCustomerInfoById;
  }

  async updateCustomerInfo(payload: CustomerInfoType) {
    const { data, errors } = await lastValueFrom(this.apollo.query({
      query: gql`mutation updateCustomerInfo($payload: CustomerInfoInput!) {
        updateCustomerInfo(payload: $payload)
      }`,
      variables: { payload }
    }));

    this.redirectToLoginIfError(errors);

    return (data as any).updateCustomerInfo;
  }
}
