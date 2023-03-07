import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  dataTableOption: any;

  constructor(
    private router: Router
  ) {
    const bear_token = localStorage.getItem("access_token");
    const baseUrl = environment.apiUrl;

    this.dataTableOption = {
      responsive: true,
      processing: true,
      serverSide: true,
      searching: false,
      ajax: {
        url: `${baseUrl}graphql`,
        type: "POST",
        contentType: "application/json",
        headers: {
          authorization: `bearer ${bear_token}`
        },
        statusCode: {
          401: () => {
            this.router.navigate(["/auth/login"]);
          }
        }
      }
    };
  }

  initCustomersDatatable() {
    const dataTableOption = Object.assign({}, this.dataTableOption);
    dataTableOption.ajax.data = (d: any) => {
      const gql = `query retrieveCustomerDatatablePagination($pageOption: DatatablePaginationInput!){
          retrieveCustomerDatatablePagination(pageOption: $pageOption) {
            data { customer_id store_id first_name last_name email create_date address_id address } totalCount } }`;
      const query = {
        operationName: null,
        query: gql,
        variables: {
          pageOption: {
            paginate: {
              page: d.start / d.length,
              limit: d.length
            },
            sort: [{
              field: d.columns[d.order[0].column].data,
              order: d.order[0].dir.toUpperCase()
            }],
            search: d.search.vale ?? ""
          }
        }
      };

      return JSON.stringify(query);
    };

    dataTableOption.ajax.dataSrc = (json: any) => {
      const { data, errors } = json;
      if (errors && errors[0] && errors[0].message === "Unauthorized") {
        this.router.navigate(["/auth/login"]);
      } else {
        const { retrieveCustomerDatatablePagination } = data;
        json.recordsTotal = retrieveCustomerDatatablePagination.totalCount;
        json.recordsFiltered = retrieveCustomerDatatablePagination.totalCount;
        return retrieveCustomerDatatablePagination.data;
      }
    };

    return dataTableOption;
  }
}
