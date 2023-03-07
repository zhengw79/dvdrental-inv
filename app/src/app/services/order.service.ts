import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { lastValueFrom } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{

  async retrieveCustomerEntityById(customer_id: number) {

    const {data, errors} = await lastValueFrom(this.apollo.query({
      query: gql`query {
        retrieveCustomerEntityById(customer_id: ${customer_id}) {
          customer_id store_id first_name last_name email create_date
          address { address address2 district phone postal_code
            city { city { city_id city }
              country { country_id country }}}
          rentals { rental_id rental_date return_date }
          payments { payment_id payment_date paypal_request_id }
        }}`
    }));

    this.redirectToLoginIfError(errors);

    return (data as any).retrieveCustomerEntityById;
  }
}
